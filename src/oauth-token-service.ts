import { autoinject } from 'aurelia-dependency-injection';

import JwtTokenService, { JwtClaims } from './jwt-token-service';
import { objectAssign } from './oauth-polyfills';

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

@autoinject()
export class OAuthTokenService {

    public config: OAuthTokenConfig;

    private tokenData: OAuthTokenData;

    constructor(private jwtTokenService: JwtTokenService) {
        this.config = {
            name: 'id_token',
            urlTokenParameters: {
                idToken: 'id_token',
                tokenType: 'token_type'
            },
            expireOffsetSeconds: 60
        };
    }

    public configure = (config: OAuthTokenConfig): OAuthTokenConfig => {

        // Extend default configration with supplied config data
        if (config.urlTokenParameters) {
            config.urlTokenParameters = objectAssign(this.config.urlTokenParameters, config.urlTokenParameters);
        }

        this.config = objectAssign(this.config, config);

        return config;
    };

    public createToken = (urlTokenData: any): OAuthTokenData => {
        const token = urlTokenData[this.config.urlTokenParameters.idToken];
        const tokenType = urlTokenData[this.config.urlTokenParameters.tokenType] || 'Bearer';

        if (!token) {
            return null;
        }

        const claims: JwtClaims = this.jwtTokenService.getJwtClaims(token);
        const issuedTime = claims.nbf ? claims.nbf : claims.iat;
        const expirationTime = claims.exp - issuedTime;

        return {
            token: token,
            tokenType: tokenType,
            expiresAt: this.getTimeNow() + expirationTime,
            jwtClaims: claims
        };
    };

    public setToken = (data: OAuthTokenData): OAuthTokenData => {
        return this.tokenData = data;
    };

    public getToken = (): OAuthTokenData => {
        return this.tokenData;
    };

    public getIdToken = (): string => {
        return this.getToken() ? this.getToken().token : undefined;
    };

    public getAuthorizationHeader = (): string => {
        if (!(this.getTokenType() && this.getIdToken())) {
            return '';
        }

        const tokenType = this.getTokenType().charAt(0).toUpperCase() + this.getTokenType().substr(1);

        return `${tokenType} ${this.getIdToken()}`;
    };

    public getTokenType = (): string => {
        return this.getToken() ? this.getToken().tokenType : undefined;
    };

    public getTokenExpirationTime = (): number => {
        const tokenRenewalOffsetSeconds = 30;
        const expireOffset = this.config.expireOffsetSeconds + tokenRenewalOffsetSeconds;

        return (this.tokenData.expiresAt - this.getTimeNow() - expireOffset);
    };

    public removeToken = (): OAuthTokenData => {
        return this.tokenData = null;
    };

    public isTokenValid = (): boolean => {
        const token = this.getToken();

        if (!token) {
            return false;
        }

        const timeNow = this.getTimeNow();
        const expiresAt = token.expiresAt;
        const isValid = (expiresAt && (expiresAt > timeNow + this.config.expireOffsetSeconds));

        return isValid;
    };

    private getTimeNow = (): number => {
        return Math.round(new Date().getTime() / 1000.0);
    };
}