import { EventAggregator } from 'aurelia-event-aggregator';
import { autoinject } from 'aurelia-dependency-injection';

import { OAuthService } from './oauth-service';
import { OAuthTokenService } from './oauth-token-service';

const AUTHORIZATION_HEADER: string = 'Authorization';

@autoinject()
export default class OAuthInterceptor {
    constructor(
        private oauthTokenService: OAuthTokenService,
        private eventAggregator: EventAggregator) { }

    public request = (config: any): any => {
        if (this.oauthTokenService.getToken() && !this.oauthTokenService.isTokenValid()) {
            config.tokenExpired = true;
            this.eventAggregator.publish(OAuthService.INVALID_TOKEN_EVENT);

            return Promise.reject(config);
        }

        // Support for http-client
        if (config.headers.add && !config.headers.get(AUTHORIZATION_HEADER)) {
            config.headers.add(AUTHORIZATION_HEADER, this.oauthTokenService.getAuthorizationHeader());
        }

        // Support for fetch-client
        if (config.headers.append && !config.headers.get(AUTHORIZATION_HEADER)) {
            config.headers.append(AUTHORIZATION_HEADER, this.oauthTokenService.getAuthorizationHeader());
        }

        return config;
    };

    public response = (response: any, request?: any): any => {
        this.handleRequestError(response, request);
        return response;
    };

    public responseError = (response: any, request?: any): any => {
        this.handleRequestError(response, request);
        return Promise.reject(response);
    };

    private handleRequestError(response: any, requestMessage?: any) {
        // Support for http-client
        if (response && response.statusCode && response.statusCode === 401
            && !response.requestMessage.tokenExpired && !this.oauthTokenService.isTokenValid()) {
            response.tokenExpired = true;
            this.eventAggregator.publish(OAuthService.INVALID_TOKEN_EVENT, response);
        }

        // Support for fetch-client
        if (response && response.status && response.status === 401
            && !requestMessage.tokenExpired && !this.oauthTokenService.isTokenValid()) {
            response.tokenExpired = true;
            this.eventAggregator.publish(OAuthService.INVALID_TOKEN_EVENT, response);
        }
    }
}