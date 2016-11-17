var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-dependency-injection', './oauth-service'], function (require, exports, aurelia_dependency_injection_1, oauth_service_1) {
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
        OAuthAuthorizeStep = __decorate([
            aurelia_dependency_injection_1.autoinject(), 
            __metadata('design:paramtypes', [oauth_service_1.OAuthService])
        ], OAuthAuthorizeStep);
        return OAuthAuthorizeStep;
    }());
    exports.OAuthAuthorizeStep = OAuthAuthorizeStep;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9hdXRoLWF1dGhvcml6ZS1zdGVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBTUE7UUFDRSw0QkFBb0IsWUFBMEI7WUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBSSxDQUFDO1FBRW5ELGdDQUFHLEdBQUgsVUFBSSxjQUFjLEVBQUUsSUFBVTtZQUM1QixJQUFJLE9BQU8sR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDO1lBRXBDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuQyxDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLENBQUM7UUFaSDtZQUFDLHlDQUFVLEVBQUU7OzhCQUFBO1FBYWIseUJBQUM7SUFBRCxDQVpBLEFBWUMsSUFBQTtJQVpZLDBCQUFrQixxQkFZOUIsQ0FBQSIsImZpbGUiOiJvYXV0aC1hdXRob3JpemUtc3RlcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlZGlyZWN0LCBOZXh0IH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xyXG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSAnYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvbic7XHJcblxyXG5pbXBvcnQgeyBPQXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXNlcnZpY2UnO1xyXG5cclxuQGF1dG9pbmplY3QoKVxyXG5leHBvcnQgY2xhc3MgT0F1dGhBdXRob3JpemVTdGVwIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9hdXRoU2VydmljZTogT0F1dGhTZXJ2aWNlKSB7IH1cclxuXHJcbiAgcnVuKHJvdXRpbmdDb250ZXh0LCBuZXh0OiBOZXh0KSB7XHJcbiAgICBsZXQgdG9TdGF0ZSA9IHJvdXRpbmdDb250ZXh0LmNvbmZpZzsgICAgXHJcbiAgICBcclxuICAgIGlmICh0aGlzLm9hdXRoU2VydmljZS5sb2dpbk9uU3RhdGVDaGFuZ2UodG9TdGF0ZSkpIHtcclxuICAgICAgcmV0dXJuIG5leHQuY29tcGxldGUoJ1JlZGlyZWN0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5leHQoKTtcclxuICB9ICBcclxufSJdfQ==
