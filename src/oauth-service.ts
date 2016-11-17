import { EventAggregator } from 'aurelia-event-aggregator';
import { autoinject } from 'aurelia-dependency-injection';

import { OAuthTokenService } from './oauth-token-service';
import UrlHashService from './url-hash-service';
import LocalStorageService from './local-storage-service';
import { objectAssign } from './oauth-polyfills';

const OAUTH_STARTPAGE_STORAGE_KEY: string = 'oauth.startPage';

@autoinject()
export class OAuthService implements IOAuthService {

    private defaults: IOAuthConfig;
    public config: IOAuthConfig;

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
            alwaysRequireLogin: false
        };
    }

    public configure = (config: IOAuthConfig): IOAuthConfig => {
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
        var existingHash = window.location.hash;
        var pathDefault = window.location.href;

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
        var redirectUrl = `${this.config.loginUrl}?` +
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
        
        window.location.href = redirectUrl;
    };

    public logout = (): void => {
        var redirectUrl = `${this.config.logoutUrl}?` +
            `${this.config.logoutRedirectParameterName}=${encodeURIComponent(this.config.redirectUri)}&` +
            `id_token_hint=${encodeURIComponent(this.oAuthTokenService.getIdToken())}`;

        window.location.href = redirectUrl;
        this.oAuthTokenService.removeToken();
    };   

    public loginOnStateChange = (toState): boolean => {
        if (toState && this.isLoginRequired(toState) && !this.isAuthenticated() && !this.getTokenDataFromUrl()) {

            if (this.localStorageService.isStorageSupported()) {
                let url = window.location.href;

                if (!window.location.hash) {
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
        var tokenData = this.getTokenDataFromUrl();

        if (!this.isAuthenticated() && tokenData) {
            this.oAuthTokenService.setToken(tokenData);

            if (this.localStorageService.isStorageSupported() && this.localStorageService.get(OAUTH_STARTPAGE_STORAGE_KEY)) {
                var startPage = this.localStorageService.get<string>(OAUTH_STARTPAGE_STORAGE_KEY);

                this.localStorageService.remove(OAUTH_STARTPAGE_STORAGE_KEY);                
                window.location.href = startPage;
            } else {
                // Redirect to the base application route
                window.location.href = this.getBaseRouteUrl();
            }

            this.eventAggregator.publish(OAuthService.LOGIN_SUCCESS_EVENT, tokenData);
        }
    };

    private isLoginRequired = (state): boolean => { 
        var routeHasConfig = state.settings && state.settings.requireLogin !== undefined;
        var routeRequiresLogin = routeHasConfig && state.settings.requireLogin ? true : false;

        return routeHasConfig ? routeRequiresLogin : this.config.alwaysRequireLogin;
    };

    private getTokenDataFromUrl = (): IOAuthTokenData => {
        var hashData = this.urlHashService.getHashData();
        var tokenData = this.oAuthTokenService.createToken(hashData);

        return tokenData;
    };

    private getBaseRouteUrl = (): string => {
        return window.location.origin + '/#/';
    }

    private getSimpleNonceValue = (): string => {
        return ((Date.now() + Math.random()) * Math.random()).toString().replace('.', '');
    }
}