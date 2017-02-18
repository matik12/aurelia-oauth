import { EventAggregator } from 'aurelia-event-aggregator';
import { HttpRequestMessage } from 'aurelia-http-client';
import { autoinject } from 'aurelia-dependency-injection';

import { OAuthService } from './oauth-service';
import { OAuthTokenService } from './oauth-token-service';

const AUTHORIZATION_HEADER: string = 'Authorization';

@autoinject()
export default class OAuthInterceptor {
    constructor(
        private oauthTokenService: OAuthTokenService,
        private eventAggregator: EventAggregator) { }

    public request = (config: HttpRequestMessage): any => {
        if (config.url.indexOf(window.location.origin) > -1) {
            return config;
        }

        if (this.oauthTokenService.getToken() && !this.oauthTokenService.isTokenValid()) {
            this.eventAggregator.publish(OAuthService.INVALID_TOKEN_EVENT);

            return Promise.reject(config);
        }

        if (!config.headers.get(AUTHORIZATION_HEADER)) {
            config.headers.add(AUTHORIZATION_HEADER, this.oauthTokenService.getAuthorizationHeader());
        }

        return config;
    };

    public responseError = (response): any => {
        // Catch 'invalid_request' and 'invalid_grant' errors and ensure that the 'token' is removed.
        if (response.status === 400 && response.data &&
            (response.data.error === 'invalid_request' || response.data.error === 'invalid_grant')) {

            this.eventAggregator.publish(OAuthService.INVALID_TOKEN_EVENT, response);
        }

        // Catch 'invalid_token' and 'unauthorized' errors.
        let tokenType = this.oauthTokenService.getTokenType();
        if (response.status === 401 &&
            (response.data && response.data.error === 'invalid_token') ||
            (response.headers.get('www-authenticate') && response.headers.get('www-authenticate').indexOf(tokenType) === 0)) {

            this.eventAggregator.publish(OAuthService.INVALID_TOKEN_EVENT, response);
        }

        return Promise.reject(response);
    };
}