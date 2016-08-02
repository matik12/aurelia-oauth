import { Redirect, Next } from 'aurelia-router';
import { autoinject } from 'aurelia-dependency-injection';

import { OAuthService } from './oauth-service';

@autoinject()
export class OAuthAuthorizeStep {
  constructor(private oauthService: OAuthService) { }

  run(routingContext, next: Next) {
    let toState = routingContext.config;    
    
    if (this.oauthService.loginOnStateChange(toState)) {
      return next.complete('Redirect');
    }

    return next();
  }  
}