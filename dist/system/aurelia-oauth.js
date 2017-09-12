System.register(["aurelia-router", "./oauth-service", "./oauth-token-service", "./oauth-interceptor", "./oauth-authorize-step"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function configure(framework, config) {
        var oauthService = framework.container.get(oauth_service_1.OAuthService);
        var oauthTokenService = framework.container.get(oauth_token_service_1.OAuthTokenService);
        var oauthInterceptor = framework.container.get(oauth_interceptor_1.default);
        config(oauthService, oauthTokenService, function (client) {
            client.configure(function (builder) { return builder.withInterceptor(oauthInterceptor); });
        });
        framework.aurelia.start().then(function () {
            oauthService.setTokenOnRedirect();
            var appRouter = framework.container.get(aurelia_router_1.AppRouter);
            appRouter.pipelineProvider.steps.splice(2, 0, oauth_authorize_step_1.OAuthAuthorizeStep);
        });
    }
    exports_1("configure", configure);
    var aurelia_router_1, oauth_service_1, oauth_token_service_1, oauth_interceptor_1, oauth_authorize_step_1;
    return {
        setters: [
            function (aurelia_router_1_1) {
                aurelia_router_1 = aurelia_router_1_1;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXJlbGlhLW9hdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVFBLG1CQUNFLFNBQWlDLEVBQ2pDLE1BQXlGO1FBRXpGLElBQU0sWUFBWSxHQUFpQixTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw0QkFBWSxDQUFDLENBQUM7UUFDekUsSUFBTSxpQkFBaUIsR0FBc0IsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsdUNBQWlCLENBQUMsQ0FBQztRQUN4RixJQUFNLGdCQUFnQixHQUFxQixTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywyQkFBZ0IsQ0FBQyxDQUFDO1FBRXJGLE1BQU0sQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsVUFBQSxNQUFNO1lBQzVDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLEVBQXpDLENBQXlDLENBQUMsQ0FBQztRQUN6RSxDQUFDLENBQUMsQ0FBQztRQUVILFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQzdCLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBR2xDLElBQUksU0FBUyxHQUFjLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDBCQUFTLENBQUMsQ0FBQztZQUN4RCxTQUFVLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLHlDQUFrQixDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NDQXhCUSw0QkFBWTsyQ0FDWix1Q0FBaUI7MENBQ25CLDJCQUFnQjtRQTRCdEIsQ0FBQyIsImZpbGUiOiJhdXJlbGlhLW9hdXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRnJhbWV3b3JrQ29uZmlndXJhdGlvbiB9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0IHsgQXBwUm91dGVyIH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xyXG5cclxuaW1wb3J0IHsgT0F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC1zZXJ2aWNlJztcclxuaW1wb3J0IHsgT0F1dGhUb2tlblNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXRva2VuLXNlcnZpY2UnO1xyXG5pbXBvcnQgT0F1dGhJbnRlcmNlcHRvciBmcm9tICcuL29hdXRoLWludGVyY2VwdG9yJztcclxuaW1wb3J0IHsgT0F1dGhBdXRob3JpemVTdGVwIH0gZnJvbSAnLi9vYXV0aC1hdXRob3JpemUtc3RlcCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKFxyXG4gIGZyYW1ld29yazogRnJhbWV3b3JrQ29uZmlndXJhdGlvbixcclxuICBjb25maWc6IChvYXV0aFNlcnZpY2UsIG9hdXRoVG9rZW5TZXJ2aWNlLCBjb25maWd1cmVDbGllbnQ6IChjbGllbnQ6IGFueSkgPT4gdm9pZCkgPT4gdm9pZCkge1xyXG5cclxuICBjb25zdCBvYXV0aFNlcnZpY2UgPSA8T0F1dGhTZXJ2aWNlPmZyYW1ld29yay5jb250YWluZXIuZ2V0KE9BdXRoU2VydmljZSk7XHJcbiAgY29uc3Qgb2F1dGhUb2tlblNlcnZpY2UgPSA8T0F1dGhUb2tlblNlcnZpY2U+ZnJhbWV3b3JrLmNvbnRhaW5lci5nZXQoT0F1dGhUb2tlblNlcnZpY2UpO1xyXG4gIGNvbnN0IG9hdXRoSW50ZXJjZXB0b3IgPSA8T0F1dGhJbnRlcmNlcHRvcj5mcmFtZXdvcmsuY29udGFpbmVyLmdldChPQXV0aEludGVyY2VwdG9yKTtcclxuXHJcbiAgY29uZmlnKG9hdXRoU2VydmljZSwgb2F1dGhUb2tlblNlcnZpY2UsIGNsaWVudCA9PiB7XHJcbiAgICBjbGllbnQuY29uZmlndXJlKGJ1aWxkZXIgPT4gYnVpbGRlci53aXRoSW50ZXJjZXB0b3Iob2F1dGhJbnRlcmNlcHRvcikpO1xyXG4gIH0pO1xyXG5cclxuICBmcmFtZXdvcmsuYXVyZWxpYS5zdGFydCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgb2F1dGhTZXJ2aWNlLnNldFRva2VuT25SZWRpcmVjdCgpO1xyXG5cclxuICAgIC8vIEFkZCBhdXRob3JpemUgc3RlcCBiZWZvcmUgdmlldy1tb2RlbCBhY3RpdmF0ZSBwcmVkZWZpbmVkIHBpcGVsaW5lIHN0ZXBcclxuICAgIGxldCBhcHBSb3V0ZXIgPSA8QXBwUm91dGVyPmZyYW1ld29yay5jb250YWluZXIuZ2V0KEFwcFJvdXRlcik7XHJcbiAgICAoPGFueT5hcHBSb3V0ZXIpLnBpcGVsaW5lUHJvdmlkZXIuc3RlcHMuc3BsaWNlKDIsIDAsIE9BdXRoQXV0aG9yaXplU3RlcCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgT0F1dGhTZXJ2aWNlLFxyXG4gIE9BdXRoVG9rZW5TZXJ2aWNlLFxyXG4gIE9BdXRoSW50ZXJjZXB0b3JcclxufSJdfQ==
