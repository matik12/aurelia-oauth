System.register(['aurelia-router', 'aurelia-http-client', './oauth-service', './oauth-token-service', './oauth-interceptor', './oauth-authorize-step', './oauth-polyfills'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var aurelia_router_1, aurelia_http_client_1, oauth_service_1, oauth_token_service_1, oauth_interceptor_1, oauth_authorize_step_1;
    function configure(framework, config) {
        var oauthService = framework.container.get(oauth_service_1.OAuthService);
        var oauthTokenService = framework.container.get(oauth_token_service_1.OAuthTokenService);
        var httpClient = framework.container.get(aurelia_http_client_1.HttpClient);
        var oauthInterceptor = framework.container.get(oauth_interceptor_1.default);
        config(oauthService, oauthTokenService);
        httpClient.configure(function (builder) { return builder.withInterceptor(oauthInterceptor); });
        framework.aurelia.start().then(function () {
            oauthService.setTokenOnRedirect();
            var appRouter = framework.container.get(aurelia_router_1.AppRouter);
            appRouter.pipelineProvider.steps.splice(2, 0, oauth_authorize_step_1.OAuthAuthorizeStep);
        });
    }
    exports_1("configure", configure);
    return {
        setters:[
            function (aurelia_router_1_1) {
                aurelia_router_1 = aurelia_router_1_1;
            },
            function (aurelia_http_client_1_1) {
                aurelia_http_client_1 = aurelia_http_client_1_1;
            },
            function (oauth_service_1_1) {
                oauth_service_1 = oauth_service_1_1;
            },
            function (oauth_token_service_1_1) {
                oauth_token_service_1 = oauth_token_service_1_1;
            },
            function (oauth_interceptor_1_1) {
                oauth_interceptor_1 = oauth_interceptor_1_1;
            },
            function (oauth_authorize_step_1_1) {
                oauth_authorize_step_1 = oauth_authorize_step_1_1;
            },
            function (_1) {}],
        execute: function() {
            exports_1("OAuthService", oauth_service_1.OAuthService);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1cmVsaWEtb2F1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQVVBLG1CQUEwQixTQUFpQyxFQUFFLE1BQWlEO1FBRTFHLElBQUksWUFBWSxHQUFpQixTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw0QkFBWSxDQUFDLENBQUM7UUFDdkUsSUFBSSxpQkFBaUIsR0FBc0IsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsdUNBQWlCLENBQUMsQ0FBQztRQUN0RixJQUFJLFVBQVUsR0FBZSxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQ0FBVSxDQUFDLENBQUM7UUFDakUsSUFBSSxnQkFBZ0IsR0FBcUIsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsMkJBQWdCLENBQUMsQ0FBQztRQUVuRixNQUFNLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFFeEMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsRUFBekMsQ0FBeUMsQ0FBQyxDQUFDO1FBRTNFLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQzdCLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBR2xDLElBQUksU0FBUyxHQUFjLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDBCQUFTLENBQUMsQ0FBQztZQUN4RCxTQUFVLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLHlDQUFrQixDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBbEJELGlDQWtCQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUdDLHVEQUFZIiwiZmlsZSI6ImF1cmVsaWEtb2F1dGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGcmFtZXdvcmtDb25maWd1cmF0aW9uIH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5pbXBvcnQgeyBBcHBSb3V0ZXIsIFJvdXRlckNvbmZpZ3VyYXRpb24gfSBmcm9tICdhdXJlbGlhLXJvdXRlcic7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdhdXJlbGlhLWh0dHAtY2xpZW50JztcclxuXHJcbmltcG9ydCB7IE9BdXRoU2VydmljZSB9IGZyb20gJy4vb2F1dGgtc2VydmljZSc7XHJcbmltcG9ydCB7IE9BdXRoVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC10b2tlbi1zZXJ2aWNlJztcclxuaW1wb3J0IE9BdXRoSW50ZXJjZXB0b3IgZnJvbSAnLi9vYXV0aC1pbnRlcmNlcHRvcic7XHJcbmltcG9ydCB7IE9BdXRoQXV0aG9yaXplU3RlcCB9IGZyb20gJy4vb2F1dGgtYXV0aG9yaXplLXN0ZXAnO1xyXG5pbXBvcnQgJy4vb2F1dGgtcG9seWZpbGxzJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmUoZnJhbWV3b3JrOiBGcmFtZXdvcmtDb25maWd1cmF0aW9uLCBjb25maWc6IChvYXV0aFNlcnZpY2UsIG9hdXRoVG9rZW5TZXJ2aWNlKSA9PiB2b2lkKSB7XHJcblxyXG4gICAgdmFyIG9hdXRoU2VydmljZSA9IDxPQXV0aFNlcnZpY2U+ZnJhbWV3b3JrLmNvbnRhaW5lci5nZXQoT0F1dGhTZXJ2aWNlKTtcclxuICAgIHZhciBvYXV0aFRva2VuU2VydmljZSA9IDxPQXV0aFRva2VuU2VydmljZT5mcmFtZXdvcmsuY29udGFpbmVyLmdldChPQXV0aFRva2VuU2VydmljZSk7XHJcbiAgICB2YXIgaHR0cENsaWVudCA9IDxIdHRwQ2xpZW50PmZyYW1ld29yay5jb250YWluZXIuZ2V0KEh0dHBDbGllbnQpO1xyXG4gICAgdmFyIG9hdXRoSW50ZXJjZXB0b3IgPSA8T0F1dGhJbnRlcmNlcHRvcj5mcmFtZXdvcmsuY29udGFpbmVyLmdldChPQXV0aEludGVyY2VwdG9yKTtcclxuXHJcbiAgICBjb25maWcob2F1dGhTZXJ2aWNlLCBvYXV0aFRva2VuU2VydmljZSk7XHJcblxyXG4gICAgaHR0cENsaWVudC5jb25maWd1cmUoYnVpbGRlciA9PiBidWlsZGVyLndpdGhJbnRlcmNlcHRvcihvYXV0aEludGVyY2VwdG9yKSk7XHJcblxyXG4gICAgZnJhbWV3b3JrLmF1cmVsaWEuc3RhcnQoKS50aGVuKCgpID0+IHtcclxuICAgICAgb2F1dGhTZXJ2aWNlLnNldFRva2VuT25SZWRpcmVjdCgpO1xyXG5cclxuICAgICAgLy8gQWRkIGF1dGhvcml6ZSBzdGVwIGJlZm9yZSB2aWV3LW1vZGVsIGFjdGl2YXRlIHByZWRlZmluZWQgcGlwZWxpbmUgc3RlcFxyXG4gICAgICBsZXQgYXBwUm91dGVyID0gPEFwcFJvdXRlcj5mcmFtZXdvcmsuY29udGFpbmVyLmdldChBcHBSb3V0ZXIpO1xyXG4gICAgICAoPGFueT5hcHBSb3V0ZXIpLnBpcGVsaW5lUHJvdmlkZXIuc3RlcHMuc3BsaWNlKDIsIDAsIE9BdXRoQXV0aG9yaXplU3RlcCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IHtcclxuICBPQXV0aFNlcnZpY2VcclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
