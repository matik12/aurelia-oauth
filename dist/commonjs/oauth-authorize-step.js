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
var aurelia_dependency_injection_1 = require('aurelia-dependency-injection');
var oauth_service_1 = require('./oauth-service');
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9hdXRoLWF1dGhvcml6ZS1zdGVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSw2Q0FBMkIsOEJBQThCLENBQUMsQ0FBQTtBQUUxRCw4QkFBNkIsaUJBQWlCLENBQUMsQ0FBQTtBQUcvQztJQUNFLDRCQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUFJLENBQUM7SUFFbkQsZ0NBQUcsR0FBSCxVQUFJLGNBQWMsRUFBRSxJQUFVO1FBQzVCLElBQUksT0FBTyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUM7UUFFcEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBWkg7UUFBQyx5Q0FBVSxFQUFFOzswQkFBQTtJQWFiLHlCQUFDO0FBQUQsQ0FaQSxBQVlDLElBQUE7QUFaWSwwQkFBa0IscUJBWTlCLENBQUEiLCJmaWxlIjoib2F1dGgtYXV0aG9yaXplLXN0ZXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWRpcmVjdCwgTmV4dCB9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcclxuaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gJ2F1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb24nO1xyXG5cclxuaW1wb3J0IHsgT0F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC1zZXJ2aWNlJztcclxuXHJcbkBhdXRvaW5qZWN0KClcclxuZXhwb3J0IGNsYXNzIE9BdXRoQXV0aG9yaXplU3RlcCB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvYXV0aFNlcnZpY2U6IE9BdXRoU2VydmljZSkgeyB9XHJcblxyXG4gIHJ1bihyb3V0aW5nQ29udGV4dCwgbmV4dDogTmV4dCkge1xyXG4gICAgbGV0IHRvU3RhdGUgPSByb3V0aW5nQ29udGV4dC5jb25maWc7ICAgIFxyXG4gICAgXHJcbiAgICBpZiAodGhpcy5vYXV0aFNlcnZpY2UubG9naW5PblN0YXRlQ2hhbmdlKHRvU3RhdGUpKSB7XHJcbiAgICAgIHJldHVybiBuZXh0LmNvbXBsZXRlKCdSZWRpcmVjdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXh0KCk7XHJcbiAgfSAgXHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
