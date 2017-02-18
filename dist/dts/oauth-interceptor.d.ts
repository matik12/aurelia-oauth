import { EventAggregator } from 'aurelia-event-aggregator';
import { OAuthTokenService } from './oauth-token-service';
export default class OAuthInterceptor {
    private oauthTokenService;
    private eventAggregator;
    constructor(oauthTokenService: OAuthTokenService, eventAggregator: EventAggregator);
    request: (config: any) => any;
    response: (response: any, request?: any) => any;
    responseError: (response: any, request?: any) => any;
    private handleRequestError(response, requestMessage?);
}
