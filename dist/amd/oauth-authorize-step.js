var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-dependency-injection", "./oauth-service"], function (require, exports, aurelia_dependency_injection_1, oauth_service_1) {
    "use strict";
    var OAuthAuthorizeStep = (function () {
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
    exports.OAuthAuthorizeStep = OAuthAuthorizeStep;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9hdXRoLWF1dGhvcml6ZS1zdGVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBTUEsSUFBYSxrQkFBa0I7UUFDN0IsNEJBQW9CLFlBQTBCO1lBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQUksQ0FBQztRQUVuRCxnQ0FBRyxHQUFILFVBQUksY0FBYyxFQUFFLElBQVU7WUFDNUIsSUFBSSxPQUFPLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztZQUVwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEQsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkMsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDO1FBQ0gseUJBQUM7SUFBRCxDQVpBLEFBWUMsSUFBQTtJQVpZLGtCQUFrQjtRQUQ5Qix5Q0FBVSxFQUFFO3lDQUV1Qiw0QkFBWTtPQURuQyxrQkFBa0IsQ0FZOUI7SUFaWSxnREFBa0IiLCJmaWxlIjoib2F1dGgtYXV0aG9yaXplLXN0ZXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0IH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xyXG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSAnYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvbic7XHJcblxyXG5pbXBvcnQgeyBPQXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXNlcnZpY2UnO1xyXG5cclxuQGF1dG9pbmplY3QoKVxyXG5leHBvcnQgY2xhc3MgT0F1dGhBdXRob3JpemVTdGVwIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9hdXRoU2VydmljZTogT0F1dGhTZXJ2aWNlKSB7IH1cclxuXHJcbiAgcnVuKHJvdXRpbmdDb250ZXh0LCBuZXh0OiBOZXh0KSB7XHJcbiAgICBsZXQgdG9TdGF0ZSA9IHJvdXRpbmdDb250ZXh0LmNvbmZpZztcclxuXHJcbiAgICBpZiAodGhpcy5vYXV0aFNlcnZpY2UubG9naW5PblN0YXRlQ2hhbmdlKHRvU3RhdGUpKSB7XHJcbiAgICAgIHJldHVybiBuZXh0LmNvbXBsZXRlKCdSZWRpcmVjdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXh0KCk7XHJcbiAgfVxyXG59Il19
