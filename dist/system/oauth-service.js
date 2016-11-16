System.register(['aurelia-event-aggregator', 'aurelia-dependency-injection', './oauth-token-service', './url-hash-service', './local-storage-service', './oauth-polyfills'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var aurelia_event_aggregator_1, aurelia_dependency_injection_1, oauth_token_service_1, url_hash_service_1, local_storage_service_1, oauth_polyfills_1;
    var OAUTH_STARTPAGE_STORAGE_KEY, OAuthService;
    return {
        setters:[
            function (aurelia_event_aggregator_1_1) {
                aurelia_event_aggregator_1 = aurelia_event_aggregator_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (oauth_token_service_1_1) {
                oauth_token_service_1 = oauth_token_service_1_1;
            },
            function (url_hash_service_1_1) {
                url_hash_service_1 = url_hash_service_1_1;
            },
            function (local_storage_service_1_1) {
                local_storage_service_1 = local_storage_service_1_1;
            },
            function (oauth_polyfills_1_1) {
                oauth_polyfills_1 = oauth_polyfills_1_1;
            }],
        execute: function() {
            OAUTH_STARTPAGE_STORAGE_KEY = 'oauth.startPage';
            OAuthService = (function () {
                function OAuthService(oAuthTokenService, urlHashService, localStorageService, eventAggregator) {
                    var _this = this;
                    this.oAuthTokenService = oAuthTokenService;
                    this.urlHashService = urlHashService;
                    this.localStorageService = localStorageService;
                    this.eventAggregator = eventAggregator;
                    this.configure = function (config) {
                        if (_this.config) {
                            throw new Error('OAuthProvider already configured.');
                        }
                        if (config.loginUrl.substr(-1) === '/') {
                            config.loginUrl = config.loginUrl.slice(0, -1);
                        }
                        if (config.logoutUrl.substr(-1) === '/') {
                            config.logoutUrl = config.logoutUrl.slice(0, -1);
                        }
                        _this.config = oauth_polyfills_1.objectAssign(_this.defaults, config);
                        var existingHash = window.location.hash;
                        var pathDefault = window.location.href;
                        if (existingHash) {
                            pathDefault = pathDefault.replace(existingHash, '');
                        }
                        if (pathDefault.substr(-1) === '#') {
                            pathDefault = pathDefault.slice(0, -1);
                        }
                        _this.config.redirectUri = config.redirectUri || pathDefault;
                        return config;
                    };
                    this.isAuthenticated = function () {
                        return _this.oAuthTokenService.getToken();
                    };
                    this.login = function () {
                        var redirectUrl = (_this.config.loginUrl + "?") +
                            ("response_type=" + _this.oAuthTokenService.config.name + "&") +
                            ("client_id=" + encodeURIComponent(_this.config.clientId) + "&") +
                            ("redirect_uri=" + encodeURIComponent(_this.config.redirectUri) + "&") +
                            ("nonce=" + encodeURIComponent(_this.getSimpleNonceValue()));
                        if (_this.config.scope) {
                            redirectUrl += "&scope=" + encodeURIComponent(_this.config.scope);
                        }
                        if (_this.config.state) {
                            redirectUrl += "&state=" + encodeURIComponent(_this.config.state);
                        }
                        window.location.href = redirectUrl;
                    };
                    this.logout = function () {
                        var redirectUrl = (_this.config.logoutUrl + "?") +
                            (_this.config.logoutRedirectParameterName + "=" + encodeURIComponent(_this.config.redirectUri));
                        window.location.href = redirectUrl;
                        _this.oAuthTokenService.removeToken();
                    };
                    this.loginOnStateChange = function (toState) {
                        if (toState && _this.isLoginRequired(toState) && !_this.isAuthenticated() && !_this.getTokenDataFromUrl()) {
                            if (_this.localStorageService.isStorageSupported()) {
                                var url = window.location.href;
                                if (!window.location.hash) {
                                    url = _this.getBaseRouteUrl();
                                }
                                _this.localStorageService.set(OAUTH_STARTPAGE_STORAGE_KEY, url);
                            }
                            _this.login();
                            return true;
                        }
                        return false;
                    };
                    this.setTokenOnRedirect = function () {
                        var tokenData = _this.getTokenDataFromUrl();
                        if (!_this.isAuthenticated() && tokenData) {
                            _this.oAuthTokenService.setToken(tokenData);
                            if (_this.localStorageService.isStorageSupported() && _this.localStorageService.get(OAUTH_STARTPAGE_STORAGE_KEY)) {
                                var startPage = _this.localStorageService.get(OAUTH_STARTPAGE_STORAGE_KEY);
                                _this.localStorageService.remove(OAUTH_STARTPAGE_STORAGE_KEY);
                                window.location.href = startPage;
                            }
                            else {
                                window.location.href = _this.getBaseRouteUrl();
                            }
                            _this.eventAggregator.publish(OAuthService.LOGIN_SUCCESS_EVENT, tokenData);
                        }
                    };
                    this.isLoginRequired = function (state) {
                        var routeHasConfig = state.settings && state.settings.requireLogin !== undefined;
                        var routeRequiresLogin = routeHasConfig && state.settings.requireLogin ? true : false;
                        return routeHasConfig ? routeRequiresLogin : _this.config.alwaysRequireLogin;
                    };
                    this.getTokenDataFromUrl = function () {
                        var hashData = _this.urlHashService.getHashData();
                        var tokenData = _this.oAuthTokenService.createToken(hashData);
                        return tokenData;
                    };
                    this.getBaseRouteUrl = function () {
                        return window.location.origin + '/#/';
                    };
                    this.getSimpleNonceValue = function () {
                        return ((Date.now() + Math.random()) * Math.random()).toString().replace('.', '');
                    };
                    this.defaults = {
                        loginUrl: null,
                        logoutUrl: null,
                        clientId: null,
                        logoutRedirectParameterName: 'post_logout_redirect_uri',
                        scope: null,
                        state: null,
                        alwaysRequireLogin: false
                    };
                }
                Object.defineProperty(OAuthService, "LOGIN_SUCCESS_EVENT", {
                    get: function () { return 'oauth:loginSuccess'; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OAuthService, "INVALID_TOKEN_EVENT", {
                    get: function () { return 'oauth:invalidToken'; },
                    enumerable: true,
                    configurable: true
                });
                OAuthService = __decorate([
                    aurelia_dependency_injection_1.autoinject(), 
                    __metadata('design:paramtypes', [oauth_token_service_1.OAuthTokenService, url_hash_service_1.default, local_storage_service_1.default, aurelia_event_aggregator_1.EventAggregator])
                ], OAuthService);
                return OAuthService;
            }());
            exports_1("OAuthService", OAuthService);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFJLENBQUMsUUFBUSxHQUFHO3dCQUNaLFFBQVEsRUFBRSxJQUFJO3dCQUNkLFNBQVMsRUFBRSxJQUFJO3dCQUNmLFFBQVEsRUFBRSxJQUFJO3dCQUNkLDJCQUEyQixFQUFFLDBCQUEwQjt3QkFDdkQsS0FBSyxFQUFFLElBQUk7d0JBQ1gsS0FBSyxFQUFFLElBQUk7d0JBQ1gsa0JBQWtCLEVBQUUsS0FBSztxQkFDNUIsQ0FBQztnQkFDTixDQUFDO2dCQWxCRCxzQkFBa0IsbUNBQW1CO3lCQUFyQyxjQUFrRCxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBQ2hGLHNCQUFrQixtQ0FBbUI7eUJBQXJDLGNBQWtELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFQcEY7b0JBQUMseUNBQVUsRUFBRTs7Z0NBQUE7Z0JBeUpiLG1CQUFDO1lBQUQsQ0F4SkEsQUF3SkMsSUFBQTtZQXhKRCx1Q0F3SkMsQ0FBQSIsImZpbGUiOiJvYXV0aC1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yJztcclxuaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gJ2F1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb24nO1xyXG5cclxuaW1wb3J0IHsgT0F1dGhUb2tlblNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXRva2VuLXNlcnZpY2UnO1xyXG5pbXBvcnQgVXJsSGFzaFNlcnZpY2UgZnJvbSAnLi91cmwtaGFzaC1zZXJ2aWNlJztcclxuaW1wb3J0IExvY2FsU3RvcmFnZVNlcnZpY2UgZnJvbSAnLi9sb2NhbC1zdG9yYWdlLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBvYmplY3RBc3NpZ24gfSBmcm9tICcuL29hdXRoLXBvbHlmaWxscyc7XHJcblxyXG5jb25zdCBPQVVUSF9TVEFSVFBBR0VfU1RPUkFHRV9LRVk6IHN0cmluZyA9ICdvYXV0aC5zdGFydFBhZ2UnO1xyXG5cclxuQGF1dG9pbmplY3QoKVxyXG5leHBvcnQgY2xhc3MgT0F1dGhTZXJ2aWNlIGltcGxlbWVudHMgSU9BdXRoU2VydmljZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBkZWZhdWx0czogSU9BdXRoQ29uZmlnO1xyXG4gICAgcHVibGljIGNvbmZpZzogSU9BdXRoQ29uZmlnO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IExPR0lOX1NVQ0NFU1NfRVZFTlQoKTogc3RyaW5nIHsgcmV0dXJuICdvYXV0aDpsb2dpblN1Y2Nlc3MnOyB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJTlZBTElEX1RPS0VOX0VWRU5UKCk6IHN0cmluZyB7IHJldHVybiAnb2F1dGg6aW52YWxpZFRva2VuJzsgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgb0F1dGhUb2tlblNlcnZpY2U6IE9BdXRoVG9rZW5TZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgdXJsSGFzaFNlcnZpY2U6IFVybEhhc2hTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgbG9jYWxTdG9yYWdlU2VydmljZTogTG9jYWxTdG9yYWdlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yKSB7XHJcbiAgICBcclxuICAgICAgICB0aGlzLmRlZmF1bHRzID0ge1xyXG4gICAgICAgICAgICBsb2dpblVybDogbnVsbCxcclxuICAgICAgICAgICAgbG9nb3V0VXJsOiBudWxsLFxyXG4gICAgICAgICAgICBjbGllbnRJZDogbnVsbCxcclxuICAgICAgICAgICAgbG9nb3V0UmVkaXJlY3RQYXJhbWV0ZXJOYW1lOiAncG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpJyxcclxuICAgICAgICAgICAgc2NvcGU6IG51bGwsXHJcbiAgICAgICAgICAgIHN0YXRlOiBudWxsLFxyXG4gICAgICAgICAgICBhbHdheXNSZXF1aXJlTG9naW46IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29uZmlndXJlID0gKGNvbmZpZzogSU9BdXRoQ29uZmlnKTogSU9BdXRoQ29uZmlnID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPQXV0aFByb3ZpZGVyIGFscmVhZHkgY29uZmlndXJlZC4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSB0cmFpbGluZyBzbGFzaCBmcm9tIHVybHMuXHJcbiAgICAgICAgaWYgKGNvbmZpZy5sb2dpblVybC5zdWJzdHIoLTEpID09PSAnLycpIHtcclxuICAgICAgICAgICAgY29uZmlnLmxvZ2luVXJsID0gY29uZmlnLmxvZ2luVXJsLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjb25maWcubG9nb3V0VXJsLnN1YnN0cigtMSkgPT09ICcvJykge1xyXG4gICAgICAgICAgICBjb25maWcubG9nb3V0VXJsID0gY29uZmlnLmxvZ291dFVybC5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBFeHRlbmQgZGVmYXVsdCBjb25maWd1cmF0aW9uLlxyXG4gICAgICAgIHRoaXMuY29uZmlnID0gb2JqZWN0QXNzaWduKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XHJcblxyXG4gICAgICAgIC8vIFJlZGlyZWN0IGlzIHNldCB0byBjdXJyZW50IGxvY2F0aW9uIGJ5IGRlZmF1bHRcclxuICAgICAgICB2YXIgZXhpc3RpbmdIYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XHJcbiAgICAgICAgdmFyIHBhdGhEZWZhdWx0ID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBub3QgbmVlZGVkIHBhcnRzIGZyb20gdXJscy5cclxuICAgICAgICBpZiAoZXhpc3RpbmdIYXNoKSB7XHJcbiAgICAgICAgICAgIHBhdGhEZWZhdWx0ID0gcGF0aERlZmF1bHQucmVwbGFjZShleGlzdGluZ0hhc2gsICcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYXRoRGVmYXVsdC5zdWJzdHIoLTEpID09PSAnIycpIHtcclxuICAgICAgICAgICAgcGF0aERlZmF1bHQgPSBwYXRoRGVmYXVsdC5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZy5yZWRpcmVjdFVyaSA9IGNvbmZpZy5yZWRpcmVjdFVyaSB8fCBwYXRoRGVmYXVsdDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGlzQXV0aGVudGljYXRlZCA9ICgpOiBib29sZWFuID0+IHtcclxuICAgICAgICByZXR1cm4gPGFueT50aGlzLm9BdXRoVG9rZW5TZXJ2aWNlLmdldFRva2VuKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBsb2dpbiA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICB2YXIgcmVkaXJlY3RVcmwgPSBgJHt0aGlzLmNvbmZpZy5sb2dpblVybH0/YCArXHJcbiAgICAgICAgICAgIGByZXNwb25zZV90eXBlPSR7dGhpcy5vQXV0aFRva2VuU2VydmljZS5jb25maWcubmFtZX0mYCArXHJcbiAgICAgICAgICAgIGBjbGllbnRfaWQ9JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb25maWcuY2xpZW50SWQpfSZgICtcclxuICAgICAgICAgICAgYHJlZGlyZWN0X3VyaT0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbmZpZy5yZWRpcmVjdFVyaSl9JmAgK1xyXG4gICAgICAgICAgICBgbm9uY2U9JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5nZXRTaW1wbGVOb25jZVZhbHVlKCkpfWA7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5zY29wZSkge1xyXG4gICAgICAgICAgICByZWRpcmVjdFVybCArPSBgJnNjb3BlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY29uZmlnLnNjb3BlKX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuc3RhdGUpIHtcclxuICAgICAgICAgICAgcmVkaXJlY3RVcmwgKz0gYCZzdGF0ZT0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbmZpZy5zdGF0ZSl9YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZWRpcmVjdFVybDtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGxvZ291dCA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICB2YXIgcmVkaXJlY3RVcmwgPSBgJHt0aGlzLmNvbmZpZy5sb2dvdXRVcmx9P2AgK1xyXG4gICAgICAgICAgICBgJHt0aGlzLmNvbmZpZy5sb2dvdXRSZWRpcmVjdFBhcmFtZXRlck5hbWV9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY29uZmlnLnJlZGlyZWN0VXJpKX1gO1xyXG5cclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlZGlyZWN0VXJsO1xyXG4gICAgICAgIHRoaXMub0F1dGhUb2tlblNlcnZpY2UucmVtb3ZlVG9rZW4oKTtcclxuICAgIH07ICAgXHJcblxyXG4gICAgcHVibGljIGxvZ2luT25TdGF0ZUNoYW5nZSA9ICh0b1N0YXRlKTogYm9vbGVhbiA9PiB7XHJcbiAgICAgICAgaWYgKHRvU3RhdGUgJiYgdGhpcy5pc0xvZ2luUmVxdWlyZWQodG9TdGF0ZSkgJiYgIXRoaXMuaXNBdXRoZW50aWNhdGVkKCkgJiYgIXRoaXMuZ2V0VG9rZW5EYXRhRnJvbVVybCgpKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmlzU3RvcmFnZVN1cHBvcnRlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF3aW5kb3cubG9jYXRpb24uaGFzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybCA9IHRoaXMuZ2V0QmFzZVJvdXRlVXJsKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldDxzdHJpbmc+KE9BVVRIX1NUQVJUUEFHRV9TVE9SQUdFX0tFWSwgdXJsKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB0aGlzLmxvZ2luKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIHNldFRva2VuT25SZWRpcmVjdCA9ICgpOiB2b2lkID0+IHsgICAgICAgIFxyXG4gICAgICAgIHZhciB0b2tlbkRhdGEgPSB0aGlzLmdldFRva2VuRGF0YUZyb21VcmwoKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzQXV0aGVudGljYXRlZCgpICYmIHRva2VuRGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLm9BdXRoVG9rZW5TZXJ2aWNlLnNldFRva2VuKHRva2VuRGF0YSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmlzU3RvcmFnZVN1cHBvcnRlZCgpICYmIHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5nZXQoT0FVVEhfU1RBUlRQQUdFX1NUT1JBR0VfS0VZKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0UGFnZSA9IHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5nZXQ8c3RyaW5nPihPQVVUSF9TVEFSVFBBR0VfU1RPUkFHRV9LRVkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5yZW1vdmUoT0FVVEhfU1RBUlRQQUdFX1NUT1JBR0VfS0VZKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHN0YXJ0UGFnZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFJlZGlyZWN0IHRvIHRoZSBiYXNlIGFwcGxpY2F0aW9uIHJvdXRlXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuZ2V0QmFzZVJvdXRlVXJsKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnB1Ymxpc2goT0F1dGhTZXJ2aWNlLkxPR0lOX1NVQ0NFU1NfRVZFTlQsIHRva2VuRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGlzTG9naW5SZXF1aXJlZCA9IChzdGF0ZSk6IGJvb2xlYW4gPT4geyBcclxuICAgICAgICB2YXIgcm91dGVIYXNDb25maWcgPSBzdGF0ZS5zZXR0aW5ncyAmJiBzdGF0ZS5zZXR0aW5ncy5yZXF1aXJlTG9naW4gIT09IHVuZGVmaW5lZDtcclxuICAgICAgICB2YXIgcm91dGVSZXF1aXJlc0xvZ2luID0gcm91dGVIYXNDb25maWcgJiYgc3RhdGUuc2V0dGluZ3MucmVxdWlyZUxvZ2luID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuICAgICAgICByZXR1cm4gcm91dGVIYXNDb25maWcgPyByb3V0ZVJlcXVpcmVzTG9naW4gOiB0aGlzLmNvbmZpZy5hbHdheXNSZXF1aXJlTG9naW47XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgZ2V0VG9rZW5EYXRhRnJvbVVybCA9ICgpOiBJT0F1dGhUb2tlbkRhdGEgPT4ge1xyXG4gICAgICAgIHZhciBoYXNoRGF0YSA9IHRoaXMudXJsSGFzaFNlcnZpY2UuZ2V0SGFzaERhdGEoKTtcclxuICAgICAgICB2YXIgdG9rZW5EYXRhID0gdGhpcy5vQXV0aFRva2VuU2VydmljZS5jcmVhdGVUb2tlbihoYXNoRGF0YSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0b2tlbkRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgZ2V0QmFzZVJvdXRlVXJsID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnLyMvJztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFNpbXBsZU5vbmNlVmFsdWUgPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gKChEYXRlLm5vdygpICsgTWF0aC5yYW5kb20oKSkgKiBNYXRoLnJhbmRvbSgpKS50b1N0cmluZygpLnJlcGxhY2UoJy4nLCAnJyk7XHJcbiAgICB9XHJcbn0iXX0=
