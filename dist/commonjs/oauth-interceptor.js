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
var aurelia_event_aggregator_1 = require("aurelia-event-aggregator");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var oauth_service_1 = require("./oauth-service");
var oauth_token_service_1 = require("./oauth-token-service");
var AUTHORIZATION_HEADER = 'Authorization';
var OAuthInterceptor = (function () {
    function OAuthInterceptor(oauthTokenService, eventAggregator) {
        var _this = this;
        this.oauthTokenService = oauthTokenService;
        this.eventAggregator = eventAggregator;
        this.request = function (config) {
            if (_this.oauthTokenService.getToken() && !_this.oauthTokenService.isTokenValid()) {
                config.tokenExpired = true;
                _this.eventAggregator.publish(oauth_service_1.OAuthService.INVALID_TOKEN_EVENT);
                return Promise.reject(config);
            }
            if (config.headers.add && !config.headers.get(AUTHORIZATION_HEADER)) {
                config.headers.add(AUTHORIZATION_HEADER, _this.oauthTokenService.getAuthorizationHeader());
            }
            if (config.headers.append && !config.headers.get(AUTHORIZATION_HEADER)) {
                config.headers.append(AUTHORIZATION_HEADER, _this.oauthTokenService.getAuthorizationHeader());
            }
            return config;
        };
        this.response = function (response, request) {
            _this.handleRequestError(response, request);
            return response;
        };
        this.responseError = function (response, request) {
            _this.handleRequestError(response, request);
            return Promise.reject(response);
        };
    }
    OAuthInterceptor.prototype.handleRequestError = function (response, requestMessage) {
        if (response && response.statusCode && response.statusCode === 401
            && !response.requestMessage.tokenExpired && !this.oauthTokenService.isTokenValid()) {
            response.tokenExpired = true;
            this.eventAggregator.publish(oauth_service_1.OAuthService.INVALID_TOKEN_EVENT, response);
        }
        if (response && response.status && response.status === 401
            && !requestMessage.tokenExpired && !this.oauthTokenService.isTokenValid()) {
            response.tokenExpired = true;
            this.eventAggregator.publish(oauth_service_1.OAuthService.INVALID_TOKEN_EVENT, response);
        }
    };
    return OAuthInterceptor;
}());
OAuthInterceptor = __decorate([
    aurelia_dependency_injection_1.autoinject(),
    __metadata("design:paramtypes", [oauth_token_service_1.OAuthTokenService,
        aurelia_event_aggregator_1.EventAggregator])
], OAuthInterceptor);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OAuthInterceptor;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9vYXV0aC1pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUVBQTJEO0FBQzNELDZFQUEwRDtBQUUxRCxpREFBK0M7QUFDL0MsNkRBQTBEO0FBRTFELElBQU0sb0JBQW9CLEdBQVcsZUFBZSxDQUFDO0FBR3JELElBQXFCLGdCQUFnQjtJQUNqQywwQkFDWSxpQkFBb0MsRUFDcEMsZUFBZ0M7UUFGNUMsaUJBRWlEO1FBRHJDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBRXJDLFlBQU8sR0FBRyxVQUFDLE1BQVc7WUFDekIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDOUUsTUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7Z0JBQzNCLEtBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLDRCQUFZLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFFL0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEMsQ0FBQztZQUdELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xFLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7WUFDOUYsQ0FBQztZQUdELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7WUFDakcsQ0FBQztZQUVELE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbEIsQ0FBQyxDQUFDO1FBRUssYUFBUSxHQUFHLFVBQUMsUUFBYSxFQUFFLE9BQWE7WUFDM0MsS0FBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3BCLENBQUMsQ0FBQztRQUVLLGtCQUFhLEdBQUcsVUFBQyxRQUFhLEVBQUUsT0FBYTtZQUNoRCxLQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQztJQS9COEMsQ0FBQztJQWlDekMsNkNBQWtCLEdBQTFCLFVBQTJCLFFBQWEsRUFBRSxjQUFvQjtRQUUxRCxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUMsVUFBVSxLQUFLLEdBQUc7ZUFDM0QsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckYsUUFBUSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsNEJBQVksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM3RSxDQUFDO1FBR0QsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHO2VBQ25ELENBQUMsY0FBYyxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUUsUUFBUSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsNEJBQVksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM3RSxDQUFDO0lBQ0wsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0FuREEsQUFtREMsSUFBQTtBQW5Eb0IsZ0JBQWdCO0lBRHBDLHlDQUFVLEVBQUU7cUNBR3NCLHVDQUFpQjtRQUNuQiwwQ0FBZTtHQUgzQixnQkFBZ0IsQ0FtRHBDOztrQkFuRG9CLGdCQUFnQiIsImZpbGUiOiJvYXV0aC1pbnRlcmNlcHRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50QWdncmVnYXRvciB9IGZyb20gJ2F1cmVsaWEtZXZlbnQtYWdncmVnYXRvcic7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tICdhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uJztcclxuXHJcbmltcG9ydCB7IE9BdXRoU2VydmljZSB9IGZyb20gJy4vb2F1dGgtc2VydmljZSc7XHJcbmltcG9ydCB7IE9BdXRoVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC10b2tlbi1zZXJ2aWNlJztcclxuXHJcbmNvbnN0IEFVVEhPUklaQVRJT05fSEVBREVSOiBzdHJpbmcgPSAnQXV0aG9yaXphdGlvbic7XHJcblxyXG5AYXV0b2luamVjdCgpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9BdXRoSW50ZXJjZXB0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBvYXV0aFRva2VuU2VydmljZTogT0F1dGhUb2tlblNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcikgeyB9XHJcblxyXG4gICAgcHVibGljIHJlcXVlc3QgPSAoY29uZmlnOiBhbnkpOiBhbnkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLm9hdXRoVG9rZW5TZXJ2aWNlLmdldFRva2VuKCkgJiYgIXRoaXMub2F1dGhUb2tlblNlcnZpY2UuaXNUb2tlblZhbGlkKCkpIHtcclxuICAgICAgICAgICAgY29uZmlnLnRva2VuRXhwaXJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnB1Ymxpc2goT0F1dGhTZXJ2aWNlLklOVkFMSURfVE9LRU5fRVZFTlQpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTdXBwb3J0IGZvciBodHRwLWNsaWVudFxyXG4gICAgICAgIGlmIChjb25maWcuaGVhZGVycy5hZGQgJiYgIWNvbmZpZy5oZWFkZXJzLmdldChBVVRIT1JJWkFUSU9OX0hFQURFUikpIHtcclxuICAgICAgICAgICAgY29uZmlnLmhlYWRlcnMuYWRkKEFVVEhPUklaQVRJT05fSEVBREVSLCB0aGlzLm9hdXRoVG9rZW5TZXJ2aWNlLmdldEF1dGhvcml6YXRpb25IZWFkZXIoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTdXBwb3J0IGZvciBmZXRjaC1jbGllbnRcclxuICAgICAgICBpZiAoY29uZmlnLmhlYWRlcnMuYXBwZW5kICYmICFjb25maWcuaGVhZGVycy5nZXQoQVVUSE9SSVpBVElPTl9IRUFERVIpKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5oZWFkZXJzLmFwcGVuZChBVVRIT1JJWkFUSU9OX0hFQURFUiwgdGhpcy5vYXV0aFRva2VuU2VydmljZS5nZXRBdXRob3JpemF0aW9uSGVhZGVyKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIHJlc3BvbnNlID0gKHJlc3BvbnNlOiBhbnksIHJlcXVlc3Q/OiBhbnkpOiBhbnkgPT4ge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlUmVxdWVzdEVycm9yKHJlc3BvbnNlLCByZXF1ZXN0KTtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyByZXNwb25zZUVycm9yID0gKHJlc3BvbnNlOiBhbnksIHJlcXVlc3Q/OiBhbnkpOiBhbnkgPT4ge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlUmVxdWVzdEVycm9yKHJlc3BvbnNlLCByZXF1ZXN0KTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVJlcXVlc3RFcnJvcihyZXNwb25zZTogYW55LCByZXF1ZXN0TWVzc2FnZT86IGFueSkge1xyXG4gICAgICAgIC8vIFN1cHBvcnQgZm9yIGh0dHAtY2xpZW50XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnN0YXR1c0NvZGUgJiYgcmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gNDAxXHJcbiAgICAgICAgICAgICYmICFyZXNwb25zZS5yZXF1ZXN0TWVzc2FnZS50b2tlbkV4cGlyZWQgJiYgIXRoaXMub2F1dGhUb2tlblNlcnZpY2UuaXNUb2tlblZhbGlkKCkpIHtcclxuICAgICAgICAgICAgcmVzcG9uc2UudG9rZW5FeHBpcmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucHVibGlzaChPQXV0aFNlcnZpY2UuSU5WQUxJRF9UT0tFTl9FVkVOVCwgcmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU3VwcG9ydCBmb3IgZmV0Y2gtY2xpZW50XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnN0YXR1cyAmJiByZXNwb25zZS5zdGF0dXMgPT09IDQwMVxyXG4gICAgICAgICAgICAmJiAhcmVxdWVzdE1lc3NhZ2UudG9rZW5FeHBpcmVkICYmICF0aGlzLm9hdXRoVG9rZW5TZXJ2aWNlLmlzVG9rZW5WYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLnRva2VuRXhwaXJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnB1Ymxpc2goT0F1dGhTZXJ2aWNlLklOVkFMSURfVE9LRU5fRVZFTlQsIHJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
