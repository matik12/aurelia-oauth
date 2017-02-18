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
            if (config.url.indexOf(window.location.origin) > -1) {
                return config;
            }
            if (_this.oauthTokenService.getToken() && !_this.oauthTokenService.isTokenValid()) {
                _this.eventAggregator.publish(oauth_service_1.OAuthService.INVALID_TOKEN_EVENT);
                return Promise.reject(config);
            }
            if (!config.headers.get(AUTHORIZATION_HEADER)) {
                config.headers.add(AUTHORIZATION_HEADER, _this.oauthTokenService.getAuthorizationHeader());
            }
            return config;
        };
        this.responseError = function (response) {
            if (response.status === 400 && response.data &&
                (response.data.error === 'invalid_request' || response.data.error === 'invalid_grant')) {
                _this.eventAggregator.publish(oauth_service_1.OAuthService.INVALID_TOKEN_EVENT, response);
            }
            var tokenType = _this.oauthTokenService.getTokenType();
            if (response.status === 401 &&
                (response.data && response.data.error === 'invalid_token') ||
                (response.headers.get('www-authenticate') && response.headers.get('www-authenticate').indexOf(tokenType) === 0)) {
                _this.eventAggregator.publish(oauth_service_1.OAuthService.INVALID_TOKEN_EVENT, response);
            }
            return Promise.reject(response);
        };
    }
    return OAuthInterceptor;
}());
OAuthInterceptor = __decorate([
    aurelia_dependency_injection_1.autoinject(),
    __metadata("design:paramtypes", [oauth_token_service_1.OAuthTokenService,
        aurelia_event_aggregator_1.EventAggregator])
], OAuthInterceptor);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OAuthInterceptor;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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ZTtHQUgzQixnQkFBZ0IsQ0EwQ3BDOztrQkExQ29CLGdCQUFnQiIsImZpbGUiOiJvYXV0aC1pbnRlcmNlcHRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50QWdncmVnYXRvciB9IGZyb20gJ2F1cmVsaWEtZXZlbnQtYWdncmVnYXRvcic7XHJcbmltcG9ydCB7IEh0dHBSZXF1ZXN0TWVzc2FnZSB9IGZyb20gJ2F1cmVsaWEtaHR0cC1jbGllbnQnO1xyXG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSAnYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvbic7XHJcblxyXG5pbXBvcnQgeyBPQXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPQXV0aFRva2VuU2VydmljZSB9IGZyb20gJy4vb2F1dGgtdG9rZW4tc2VydmljZSc7XHJcblxyXG5jb25zdCBBVVRIT1JJWkFUSU9OX0hFQURFUjogc3RyaW5nID0gJ0F1dGhvcml6YXRpb24nO1xyXG5cclxuQGF1dG9pbmplY3QoKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPQXV0aEludGVyY2VwdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgb2F1dGhUb2tlblNlcnZpY2U6IE9BdXRoVG9rZW5TZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3IpIHsgfVxyXG5cclxuICAgIHB1YmxpYyByZXF1ZXN0ID0gKGNvbmZpZzogSHR0cFJlcXVlc3RNZXNzYWdlKTogYW55ID0+IHtcclxuICAgICAgICBpZiAoY29uZmlnLnVybC5pbmRleE9mKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pID4gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9hdXRoVG9rZW5TZXJ2aWNlLmdldFRva2VuKCkgJiYgIXRoaXMub2F1dGhUb2tlblNlcnZpY2UuaXNUb2tlblZhbGlkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucHVibGlzaChPQXV0aFNlcnZpY2UuSU5WQUxJRF9UT0tFTl9FVkVOVCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoY29uZmlnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghY29uZmlnLmhlYWRlcnMuZ2V0KEFVVEhPUklaQVRJT05fSEVBREVSKSkge1xyXG4gICAgICAgICAgICBjb25maWcuaGVhZGVycy5hZGQoQVVUSE9SSVpBVElPTl9IRUFERVIsIHRoaXMub2F1dGhUb2tlblNlcnZpY2UuZ2V0QXV0aG9yaXphdGlvbkhlYWRlcigpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyByZXNwb25zZUVycm9yID0gKHJlc3BvbnNlKTogYW55ID0+IHtcclxuICAgICAgICAvLyBDYXRjaCAnaW52YWxpZF9yZXF1ZXN0JyBhbmQgJ2ludmFsaWRfZ3JhbnQnIGVycm9ycyBhbmQgZW5zdXJlIHRoYXQgdGhlICd0b2tlbicgaXMgcmVtb3ZlZC5cclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDAgJiYgcmVzcG9uc2UuZGF0YSAmJlxyXG4gICAgICAgICAgICAocmVzcG9uc2UuZGF0YS5lcnJvciA9PT0gJ2ludmFsaWRfcmVxdWVzdCcgfHwgcmVzcG9uc2UuZGF0YS5lcnJvciA9PT0gJ2ludmFsaWRfZ3JhbnQnKSkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucHVibGlzaChPQXV0aFNlcnZpY2UuSU5WQUxJRF9UT0tFTl9FVkVOVCwgcmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2F0Y2ggJ2ludmFsaWRfdG9rZW4nIGFuZCAndW5hdXRob3JpemVkJyBlcnJvcnMuXHJcbiAgICAgICAgbGV0IHRva2VuVHlwZSA9IHRoaXMub2F1dGhUb2tlblNlcnZpY2UuZ2V0VG9rZW5UeXBlKCk7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAxICYmXHJcbiAgICAgICAgICAgIChyZXNwb25zZS5kYXRhICYmIHJlc3BvbnNlLmRhdGEuZXJyb3IgPT09ICdpbnZhbGlkX3Rva2VuJykgfHxcclxuICAgICAgICAgICAgKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCd3d3ctYXV0aGVudGljYXRlJykgJiYgcmVzcG9uc2UuaGVhZGVycy5nZXQoJ3d3dy1hdXRoZW50aWNhdGUnKS5pbmRleE9mKHRva2VuVHlwZSkgPT09IDApKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5wdWJsaXNoKE9BdXRoU2VydmljZS5JTlZBTElEX1RPS0VOX0VWRU5ULCByZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xyXG4gICAgfTtcclxufSJdfQ==
