declare module 'aurelia-oauth' {
  export class OAuthService implements IOAuthService {
    static LOGIN_SUCCESS_EVENT(): string;
    static INVALID_TOKEN_EVENT(): string;
    config: IOAuthConfig;

    constructor();
   
    configure: (config: IOAuthConfig) => IOAuthConfig;

    isAuthenticated: () => boolean;
    login: () => void;
    logout: () => void;
    loginOnStateChange: (toState) => boolean;
    setTokenOnRedirect: () => void;
  }
}

interface IOAuthTokenService {
    config: IOAuthTokenConfig;

    configure: (config: IOAuthTokenConfig) => IOAuthTokenConfig;

    isTokenValid: () => boolean;
    createToken: (urlTokenData: any) => IOAuthTokenData;
    setToken: (data: IOAuthTokenData) => void;
    getToken: () => IOAuthTokenData;
    removeToken: () => void; 
    getAuthorizationHeader: () => string;
}

interface IOAuthTokenData {
    token: string;
    tokenType: string;
    expiresAt: number;
    jwtClaims?: IJwtClaims;
}

interface IOAuthTokenConfig {
    name: string;
    urlTokenParameters?: {
        idToken: string;
        tokenType?: string;
    };
    expireOffsetSeconds?: number;
}

interface IOAuthConfig {
    loginUrl: string;
    logoutUrl: string;
    clientId: string;
    logoutRedirectParameterName?: string;
    scope?: string;
    redirectUri?: string;
    alwaysRequireLogin?: boolean;
}

interface IOAuthService {
    config: IOAuthConfig;
    
    configure: (config: IOAuthConfig) => IOAuthConfig;

    isAuthenticated: () => boolean;
    login: () => void;
    logout: () => void;
    loginOnStateChange: (toState) => boolean;
    setTokenOnRedirect: () => void;
}

interface IJwtClaims {
    exp: number;
    nbf?: number;
    iat?: number;
    ppid?: string;
    given_name?: string;
}