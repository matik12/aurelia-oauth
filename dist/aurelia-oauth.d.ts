export class OAuthService {
    static LOGIN_SUCCESS_EVENT(): string;
    static INVALID_TOKEN_EVENT(): string;
    config: OAuthConfig;

    configure: (config: OAuthConfig) => OAuthConfig;

    isAuthenticated: () => boolean;
    login: () => void;
    logout: () => void;
    loginOnStateChange: (toState) => boolean;
    setTokenOnRedirect: () => void;
}

export class OAuthTokenService {
    config: OAuthTokenConfig;

    configure: (config: OAuthTokenConfig) => OAuthTokenConfig;

    isTokenValid: () => boolean;
    createToken: (urlTokenData: any) => OAuthTokenData;
    setToken: (data: OAuthTokenData) => void;
    getToken: () => OAuthTokenData;
    removeToken: () => void;
    getAuthorizationHeader: () => string;
}

export class OAuthInterceptor {
    request: (config) => any;
    responseError: (response) => any;
}

export interface OAuthConfig {
    loginUrl: string;
    logoutUrl: string;
    clientId: string;
    logoutRedirectParameterName?: string;
    scope?: string;
    state?: string;
    redirectUri?: string;
    alwaysRequireLogin?: boolean;
}

export interface OAuthTokenConfig {
    name: string;
    urlTokenParameters?: {
        idToken: string;
        tokenType?: string;
    };
    expireOffsetSeconds?: number;
}

export interface OAuthTokenData {
    token: string;
    tokenType: string;
    expiresAt: number;
    jwtClaims?: JwtClaims;
}

export interface JwtClaims {
    exp: number;
    nbf?: number;
    iat?: number;
    ppid?: string;
    given_name?: string;
}