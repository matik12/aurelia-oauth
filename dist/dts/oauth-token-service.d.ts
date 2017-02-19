import JwtTokenService, { JwtClaims } from './jwt-token-service';
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
export declare class OAuthTokenService {
    private jwtTokenService;
    config: OAuthTokenConfig;
    private tokenData;
    constructor(jwtTokenService: JwtTokenService);
    configure: (config: OAuthTokenConfig) => OAuthTokenConfig;
    createToken: (urlTokenData: any) => OAuthTokenData;
    setToken: (data: OAuthTokenData) => OAuthTokenData;
    getToken: () => OAuthTokenData;
    getIdToken: () => string;
    getAuthorizationHeader: () => string;
    getTokenType: () => string;
    getTokenExpirationTime: () => number;
    removeToken: () => OAuthTokenData;
    isTokenValid: () => boolean;
    private getTimeNow;
}
