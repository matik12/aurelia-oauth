System.register(["aurelia-event-aggregator", "aurelia-dependency-injection", "./oauth-service", "./oauth-token-service"], function (exports_1, context_1) {
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
    var aurelia_event_aggregator_1, aurelia_dependency_injection_1, oauth_service_1, oauth_token_service_1, AUTHORIZATION_HEADER, OAuthInterceptor;
    return {
        setters: [
            function (aurelia_event_aggregator_1_1) {
                aurelia_event_aggregator_1 = aurelia_event_aggregator_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (oauth_service_1_1) {
                oauth_service_1 = oauth_service_1_1;
            },
            function (oauth_token_service_1_1) {
                oauth_token_service_1 = oauth_token_service_1_1;
            }
        ],
        execute: function () {
            AUTHORIZATION_HEADER = 'Authorization';
            OAuthInterceptor = (function () {
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
            exports_1("default", OAuthInterceptor);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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cEM7aUNBMUNvQixnQkFBZ0I7UUEwQ3BDLENBQUMiLCJmaWxlIjoib2F1dGgtaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBIdHRwUmVxdWVzdE1lc3NhZ2UgfSBmcm9tICdhdXJlbGlhLWh0dHAtY2xpZW50JztcclxuaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gJ2F1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb24nO1xyXG5cclxuaW1wb3J0IHsgT0F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC1zZXJ2aWNlJztcclxuaW1wb3J0IHsgT0F1dGhUb2tlblNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXRva2VuLXNlcnZpY2UnO1xyXG5cclxuY29uc3QgQVVUSE9SSVpBVElPTl9IRUFERVI6IHN0cmluZyA9ICdBdXRob3JpemF0aW9uJztcclxuXHJcbkBhdXRvaW5qZWN0KClcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT0F1dGhJbnRlcmNlcHRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIG9hdXRoVG9rZW5TZXJ2aWNlOiBPQXV0aFRva2VuU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgcmVxdWVzdCA9IChjb25maWc6IEh0dHBSZXF1ZXN0TWVzc2FnZSk6IGFueSA9PiB7XHJcbiAgICAgICAgaWYgKGNvbmZpZy51cmwuaW5kZXhPZih3aW5kb3cubG9jYXRpb24ub3JpZ2luKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5vYXV0aFRva2VuU2VydmljZS5nZXRUb2tlbigpICYmICF0aGlzLm9hdXRoVG9rZW5TZXJ2aWNlLmlzVG9rZW5WYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnB1Ymxpc2goT0F1dGhTZXJ2aWNlLklOVkFMSURfVE9LRU5fRVZFTlQpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWNvbmZpZy5oZWFkZXJzLmdldChBVVRIT1JJWkFUSU9OX0hFQURFUikpIHtcclxuICAgICAgICAgICAgY29uZmlnLmhlYWRlcnMuYWRkKEFVVEhPUklaQVRJT05fSEVBREVSLCB0aGlzLm9hdXRoVG9rZW5TZXJ2aWNlLmdldEF1dGhvcml6YXRpb25IZWFkZXIoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgcmVzcG9uc2VFcnJvciA9IChyZXNwb25zZSk6IGFueSA9PiB7XHJcbiAgICAgICAgLy8gQ2F0Y2ggJ2ludmFsaWRfcmVxdWVzdCcgYW5kICdpbnZhbGlkX2dyYW50JyBlcnJvcnMgYW5kIGVuc3VyZSB0aGF0IHRoZSAndG9rZW4nIGlzIHJlbW92ZWQuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAwICYmIHJlc3BvbnNlLmRhdGEgJiZcclxuICAgICAgICAgICAgKHJlc3BvbnNlLmRhdGEuZXJyb3IgPT09ICdpbnZhbGlkX3JlcXVlc3QnIHx8IHJlc3BvbnNlLmRhdGEuZXJyb3IgPT09ICdpbnZhbGlkX2dyYW50JykpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnB1Ymxpc2goT0F1dGhTZXJ2aWNlLklOVkFMSURfVE9LRU5fRVZFTlQsIHJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENhdGNoICdpbnZhbGlkX3Rva2VuJyBhbmQgJ3VuYXV0aG9yaXplZCcgZXJyb3JzLlxyXG4gICAgICAgIGxldCB0b2tlblR5cGUgPSB0aGlzLm9hdXRoVG9rZW5TZXJ2aWNlLmdldFRva2VuVHlwZSgpO1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMSAmJlxyXG4gICAgICAgICAgICAocmVzcG9uc2UuZGF0YSAmJiByZXNwb25zZS5kYXRhLmVycm9yID09PSAnaW52YWxpZF90b2tlbicpIHx8XHJcbiAgICAgICAgICAgIChyZXNwb25zZS5oZWFkZXJzLmdldCgnd3d3LWF1dGhlbnRpY2F0ZScpICYmIHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCd3d3ctYXV0aGVudGljYXRlJykuaW5kZXhPZih0b2tlblR5cGUpID09PSAwKSkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucHVibGlzaChPQXV0aFNlcnZpY2UuSU5WQUxJRF9UT0tFTl9FVkVOVCwgcmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcclxuICAgIH07XHJcbn0iXX0=
