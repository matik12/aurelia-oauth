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
            exports_1("default", OAuthInterceptor);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9vYXV0aC1pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQU1NLG9CQUFvQixHQUFXLGVBQWUsQ0FBQztZQUdoQyxnQkFBZ0I7Z0JBQ2pDLDBCQUNZLGlCQUFvQyxFQUNwQyxlQUFnQztvQkFGNUMsaUJBRWlEO29CQURyQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO29CQUNwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7b0JBRXJDLFlBQU8sR0FBRyxVQUFDLE1BQVc7d0JBQ3pCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQzlFLE1BQU0sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDOzRCQUMzQixLQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyw0QkFBWSxDQUFDLG1CQUFtQixDQUFDLENBQUM7NEJBRS9ELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUNsQyxDQUFDO3dCQUdELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2xFLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7d0JBQzlGLENBQUM7d0JBR0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDckUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsS0FBSSxDQUFDLGlCQUFpQixDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQzt3QkFDakcsQ0FBQzt3QkFFRCxNQUFNLENBQUMsTUFBTSxDQUFDO29CQUNsQixDQUFDLENBQUM7b0JBRUssYUFBUSxHQUFHLFVBQUMsUUFBYSxFQUFFLE9BQWE7d0JBQzNDLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBQzNDLE1BQU0sQ0FBQyxRQUFRLENBQUM7b0JBQ3BCLENBQUMsQ0FBQztvQkFFSyxrQkFBYSxHQUFHLFVBQUMsUUFBYSxFQUFFLE9BQWE7d0JBQ2hELEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBQzNDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNwQyxDQUFDLENBQUM7Z0JBL0I4QyxDQUFDO2dCQWlDekMsNkNBQWtCLEdBQTFCLFVBQTJCLFFBQWEsRUFBRSxjQUFvQjtvQkFFMUQsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxHQUFHOzJCQUMzRCxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDckYsUUFBUSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7d0JBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLDRCQUFZLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQzdFLENBQUM7b0JBR0QsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHOzJCQUNuRCxDQUFDLGNBQWMsQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUM1RSxRQUFRLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzt3QkFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsNEJBQVksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDN0UsQ0FBQztnQkFDTCxDQUFDO2dCQUNMLHVCQUFDO1lBQUQsQ0FuREEsQUFtREMsSUFBQTtZQW5Eb0IsZ0JBQWdCO2dCQURwQyx5Q0FBVSxFQUFFO2lEQUdzQix1Q0FBaUI7b0JBQ25CLDBDQUFlO2VBSDNCLGdCQUFnQixDQW1EcEM7aUNBbkRvQixnQkFBZ0I7UUFtRHBDLENBQUMiLCJmaWxlIjoib2F1dGgtaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSAnYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvbic7XHJcblxyXG5pbXBvcnQgeyBPQXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPQXV0aFRva2VuU2VydmljZSB9IGZyb20gJy4vb2F1dGgtdG9rZW4tc2VydmljZSc7XHJcblxyXG5jb25zdCBBVVRIT1JJWkFUSU9OX0hFQURFUjogc3RyaW5nID0gJ0F1dGhvcml6YXRpb24nO1xyXG5cclxuQGF1dG9pbmplY3QoKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPQXV0aEludGVyY2VwdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgb2F1dGhUb2tlblNlcnZpY2U6IE9BdXRoVG9rZW5TZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3IpIHsgfVxyXG5cclxuICAgIHB1YmxpYyByZXF1ZXN0ID0gKGNvbmZpZzogYW55KTogYW55ID0+IHtcclxuICAgICAgICBpZiAodGhpcy5vYXV0aFRva2VuU2VydmljZS5nZXRUb2tlbigpICYmICF0aGlzLm9hdXRoVG9rZW5TZXJ2aWNlLmlzVG9rZW5WYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy50b2tlbkV4cGlyZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5wdWJsaXNoKE9BdXRoU2VydmljZS5JTlZBTElEX1RPS0VOX0VWRU5UKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChjb25maWcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU3VwcG9ydCBmb3IgaHR0cC1jbGllbnRcclxuICAgICAgICBpZiAoY29uZmlnLmhlYWRlcnMuYWRkICYmICFjb25maWcuaGVhZGVycy5nZXQoQVVUSE9SSVpBVElPTl9IRUFERVIpKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5oZWFkZXJzLmFkZChBVVRIT1JJWkFUSU9OX0hFQURFUiwgdGhpcy5vYXV0aFRva2VuU2VydmljZS5nZXRBdXRob3JpemF0aW9uSGVhZGVyKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU3VwcG9ydCBmb3IgZmV0Y2gtY2xpZW50XHJcbiAgICAgICAgaWYgKGNvbmZpZy5oZWFkZXJzLmFwcGVuZCAmJiAhY29uZmlnLmhlYWRlcnMuZ2V0KEFVVEhPUklaQVRJT05fSEVBREVSKSkge1xyXG4gICAgICAgICAgICBjb25maWcuaGVhZGVycy5hcHBlbmQoQVVUSE9SSVpBVElPTl9IRUFERVIsIHRoaXMub2F1dGhUb2tlblNlcnZpY2UuZ2V0QXV0aG9yaXphdGlvbkhlYWRlcigpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyByZXNwb25zZSA9IChyZXNwb25zZTogYW55LCByZXF1ZXN0PzogYW55KTogYW55ID0+IHtcclxuICAgICAgICB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihyZXNwb25zZSwgcmVxdWVzdCk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgcmVzcG9uc2VFcnJvciA9IChyZXNwb25zZTogYW55LCByZXF1ZXN0PzogYW55KTogYW55ID0+IHtcclxuICAgICAgICB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihyZXNwb25zZSwgcmVxdWVzdCk7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlc3BvbnNlKTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVSZXF1ZXN0RXJyb3IocmVzcG9uc2U6IGFueSwgcmVxdWVzdE1lc3NhZ2U/OiBhbnkpIHtcclxuICAgICAgICAvLyBTdXBwb3J0IGZvciBodHRwLWNsaWVudFxyXG4gICAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5zdGF0dXNDb2RlICYmIHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDQwMVxyXG4gICAgICAgICAgICAmJiAhcmVzcG9uc2UucmVxdWVzdE1lc3NhZ2UudG9rZW5FeHBpcmVkICYmICF0aGlzLm9hdXRoVG9rZW5TZXJ2aWNlLmlzVG9rZW5WYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLnRva2VuRXhwaXJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnB1Ymxpc2goT0F1dGhTZXJ2aWNlLklOVkFMSURfVE9LRU5fRVZFTlQsIHJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFN1cHBvcnQgZm9yIGZldGNoLWNsaWVudFxyXG4gICAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5zdGF0dXMgJiYgcmVzcG9uc2Uuc3RhdHVzID09PSA0MDFcclxuICAgICAgICAgICAgJiYgIXJlcXVlc3RNZXNzYWdlLnRva2VuRXhwaXJlZCAmJiAhdGhpcy5vYXV0aFRva2VuU2VydmljZS5pc1Rva2VuVmFsaWQoKSkge1xyXG4gICAgICAgICAgICByZXNwb25zZS50b2tlbkV4cGlyZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5wdWJsaXNoKE9BdXRoU2VydmljZS5JTlZBTElEX1RPS0VOX0VWRU5ULCByZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
