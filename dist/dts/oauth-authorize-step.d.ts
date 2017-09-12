import { Next } from 'aurelia-router';
import { OAuthService } from './oauth-service';
export declare class OAuthAuthorizeStep {
    private oauthService;
    constructor(oauthService: OAuthService);
    run(routingContext: any, next: Next): any;
}
