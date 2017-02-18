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
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var oauth_service_1 = require("./oauth-service");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9vYXV0aC1hdXRob3JpemUtc3RlcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsNkVBQTBEO0FBRTFELGlEQUErQztBQUcvQyxJQUFhLGtCQUFrQjtJQUM3Qiw0QkFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFBSSxDQUFDO0lBRW5ELGdDQUFHLEdBQUgsVUFBSSxjQUFjLEVBQUUsSUFBVTtRQUM1QixJQUFJLE9BQU8sR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDO1FBRXBDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FaQSxBQVlDLElBQUE7QUFaWSxrQkFBa0I7SUFEOUIseUNBQVUsRUFBRTtxQ0FFdUIsNEJBQVk7R0FEbkMsa0JBQWtCLENBWTlCO0FBWlksZ0RBQWtCIiwiZmlsZSI6Im9hdXRoLWF1dGhvcml6ZS1zdGVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dCB9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcclxuaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gJ2F1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb24nO1xyXG5cclxuaW1wb3J0IHsgT0F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC1zZXJ2aWNlJztcclxuXHJcbkBhdXRvaW5qZWN0KClcclxuZXhwb3J0IGNsYXNzIE9BdXRoQXV0aG9yaXplU3RlcCB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvYXV0aFNlcnZpY2U6IE9BdXRoU2VydmljZSkgeyB9XHJcblxyXG4gIHJ1bihyb3V0aW5nQ29udGV4dCwgbmV4dDogTmV4dCkge1xyXG4gICAgbGV0IHRvU3RhdGUgPSByb3V0aW5nQ29udGV4dC5jb25maWc7XHJcblxyXG4gICAgaWYgKHRoaXMub2F1dGhTZXJ2aWNlLmxvZ2luT25TdGF0ZUNoYW5nZSh0b1N0YXRlKSkge1xyXG4gICAgICByZXR1cm4gbmV4dC5jb21wbGV0ZSgnUmVkaXJlY3QnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV4dCgpO1xyXG4gIH1cclxufSJdfQ==
