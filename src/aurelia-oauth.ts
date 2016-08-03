import { FrameworkConfiguration } from 'aurelia-framework';
import { AppRouter, RouterConfiguration } from 'aurelia-router';
import { HttpClient } from 'aurelia-http-client';

import { OAuthService } from './oauth-service';
import { OAuthTokenService } from './oauth-token-service';
import OAuthInterceptor from './oauth-interceptor';
import { OAuthAuthorizeStep } from './oauth-authorize-step';

export function configure(framework: FrameworkConfiguration, config: (oauthService, oauthTokenService) => void) {

    var oauthService = <OAuthService>framework.container.get(OAuthService);
    var oauthTokenService = <OAuthTokenService>framework.container.get(OAuthTokenService);
    var httpClient = <HttpClient>framework.container.get(HttpClient);
    var oauthInterceptor = <OAuthInterceptor>framework.container.get(OAuthInterceptor);

    config(oauthService, oauthTokenService);

    httpClient.configure(builder => builder.withInterceptor(oauthInterceptor));

    framework.aurelia.start().then(() => {
      oauthService.setTokenOnRedirect();

      // Add authorize step before view-model activate predefined pipeline step
      let appRouter = <AppRouter>framework.container.get(AppRouter);
      (<any>appRouter).pipelineProvider.steps.splice(2, 0, OAuthAuthorizeStep);
    });
}

export {
  OAuthService
}