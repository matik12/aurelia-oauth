import { autoinject } from 'aurelia-dependency-injection';

import JwtTokenService from './jwt-token-service';

@autoinject()
export class OAuthTokenService implements IOAuthTokenService {
    
    private tokenData: IOAuthTokenData;
    public config: IOAuthTokenConfig;

    constructor(private jwtTokenService: JwtTokenService) {
        this.config = {
            name: 'id_token',
            urlTokenParameters: {
                idToken: 'id_token',
                tokenType: 'token_type'
            },
            expireOffsetSeconds: 120
        };
     }

    public configure = (config: IOAuthTokenConfig): IOAuthTokenConfig => {

        // Extend default configration with supplied config data
        if (config.urlTokenParameters) {
            config.urlTokenParameters = Object.assign(this.config.urlTokenParameters, config.urlTokenParameters);
        }
        
        this.config = Object.assign(this.config, config);

        return config;
    };

    public createToken = (urlTokenData: any): IOAuthTokenData => {
        var token = urlTokenData[this.config.urlTokenParameters.idToken];
        var tokenType = urlTokenData[this.config.urlTokenParameters.tokenType] || 'Bearer';
        
        if (!token) {
            return null;
        }

        var claims: IJwtClaims = this.jwtTokenService.getJwtClaims(token);
        var issuedTime = claims.nbf ? claims.nbf : claims.iat;
        var expirationTime = claims.exp - issuedTime;

        return {
            token: token,
            tokenType: tokenType,
            expiresAt: this.getTimeNow() + expirationTime,
            jwtClaims: claims
        };
    };

    public setToken = (data: IOAuthTokenData): IOAuthTokenData => {
        return this.tokenData = data;
    };    
    
    public getToken = (): IOAuthTokenData => {
        return this.tokenData;
    };
    
    public getIdToken = (): string => {
        return this.getToken() ? this.getToken().token : undefined;
    };
    
    public getAuthorizationHeader = (): string => {
        if (!(this.getTokenType() && this.getIdToken())) {
            return '';
        }

        var tokenType = this.getTokenType().charAt(0).toUpperCase() + this.getTokenType().substr(1);

        return `${tokenType} ${this.getIdToken()}`;
    };
            
    public getTokenType = (): string => {
        return this.getToken() ? this.getToken().tokenType : undefined;
    };
    
    public removeToken = (): IOAuthTokenData => {
        return this.tokenData = null;
    };

    public isTokenValid = (): boolean => {
        var token = this.getToken();

        if (!token) {
            return false;
        }

        var timeNow = this.getTimeNow();
        var expiresAt = token.expiresAt;
        var isValid = (expiresAt && (expiresAt > timeNow + this.config.expireOffsetSeconds));

        return isValid;
    };

    private getTimeNow = (): number => {
        return Math.round(new Date().getTime() / 1000.0);
    };      
}