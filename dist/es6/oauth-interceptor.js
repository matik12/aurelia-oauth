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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9vYXV0aC1pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQU9NLG9CQUFvQixHQUFXLGVBQWUsQ0FBQztZQUdoQyxnQkFBZ0I7Z0JBQ2pDLDBCQUNZLGlCQUFvQyxFQUNwQyxlQUFnQztvQkFGNUMsaUJBRWlEO29CQURyQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO29CQUNwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7b0JBRXJDLFlBQU8sR0FBRyxVQUFDLE1BQTBCO3dCQUN4QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDbEQsTUFBTSxDQUFDLE1BQU0sQ0FBQzt3QkFDbEIsQ0FBQzt3QkFFRCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUM5RSxLQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyw0QkFBWSxDQUFDLG1CQUFtQixDQUFDLENBQUM7NEJBRS9ELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUNsQyxDQUFDO3dCQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzVDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7d0JBQzlGLENBQUM7d0JBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQztvQkFDbEIsQ0FBQyxDQUFDO29CQUVLLGtCQUFhLEdBQUcsVUFBQyxRQUFRO3dCQUU1QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSTs0QkFDeEMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxpQkFBaUIsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBRXpGLEtBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLDRCQUFZLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUM7d0JBQzdFLENBQUM7d0JBR0QsSUFBSSxTQUFTLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO3dCQUN0RCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUc7NEJBQ3ZCLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxlQUFlLENBQUM7NEJBQzFELENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBRWxILEtBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLDRCQUFZLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUM7d0JBQzdFLENBQUM7d0JBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3BDLENBQUMsQ0FBQztnQkF0QzhDLENBQUM7Z0JBdUNyRCx1QkFBQztZQUFELENBMUNBLEFBMENDLElBQUE7WUExQ29CLGdCQUFnQjtnQkFEcEMseUNBQVUsRUFBRTtpREFHc0IsdUNBQWlCO29CQUNuQiwwQ0FBZTtlQUgzQixnQkFBZ0IsQ0EwQ3BDO2lDQTFDb0IsZ0JBQWdCO1FBMENwQyxDQUFDIiwiZmlsZSI6Im9hdXRoLWludGVyY2VwdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yJztcclxuaW1wb3J0IHsgSHR0cFJlcXVlc3RNZXNzYWdlIH0gZnJvbSAnYXVyZWxpYS1odHRwLWNsaWVudCc7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tICdhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uJztcclxuXHJcbmltcG9ydCB7IE9BdXRoU2VydmljZSB9IGZyb20gJy4vb2F1dGgtc2VydmljZSc7XHJcbmltcG9ydCB7IE9BdXRoVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC10b2tlbi1zZXJ2aWNlJztcclxuXHJcbmNvbnN0IEFVVEhPUklaQVRJT05fSEVBREVSOiBzdHJpbmcgPSAnQXV0aG9yaXphdGlvbic7XHJcblxyXG5AYXV0b2luamVjdCgpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9BdXRoSW50ZXJjZXB0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBvYXV0aFRva2VuU2VydmljZTogT0F1dGhUb2tlblNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcikgeyB9XHJcblxyXG4gICAgcHVibGljIHJlcXVlc3QgPSAoY29uZmlnOiBIdHRwUmVxdWVzdE1lc3NhZ2UpOiBhbnkgPT4ge1xyXG4gICAgICAgIGlmIChjb25maWcudXJsLmluZGV4T2Yod2luZG93LmxvY2F0aW9uLm9yaWdpbikgPiAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMub2F1dGhUb2tlblNlcnZpY2UuZ2V0VG9rZW4oKSAmJiAhdGhpcy5vYXV0aFRva2VuU2VydmljZS5pc1Rva2VuVmFsaWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5wdWJsaXNoKE9BdXRoU2VydmljZS5JTlZBTElEX1RPS0VOX0VWRU5UKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChjb25maWcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFjb25maWcuaGVhZGVycy5nZXQoQVVUSE9SSVpBVElPTl9IRUFERVIpKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5oZWFkZXJzLmFkZChBVVRIT1JJWkFUSU9OX0hFQURFUiwgdGhpcy5vYXV0aFRva2VuU2VydmljZS5nZXRBdXRob3JpemF0aW9uSGVhZGVyKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIHJlc3BvbnNlRXJyb3IgPSAocmVzcG9uc2UpOiBhbnkgPT4ge1xyXG4gICAgICAgIC8vIENhdGNoICdpbnZhbGlkX3JlcXVlc3QnIGFuZCAnaW52YWxpZF9ncmFudCcgZXJyb3JzIGFuZCBlbnN1cmUgdGhhdCB0aGUgJ3Rva2VuJyBpcyByZW1vdmVkLlxyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMCAmJiByZXNwb25zZS5kYXRhICYmXHJcbiAgICAgICAgICAgIChyZXNwb25zZS5kYXRhLmVycm9yID09PSAnaW52YWxpZF9yZXF1ZXN0JyB8fCByZXNwb25zZS5kYXRhLmVycm9yID09PSAnaW52YWxpZF9ncmFudCcpKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmV2ZW50QWdncmVnYXRvci5wdWJsaXNoKE9BdXRoU2VydmljZS5JTlZBTElEX1RPS0VOX0VWRU5ULCByZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDYXRjaCAnaW52YWxpZF90b2tlbicgYW5kICd1bmF1dGhvcml6ZWQnIGVycm9ycy5cclxuICAgICAgICBsZXQgdG9rZW5UeXBlID0gdGhpcy5vYXV0aFRva2VuU2VydmljZS5nZXRUb2tlblR5cGUoKTtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDEgJiZcclxuICAgICAgICAgICAgKHJlc3BvbnNlLmRhdGEgJiYgcmVzcG9uc2UuZGF0YS5lcnJvciA9PT0gJ2ludmFsaWRfdG9rZW4nKSB8fFxyXG4gICAgICAgICAgICAocmVzcG9uc2UuaGVhZGVycy5nZXQoJ3d3dy1hdXRoZW50aWNhdGUnKSAmJiByZXNwb25zZS5oZWFkZXJzLmdldCgnd3d3LWF1dGhlbnRpY2F0ZScpLmluZGV4T2YodG9rZW5UeXBlKSA9PT0gMCkpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnB1Ymxpc2goT0F1dGhTZXJ2aWNlLklOVkFMSURfVE9LRU5fRVZFTlQsIHJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZXNwb25zZSk7XHJcbiAgICB9O1xyXG59Il19
