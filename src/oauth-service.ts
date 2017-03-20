import { EventAggregator } from 'aurelia-event-aggregator';
import { autoinject } from 'aurelia-dependency-injection';
import { PLATFORM } from 'aurelia-pal';

import { OAuthTokenService, OAuthTokenData } from './oauth-token-service';
import UrlHashService from './url-hash-service';
import LocalStorageService from './local-storage-service';
import { objectAssign } from './oauth-polyfills';

const OAUTH_STARTPAGE_STORAGE_KEY: string = 'oauth.startPage';

export interface OAuthConfig {
  loginUrl: string;
  logoutUrl: string;
  clientId: string;
  logoutRedirectParameterName?: string;
  scope?: string;
  state?: string;
  redirectUri?: string;
  alwaysRequireLogin?: boolean;
  autoTokenRenewal?: boolean;
  pushStateNavigation?: boolean;
}

@autoinject()
export class OAuthService {

  public config: OAuthConfig;

  private defaults: OAuthConfig;

  public static get LOGIN_SUCCESS_EVENT(): string { return 'oauth:loginSuccess'; }
  public static get INVALID_TOKEN_EVENT(): string { return 'oauth:invalidToken'; }

  constructor(
    private oAuthTokenService: OAuthTokenService,
    private urlHashService: UrlHashService,
    private localStorageService: LocalStorageService,
    private eventAggregator: EventAggregator) {

    this.defaults = {
      loginUrl: null,
      logoutUrl: null,
      clientId: null,
      logoutRedirectParameterName: 'post_logout_redirect_uri',
      scope: null,
      state: null,
      alwaysRequireLogin: false,
      autoTokenRenewal: true,
      pushStateNavigation: false
    };
  }

  public configure = (config: OAuthConfig): OAuthConfig => {
    if (this.config) {
      throw new Error('OAuthProvider already configured.');
    }

    // Remove trailing slash from urls.
    if (config.loginUrl.substr(-1) === '/') {
      config.loginUrl = config.loginUrl.slice(0, -1);
    }

    if (config.logoutUrl.substr(-1) === '/') {
      config.logoutUrl = config.logoutUrl.slice(0, -1);
    }

    // Extend default configuration.
    this.config = objectAssign(this.defaults, config);

    // Redirect is set to current location by default
    const existingHash = window.location.hash;
    let pathDefault = window.location.href;

    // Remove not needed parts from urls.
    if (existingHash) {
      pathDefault = pathDefault.replace(existingHash, '');
    }

    if (pathDefault.substr(-1) === '#') {
      pathDefault = pathDefault.slice(0, -1);
    }

    this.config.redirectUri = config.redirectUri || pathDefault;

    return config;
  };

  public isAuthenticated = (): boolean => {
    return <any>this.oAuthTokenService.getToken();
  };

  public login = (): void => {
    window.location.href = this.getRedirectUrl();
  };

  public logout = (): void => {
    const redirectUrl = `${this.config.logoutUrl}?` +
      `${this.config.logoutRedirectParameterName}=${encodeURIComponent(this.config.redirectUri)}`;

    window.location.href = redirectUrl;
    this.oAuthTokenService.removeToken();
  };

  public loginOnStateChange = (toState: any): boolean => {
    if (toState && this.isLoginRequired(toState) && !this.isAuthenticated() && !this.getTokenDataFromUrl()) {

      if (this.localStorageService.isStorageSupported()) {
        let url = window.location.href;

        if (!window.location.hash && !this.config.pushStateNavigation) {
          url = this.getBaseRouteUrl();
        }

        this.localStorageService.set<string>(OAUTH_STARTPAGE_STORAGE_KEY, url);
      }

      this.login();

      return true;
    }

    return false;
  };

  public setTokenOnRedirect = (): void => {
    const tokenData = this.getTokenDataFromUrl();

    if (!this.isAuthenticated() && tokenData) {
      this.oAuthTokenService.setToken(tokenData);

      if (this.localStorageService.isStorageSupported() && this.localStorageService.get(OAUTH_STARTPAGE_STORAGE_KEY)) {
        const startPage = this.localStorageService.get<string>(OAUTH_STARTPAGE_STORAGE_KEY);

        this.localStorageService.remove(OAUTH_STARTPAGE_STORAGE_KEY);
        if (this.config.pushStateNavigation) {
          PLATFORM.history.replaceState(undefined, undefined, startPage);
        } else {
          window.location.href = startPage;
        }
      } else {
        const startPage = this.getBaseRouteUrl();

        // Redirect to the base application route
        if (this.config.pushStateNavigation) {
          PLATFORM.history.replaceState(undefined, undefined, startPage);
        } else {
          window.location.href = startPage;
        }
      }

      this.eventAggregator.publish(OAuthService.LOGIN_SUCCESS_EVENT, tokenData);

      if (this.config.autoTokenRenewal) {
        this.setAutomaticTokenRenewal();
      }
    }
  };

  private isLoginRequired = (state: any): boolean => {
    const routeHasConfig = state.settings && state.settings.requireLogin !== undefined;
    const routeRequiresLogin = routeHasConfig && state.settings.requireLogin ? true : false;

    return routeHasConfig ? routeRequiresLogin : this.config.alwaysRequireLogin;
  };

  private getTokenDataFromUrl = (hash?: string): OAuthTokenData => {
    const hashData = this.urlHashService.getHashData(hash);
    const tokenData = this.oAuthTokenService.createToken(hashData);

    return tokenData;
  };

  private getBaseRouteUrl = (): string => {
    let baseUrl = window.location.origin + window.location.pathname;
    if (!this.config.pushStateNavigation) { baseUrl += '/#/'; }

    return baseUrl;
  }

  private getSimpleNonceValue = (): string => {
    return ((Date.now() + Math.random()) * Math.random()).toString().replace('.', '');
  }

  private getRedirectUrl() {
    let redirectUrl = `${this.config.loginUrl}?` +
      `response_type=${this.oAuthTokenService.config.name}&` +
      `client_id=${encodeURIComponent(this.config.clientId)}&` +
      `redirect_uri=${encodeURIComponent(this.config.redirectUri)}&` +
      `nonce=${encodeURIComponent(this.getSimpleNonceValue())}`;

    if (this.config.scope) {
      redirectUrl += `&scope=${encodeURIComponent(this.config.scope)}`;
    }

    if (this.config.state) {
      redirectUrl += `&state=${encodeURIComponent(this.config.state)}`;
    }

    return redirectUrl;
  }

  private setAutomaticTokenRenewal() {
    const tokenExpirationTime = this.oAuthTokenService.getTokenExpirationTime() * 1000;

    setTimeout(() => {
      const iFrame = document.createElement('iframe');
      iFrame.src = this.getRedirectUrl();
      iFrame.style.display = 'none';
      iFrame.onload = (event) => {
        try {
          const hashWithNewToken = iFrame.contentWindow.location.hash;
          document.body.removeChild(iFrame);

          const tokenData = this.getTokenDataFromUrl(hashWithNewToken);

          if (tokenData) {
            this.oAuthTokenService.setToken(tokenData);
            this.setAutomaticTokenRenewal();
          }
        } catch (ex) {
          // iFrame.contentWindow can fail when an iframe loads identity server login page
          // but this page will not redirect back to the app url waiting for the user to login in
          // this behaviour my occur i.e. when login page authentication cookies expire
          document.body.removeChild(iFrame);
        }
      };

      document.body.appendChild(iFrame);
    }, tokenExpirationTime);
  }
}
