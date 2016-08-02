System.register(['aurelia-event-aggregator', 'aurelia-dependency-injection', './oauth-token-service', './url-hash-service', './local-storage-service'], function(exports_1, context_1) {
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
    var aurelia_event_aggregator_1, aurelia_dependency_injection_1, oauth_token_service_1, url_hash_service_1, local_storage_service_1;
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
                        _this.config = Object.assign(_this.defaults, config);
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

//# sourceMappingURL=data:application/json;base64,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QkFBa0IsRUFBRSxLQUFLO3FCQUM1QixDQUFDO2dCQUNOLENBQUM7Z0JBakJELHNCQUFrQixtQ0FBbUI7eUJBQXJDLGNBQWtELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFDaEYsc0JBQWtCLG1DQUFtQjt5QkFBckMsY0FBa0QsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQVBwRjtvQkFBQyx5Q0FBVSxFQUFFOztnQ0FBQTtnQkFvSmIsbUJBQUM7WUFBRCxDQW5KQSxBQW1KQyxJQUFBO1lBbkpELHVDQW1KQyxDQUFBIiwiZmlsZSI6Im9hdXRoLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSAnYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvbic7XHJcblxyXG5pbXBvcnQgeyBPQXV0aFRva2VuU2VydmljZSB9IGZyb20gJy4vb2F1dGgtdG9rZW4tc2VydmljZSc7XHJcbmltcG9ydCBVcmxIYXNoU2VydmljZSBmcm9tICcuL3VybC1oYXNoLXNlcnZpY2UnO1xyXG5pbXBvcnQgTG9jYWxTdG9yYWdlU2VydmljZSBmcm9tICcuL2xvY2FsLXN0b3JhZ2Utc2VydmljZSc7XHJcblxyXG5jb25zdCBPQVVUSF9TVEFSVFBBR0VfU1RPUkFHRV9LRVk6IHN0cmluZyA9ICdvYXV0aC5zdGFydFBhZ2UnO1xyXG5cclxuQGF1dG9pbmplY3QoKVxyXG5leHBvcnQgY2xhc3MgT0F1dGhTZXJ2aWNlIGltcGxlbWVudHMgSU9BdXRoU2VydmljZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBkZWZhdWx0czogSU9BdXRoQ29uZmlnO1xyXG4gICAgcHVibGljIGNvbmZpZzogSU9BdXRoQ29uZmlnO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IExPR0lOX1NVQ0NFU1NfRVZFTlQoKTogc3RyaW5nIHsgcmV0dXJuICdvYXV0aDpsb2dpblN1Y2Nlc3MnOyB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJTlZBTElEX1RPS0VOX0VWRU5UKCk6IHN0cmluZyB7IHJldHVybiAnb2F1dGg6aW52YWxpZFRva2VuJzsgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgb0F1dGhUb2tlblNlcnZpY2U6IE9BdXRoVG9rZW5TZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgdXJsSGFzaFNlcnZpY2U6IFVybEhhc2hTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgbG9jYWxTdG9yYWdlU2VydmljZTogTG9jYWxTdG9yYWdlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yKSB7XHJcbiAgICBcclxuICAgICAgICB0aGlzLmRlZmF1bHRzID0ge1xyXG4gICAgICAgICAgICBsb2dpblVybDogbnVsbCxcclxuICAgICAgICAgICAgbG9nb3V0VXJsOiBudWxsLFxyXG4gICAgICAgICAgICBjbGllbnRJZDogbnVsbCxcclxuICAgICAgICAgICAgbG9nb3V0UmVkaXJlY3RQYXJhbWV0ZXJOYW1lOiAncG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpJyxcclxuICAgICAgICAgICAgc2NvcGU6IG51bGwsXHJcbiAgICAgICAgICAgIGFsd2F5c1JlcXVpcmVMb2dpbjogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb25maWd1cmUgPSAoY29uZmlnOiBJT0F1dGhDb25maWcpOiBJT0F1dGhDb25maWcgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09BdXRoUHJvdmlkZXIgYWxyZWFkeSBjb25maWd1cmVkLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHNsYXNoIGZyb20gdXJscy5cclxuICAgICAgICBpZiAoY29uZmlnLmxvZ2luVXJsLnN1YnN0cigtMSkgPT09ICcvJykge1xyXG4gICAgICAgICAgICBjb25maWcubG9naW5VcmwgPSBjb25maWcubG9naW5Vcmwuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNvbmZpZy5sb2dvdXRVcmwuc3Vic3RyKC0xKSA9PT0gJy8nKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5sb2dvdXRVcmwgPSBjb25maWcubG9nb3V0VXJsLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEV4dGVuZCBkZWZhdWx0IGNvbmZpZ3VyYXRpb24uXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XHJcblxyXG4gICAgICAgIC8vIFJlZGlyZWN0IGlzIHNldCB0byBjdXJyZW50IGxvY2F0aW9uIGJ5IGRlZmF1bHRcclxuICAgICAgICB2YXIgZXhpc3RpbmdIYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XHJcbiAgICAgICAgdmFyIHBhdGhEZWZhdWx0ID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBub3QgbmVlZGVkIHBhcnRzIGZyb20gdXJscy5cclxuICAgICAgICBpZiAoZXhpc3RpbmdIYXNoKSB7XHJcbiAgICAgICAgICAgIHBhdGhEZWZhdWx0ID0gcGF0aERlZmF1bHQucmVwbGFjZShleGlzdGluZ0hhc2gsICcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYXRoRGVmYXVsdC5zdWJzdHIoLTEpID09PSAnIycpIHtcclxuICAgICAgICAgICAgcGF0aERlZmF1bHQgPSBwYXRoRGVmYXVsdC5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZy5yZWRpcmVjdFVyaSA9IGNvbmZpZy5yZWRpcmVjdFVyaSB8fCBwYXRoRGVmYXVsdDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGlzQXV0aGVudGljYXRlZCA9ICgpOiBib29sZWFuID0+IHtcclxuICAgICAgICByZXR1cm4gPGFueT50aGlzLm9BdXRoVG9rZW5TZXJ2aWNlLmdldFRva2VuKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBsb2dpbiA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICB2YXIgcmVkaXJlY3RVcmwgPSBgJHt0aGlzLmNvbmZpZy5sb2dpblVybH0/YCArXHJcbiAgICAgICAgICAgIGByZXNwb25zZV90eXBlPSR7dGhpcy5vQXV0aFRva2VuU2VydmljZS5jb25maWcubmFtZX0mYCArXHJcbiAgICAgICAgICAgIGBjbGllbnRfaWQ9JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb25maWcuY2xpZW50SWQpfSZgICtcclxuICAgICAgICAgICAgYHJlZGlyZWN0X3VyaT0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbmZpZy5yZWRpcmVjdFVyaSl9JmAgK1xyXG4gICAgICAgICAgICBgbm9uY2U9JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5nZXRTaW1wbGVOb25jZVZhbHVlKCkpfWA7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5zY29wZSkge1xyXG4gICAgICAgICAgICByZWRpcmVjdFVybCArPSBgJnNjb3BlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY29uZmlnLnNjb3BlKX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlZGlyZWN0VXJsO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgbG9nb3V0ID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIHZhciByZWRpcmVjdFVybCA9IGAke3RoaXMuY29uZmlnLmxvZ291dFVybH0/YCArXHJcbiAgICAgICAgICAgIGAke3RoaXMuY29uZmlnLmxvZ291dFJlZGlyZWN0UGFyYW1ldGVyTmFtZX09JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb25maWcucmVkaXJlY3RVcmkpfWA7XHJcblxyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVkaXJlY3RVcmw7XHJcbiAgICAgICAgdGhpcy5vQXV0aFRva2VuU2VydmljZS5yZW1vdmVUb2tlbigpO1xyXG4gICAgfTsgICBcclxuXHJcbiAgICBwdWJsaWMgbG9naW5PblN0YXRlQ2hhbmdlID0gKHRvU3RhdGUpOiBib29sZWFuID0+IHtcclxuICAgICAgICBpZiAodG9TdGF0ZSAmJiB0aGlzLmlzTG9naW5SZXF1aXJlZCh0b1N0YXRlKSAmJiAhdGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSAmJiAhdGhpcy5nZXRUb2tlbkRhdGFGcm9tVXJsKCkpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UuaXNTdG9yYWdlU3VwcG9ydGVkKCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gdGhpcy5nZXRCYXNlUm91dGVVcmwoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0PHN0cmluZz4oT0FVVEhfU1RBUlRQQUdFX1NUT1JBR0VfS0VZLCB1cmwpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHRoaXMubG9naW4oKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgc2V0VG9rZW5PblJlZGlyZWN0ID0gKCk6IHZvaWQgPT4geyAgICAgICAgXHJcbiAgICAgICAgdmFyIHRva2VuRGF0YSA9IHRoaXMuZ2V0VG9rZW5EYXRhRnJvbVVybCgpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaXNBdXRoZW50aWNhdGVkKCkgJiYgdG9rZW5EYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMub0F1dGhUb2tlblNlcnZpY2Uuc2V0VG9rZW4odG9rZW5EYXRhKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UuaXNTdG9yYWdlU3VwcG9ydGVkKCkgJiYgdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldChPQVVUSF9TVEFSVFBBR0VfU1RPUkFHRV9LRVkpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnRQYWdlID0gdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldDxzdHJpbmc+KE9BVVRIX1NUQVJUUEFHRV9TVE9SQUdFX0tFWSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnJlbW92ZShPQVVUSF9TVEFSVFBBR0VfU1RPUkFHRV9LRVkpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gc3RhcnRQYWdlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVkaXJlY3QgdG8gdGhlIGJhc2UgYXBwbGljYXRpb24gcm91dGVcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5nZXRCYXNlUm91dGVVcmwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucHVibGlzaChPQXV0aFNlcnZpY2UuTE9HSU5fU1VDQ0VTU19FVkVOVCwgdG9rZW5EYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgaXNMb2dpblJlcXVpcmVkID0gKHN0YXRlKTogYm9vbGVhbiA9PiB7IFxyXG4gICAgICAgIHZhciByb3V0ZUhhc0NvbmZpZyA9IHN0YXRlLnNldHRpbmdzICYmIHN0YXRlLnNldHRpbmdzLnJlcXVpcmVMb2dpbiAhPT0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHZhciByb3V0ZVJlcXVpcmVzTG9naW4gPSByb3V0ZUhhc0NvbmZpZyAmJiBzdGF0ZS5zZXR0aW5ncy5yZXF1aXJlTG9naW4gPyB0cnVlIDogZmFsc2U7XHJcblxyXG4gICAgICAgIHJldHVybiByb3V0ZUhhc0NvbmZpZyA/IHJvdXRlUmVxdWlyZXNMb2dpbiA6IHRoaXMuY29uZmlnLmFsd2F5c1JlcXVpcmVMb2dpbjtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRUb2tlbkRhdGFGcm9tVXJsID0gKCk6IElPQXV0aFRva2VuRGF0YSA9PiB7XHJcbiAgICAgICAgdmFyIGhhc2hEYXRhID0gdGhpcy51cmxIYXNoU2VydmljZS5nZXRIYXNoRGF0YSgpO1xyXG4gICAgICAgIHZhciB0b2tlbkRhdGEgPSB0aGlzLm9BdXRoVG9rZW5TZXJ2aWNlLmNyZWF0ZVRva2VuKGhhc2hEYXRhKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRva2VuRGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRCYXNlUm91dGVVcmwgPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArICcvIy8nO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0U2ltcGxlTm9uY2VWYWx1ZSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIHJldHVybiAoKERhdGUubm93KCkgKyBNYXRoLnJhbmRvbSgpKSAqIE1hdGgucmFuZG9tKCkpLnRvU3RyaW5nKCkucmVwbGFjZSgnLicsICcnKTtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
