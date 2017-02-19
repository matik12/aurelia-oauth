import { EventAggregator } from 'aurelia-event-aggregator';
import { OAuthTokenService } from './oauth-token-service';
import UrlHashService from './url-hash-service';
import LocalStorageService from './local-storage-service';
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
}
export declare class OAuthService {
    private oAuthTokenService;
    private urlHashService;
    private localStorageService;
    private eventAggregator;
    config: OAuthConfig;
    private defaults;
    static readonly LOGIN_SUCCESS_EVENT: string;
    static readonly INVALID_TOKEN_EVENT: string;
    constructor(oAuthTokenService: OAuthTokenService, urlHashService: UrlHashService, localStorageService: LocalStorageService, eventAggregator: EventAggregator);
    configure: (config: OAuthConfig) => OAuthConfig;
    isAuthenticated: () => boolean;
    login: () => void;
    logout: () => void;
    loginOnStateChange: (toState: any) => boolean;
    setTokenOnRedirect: () => void;
    private isLoginRequired;
    private getTokenDataFromUrl;
    private getBaseRouteUrl;
    private getSimpleNonceValue;
    private getRedirectUrl();
    private setAutomaticTokenRenewal();
}
