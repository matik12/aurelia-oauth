import { FrameworkConfiguration } from 'aurelia-framework';
import { OAuthService } from './oauth-service';
import { OAuthTokenService } from './oauth-token-service';
import OAuthInterceptor from './oauth-interceptor';
export declare function configure(framework: FrameworkConfiguration, config: (oauthService, oauthTokenService) => void): void;
export { OAuthService, OAuthTokenService, OAuthInterceptor };
