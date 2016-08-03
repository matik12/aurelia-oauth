System.register(['aurelia-router', 'aurelia-http-client', './oauth-service', './oauth-token-service', './oauth-interceptor', './oauth-authorize-step'], function(exports_1, context_1) {
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
            }],
        execute: function() {
            exports_1("OAuthService", oauth_service_1.OAuthService);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1cmVsaWEtb2F1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQVNBLG1CQUEwQixTQUFpQyxFQUFFLE1BQWlEO1FBRTFHLElBQUksWUFBWSxHQUFpQixTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw0QkFBWSxDQUFDLENBQUM7UUFDdkUsSUFBSSxpQkFBaUIsR0FBc0IsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsdUNBQWlCLENBQUMsQ0FBQztRQUN0RixJQUFJLFVBQVUsR0FBZSxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQ0FBVSxDQUFDLENBQUM7UUFDakUsSUFBSSxnQkFBZ0IsR0FBcUIsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsMkJBQWdCLENBQUMsQ0FBQztRQUVuRixNQUFNLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFFeEMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsRUFBekMsQ0FBeUMsQ0FBQyxDQUFDO1FBRTNFLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQzdCLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBR2xDLElBQUksU0FBUyxHQUFjLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDBCQUFTLENBQUMsQ0FBQztZQUN4RCxTQUFVLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLHlDQUFrQixDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBbEJELGlDQWtCQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBR0MsdURBQVkiLCJmaWxlIjoiYXVyZWxpYS1vYXV0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZyYW1ld29ya0NvbmZpZ3VyYXRpb24gfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCB7IEFwcFJvdXRlciwgUm91dGVyQ29uZmlndXJhdGlvbiB9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ2F1cmVsaWEtaHR0cC1jbGllbnQnO1xyXG5cclxuaW1wb3J0IHsgT0F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC1zZXJ2aWNlJztcclxuaW1wb3J0IHsgT0F1dGhUb2tlblNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXRva2VuLXNlcnZpY2UnO1xyXG5pbXBvcnQgT0F1dGhJbnRlcmNlcHRvciBmcm9tICcuL29hdXRoLWludGVyY2VwdG9yJztcclxuaW1wb3J0IHsgT0F1dGhBdXRob3JpemVTdGVwIH0gZnJvbSAnLi9vYXV0aC1hdXRob3JpemUtc3RlcCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGZyYW1ld29yazogRnJhbWV3b3JrQ29uZmlndXJhdGlvbiwgY29uZmlnOiAob2F1dGhTZXJ2aWNlLCBvYXV0aFRva2VuU2VydmljZSkgPT4gdm9pZCkge1xyXG5cclxuICAgIHZhciBvYXV0aFNlcnZpY2UgPSA8T0F1dGhTZXJ2aWNlPmZyYW1ld29yay5jb250YWluZXIuZ2V0KE9BdXRoU2VydmljZSk7XHJcbiAgICB2YXIgb2F1dGhUb2tlblNlcnZpY2UgPSA8T0F1dGhUb2tlblNlcnZpY2U+ZnJhbWV3b3JrLmNvbnRhaW5lci5nZXQoT0F1dGhUb2tlblNlcnZpY2UpO1xyXG4gICAgdmFyIGh0dHBDbGllbnQgPSA8SHR0cENsaWVudD5mcmFtZXdvcmsuY29udGFpbmVyLmdldChIdHRwQ2xpZW50KTtcclxuICAgIHZhciBvYXV0aEludGVyY2VwdG9yID0gPE9BdXRoSW50ZXJjZXB0b3I+ZnJhbWV3b3JrLmNvbnRhaW5lci5nZXQoT0F1dGhJbnRlcmNlcHRvcik7XHJcblxyXG4gICAgY29uZmlnKG9hdXRoU2VydmljZSwgb2F1dGhUb2tlblNlcnZpY2UpO1xyXG5cclxuICAgIGh0dHBDbGllbnQuY29uZmlndXJlKGJ1aWxkZXIgPT4gYnVpbGRlci53aXRoSW50ZXJjZXB0b3Iob2F1dGhJbnRlcmNlcHRvcikpO1xyXG5cclxuICAgIGZyYW1ld29yay5hdXJlbGlhLnN0YXJ0KCkudGhlbigoKSA9PiB7XHJcbiAgICAgIG9hdXRoU2VydmljZS5zZXRUb2tlbk9uUmVkaXJlY3QoKTtcclxuXHJcbiAgICAgIC8vIEFkZCBhdXRob3JpemUgc3RlcCBiZWZvcmUgdmlldy1tb2RlbCBhY3RpdmF0ZSBwcmVkZWZpbmVkIHBpcGVsaW5lIHN0ZXBcclxuICAgICAgbGV0IGFwcFJvdXRlciA9IDxBcHBSb3V0ZXI+ZnJhbWV3b3JrLmNvbnRhaW5lci5nZXQoQXBwUm91dGVyKTtcclxuICAgICAgKDxhbnk+YXBwUm91dGVyKS5waXBlbGluZVByb3ZpZGVyLnN0ZXBzLnNwbGljZSgyLCAwLCBPQXV0aEF1dGhvcml6ZVN0ZXApO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgT0F1dGhTZXJ2aWNlXHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
