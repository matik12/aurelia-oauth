System.register(["aurelia-dependency-injection", "./oauth-service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_dependency_injection_1, oauth_service_1, OAuthAuthorizeStep;
    return {
        setters: [
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (oauth_service_1_1) {
                oauth_service_1 = oauth_service_1_1;
            }
        ],
        execute: function () {
            OAuthAuthorizeStep = (function () {
                function OAuthAuthorizeStep(oauthService) {
                    this.oauthService = oauthService;
                }
                OAuthAuthorizeStep.prototype.run = function (routingContext, next) {
                    var toState = routingContext.config;
                    if (this.oauthService.loginOnStateChange(toState)) {
                        return next.complete('Redirect');
                    }
                    return next();
                };
                return OAuthAuthorizeStep;
            }());
            OAuthAuthorizeStep = __decorate([
                aurelia_dependency_injection_1.autoinject(),
                __metadata("design:paramtypes", [oauth_service_1.OAuthService])
            ], OAuthAuthorizeStep);
            exports_1("OAuthAuthorizeStep", OAuthAuthorizeStep);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9vYXV0aC1hdXRob3JpemUtc3RlcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQU1hLGtCQUFrQjtnQkFDN0IsNEJBQW9CLFlBQTBCO29CQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztnQkFBSSxDQUFDO2dCQUVuRCxnQ0FBRyxHQUFILFVBQUksY0FBYyxFQUFFLElBQVU7b0JBQzVCLElBQUksT0FBTyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUM7b0JBRXBDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNsRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDbkMsQ0FBQztvQkFFRCxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQ0gseUJBQUM7WUFBRCxDQVpBLEFBWUMsSUFBQTtZQVpZLGtCQUFrQjtnQkFEOUIseUNBQVUsRUFBRTtpREFFdUIsNEJBQVk7ZUFEbkMsa0JBQWtCLENBWTlCOztRQUFBLENBQUMiLCJmaWxlIjoib2F1dGgtYXV0aG9yaXplLXN0ZXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0IH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xyXG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSAnYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvbic7XHJcblxyXG5pbXBvcnQgeyBPQXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXNlcnZpY2UnO1xyXG5cclxuQGF1dG9pbmplY3QoKVxyXG5leHBvcnQgY2xhc3MgT0F1dGhBdXRob3JpemVTdGVwIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9hdXRoU2VydmljZTogT0F1dGhTZXJ2aWNlKSB7IH1cclxuXHJcbiAgcnVuKHJvdXRpbmdDb250ZXh0LCBuZXh0OiBOZXh0KSB7XHJcbiAgICBsZXQgdG9TdGF0ZSA9IHJvdXRpbmdDb250ZXh0LmNvbmZpZztcclxuXHJcbiAgICBpZiAodGhpcy5vYXV0aFNlcnZpY2UubG9naW5PblN0YXRlQ2hhbmdlKHRvU3RhdGUpKSB7XHJcbiAgICAgIHJldHVybiBuZXh0LmNvbXBsZXRlKCdSZWRpcmVjdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXh0KCk7XHJcbiAgfVxyXG59Il19
