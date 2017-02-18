import { EventAggregator } from 'aurelia-event-aggregator';
import { HttpRequestMessage } from 'aurelia-http-client';
import { OAuthTokenService } from './oauth-token-service';
export default class OAuthInterceptor {
    private oauthTokenService;
    private eventAggregator;
    constructor(oauthTokenService: OAuthTokenService, eventAggregator: EventAggregator);
    request: (config: HttpRequestMessage) => any;
    responseError: (response: any) => any;
}
