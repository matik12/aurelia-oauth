System.register(["aurelia-router", "aurelia-http-client", "./oauth-service", "./oauth-token-service", "./oauth-interceptor", "./oauth-authorize-step"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    var aurelia_router_1, aurelia_http_client_1, oauth_service_1, oauth_token_service_1, oauth_interceptor_1, oauth_authorize_step_1;
    return {
        setters: [
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
            }
        ],
        execute: function () {
            exports_1("OAuthService", oauth_service_1.OAuthService);
            exports_1("OAuthTokenService", oauth_token_service_1.OAuthTokenService);
            exports_1("OAuthInterceptor", oauth_interceptor_1.default);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXJlbGlhLW9hdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVNBLG1CQUEwQixTQUFpQyxFQUFFLE1BQWlEO1FBRTFHLElBQU0sWUFBWSxHQUFpQixTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw0QkFBWSxDQUFDLENBQUM7UUFDekUsSUFBTSxpQkFBaUIsR0FBc0IsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsdUNBQWlCLENBQUMsQ0FBQztRQUN4RixJQUFNLFVBQVUsR0FBZSxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQ0FBVSxDQUFDLENBQUM7UUFDbkUsSUFBTSxnQkFBZ0IsR0FBcUIsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsMkJBQWdCLENBQUMsQ0FBQztRQUVyRixNQUFNLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFFeEMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsRUFBekMsQ0FBeUMsQ0FBQyxDQUFDO1FBRTNFLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQzdCLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBR2xDLElBQUksU0FBUyxHQUFjLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDBCQUFTLENBQUMsQ0FBQztZQUN4RCxTQUFVLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLHlDQUFrQixDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBTUEsQ0FBQyIsImZpbGUiOiJhdXJlbGlhLW9hdXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRnJhbWV3b3JrQ29uZmlndXJhdGlvbiB9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0IHsgQXBwUm91dGVyIH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnYXVyZWxpYS1odHRwLWNsaWVudCc7XHJcblxyXG5pbXBvcnQgeyBPQXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPQXV0aFRva2VuU2VydmljZSB9IGZyb20gJy4vb2F1dGgtdG9rZW4tc2VydmljZSc7XHJcbmltcG9ydCBPQXV0aEludGVyY2VwdG9yIGZyb20gJy4vb2F1dGgtaW50ZXJjZXB0b3InO1xyXG5pbXBvcnQgeyBPQXV0aEF1dGhvcml6ZVN0ZXAgfSBmcm9tICcuL29hdXRoLWF1dGhvcml6ZS1zdGVwJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmUoZnJhbWV3b3JrOiBGcmFtZXdvcmtDb25maWd1cmF0aW9uLCBjb25maWc6IChvYXV0aFNlcnZpY2UsIG9hdXRoVG9rZW5TZXJ2aWNlKSA9PiB2b2lkKSB7XHJcblxyXG4gICAgY29uc3Qgb2F1dGhTZXJ2aWNlID0gPE9BdXRoU2VydmljZT5mcmFtZXdvcmsuY29udGFpbmVyLmdldChPQXV0aFNlcnZpY2UpO1xyXG4gICAgY29uc3Qgb2F1dGhUb2tlblNlcnZpY2UgPSA8T0F1dGhUb2tlblNlcnZpY2U+ZnJhbWV3b3JrLmNvbnRhaW5lci5nZXQoT0F1dGhUb2tlblNlcnZpY2UpO1xyXG4gICAgY29uc3QgaHR0cENsaWVudCA9IDxIdHRwQ2xpZW50PmZyYW1ld29yay5jb250YWluZXIuZ2V0KEh0dHBDbGllbnQpO1xyXG4gICAgY29uc3Qgb2F1dGhJbnRlcmNlcHRvciA9IDxPQXV0aEludGVyY2VwdG9yPmZyYW1ld29yay5jb250YWluZXIuZ2V0KE9BdXRoSW50ZXJjZXB0b3IpO1xyXG5cclxuICAgIGNvbmZpZyhvYXV0aFNlcnZpY2UsIG9hdXRoVG9rZW5TZXJ2aWNlKTtcclxuXHJcbiAgICBodHRwQ2xpZW50LmNvbmZpZ3VyZShidWlsZGVyID0+IGJ1aWxkZXIud2l0aEludGVyY2VwdG9yKG9hdXRoSW50ZXJjZXB0b3IpKTtcclxuXHJcbiAgICBmcmFtZXdvcmsuYXVyZWxpYS5zdGFydCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICBvYXV0aFNlcnZpY2Uuc2V0VG9rZW5PblJlZGlyZWN0KCk7XHJcblxyXG4gICAgICAvLyBBZGQgYXV0aG9yaXplIHN0ZXAgYmVmb3JlIHZpZXctbW9kZWwgYWN0aXZhdGUgcHJlZGVmaW5lZCBwaXBlbGluZSBzdGVwXHJcbiAgICAgIGxldCBhcHBSb3V0ZXIgPSA8QXBwUm91dGVyPmZyYW1ld29yay5jb250YWluZXIuZ2V0KEFwcFJvdXRlcik7XHJcbiAgICAgICg8YW55PmFwcFJvdXRlcikucGlwZWxpbmVQcm92aWRlci5zdGVwcy5zcGxpY2UoMiwgMCwgT0F1dGhBdXRob3JpemVTdGVwKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQge1xyXG4gIE9BdXRoU2VydmljZSxcclxuICBPQXV0aFRva2VuU2VydmljZSxcclxuICBPQXV0aEludGVyY2VwdG9yXHJcbn0iXX0=
