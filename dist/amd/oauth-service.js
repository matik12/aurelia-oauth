var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-event-aggregator", "aurelia-dependency-injection", "./oauth-token-service", "./url-hash-service", "./local-storage-service", "./oauth-polyfills"], function (require, exports, aurelia_event_aggregator_1, aurelia_dependency_injection_1, oauth_token_service_1, url_hash_service_1, local_storage_service_1, oauth_polyfills_1) {
    "use strict";
    var OAUTH_STARTPAGE_STORAGE_KEY = 'oauth.startPage';
    var OAuthService = OAuthService_1 = (function () {
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
                var redirectUrl = _this.config.loginUrl + "?" +
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
                var redirectUrl = _this.config.logoutUrl + "?" +
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
                    _this.eventAggregator.publish(OAuthService_1.LOGIN_SUCCESS_EVENT, tokenData);
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
        return OAuthService;
    }());
    OAuthService = OAuthService_1 = __decorate([
        aurelia_dependency_injection_1.autoinject(),
        __metadata("design:paramtypes", [oauth_token_service_1.OAuthTokenService,
            url_hash_service_1.default,
            local_storage_service_1.default,
            aurelia_event_aggregator_1.EventAggregator])
    ], OAuthService);
    exports.OAuthService = OAuthService;
    var OAuthService_1;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q2QsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsMkJBQTJCLEVBQUUsMEJBQTBCO2dCQUN2RCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxrQkFBa0IsRUFBRSxLQUFLO2FBQzVCLENBQUM7UUFDTixDQUFDO1FBbEJELHNCQUFrQixtQ0FBbUI7aUJBQXJDLGNBQWtELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7OztXQUFBO1FBQ2hGLHNCQUFrQixtQ0FBbUI7aUJBQXJDLGNBQWtELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7OztXQUFBO1FBa0pwRixtQkFBQztJQUFELENBekpBLEFBeUpDLElBQUE7SUF6SlksWUFBWTtRQUR4Qix5Q0FBVSxFQUFFO3lDQVdzQix1Q0FBaUI7WUFDcEIsMEJBQWM7WUFDVCwrQkFBbUI7WUFDdkIsMENBQWU7T0FibkMsWUFBWSxDQXlKeEI7SUF6Slksb0NBQVkiLCJmaWxlIjoib2F1dGgtc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50QWdncmVnYXRvciB9IGZyb20gJ2F1cmVsaWEtZXZlbnQtYWdncmVnYXRvcic7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tICdhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uJztcclxuXHJcbmltcG9ydCB7IE9BdXRoVG9rZW5TZXJ2aWNlLCBPQXV0aFRva2VuRGF0YSB9IGZyb20gJy4vb2F1dGgtdG9rZW4tc2VydmljZSc7XHJcbmltcG9ydCBVcmxIYXNoU2VydmljZSBmcm9tICcuL3VybC1oYXNoLXNlcnZpY2UnO1xyXG5pbXBvcnQgTG9jYWxTdG9yYWdlU2VydmljZSBmcm9tICcuL2xvY2FsLXN0b3JhZ2Utc2VydmljZSc7XHJcbmltcG9ydCB7IG9iamVjdEFzc2lnbiB9IGZyb20gJy4vb2F1dGgtcG9seWZpbGxzJztcclxuXHJcbmNvbnN0IE9BVVRIX1NUQVJUUEFHRV9TVE9SQUdFX0tFWTogc3RyaW5nID0gJ29hdXRoLnN0YXJ0UGFnZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE9BdXRoQ29uZmlnIHtcclxuICAgIGxvZ2luVXJsOiBzdHJpbmc7XHJcbiAgICBsb2dvdXRVcmw6IHN0cmluZztcclxuICAgIGNsaWVudElkOiBzdHJpbmc7XHJcbiAgICBsb2dvdXRSZWRpcmVjdFBhcmFtZXRlck5hbWU/OiBzdHJpbmc7XHJcbiAgICBzY29wZT86IHN0cmluZztcclxuICAgIHN0YXRlPzogc3RyaW5nO1xyXG4gICAgcmVkaXJlY3RVcmk/OiBzdHJpbmc7XHJcbiAgICBhbHdheXNSZXF1aXJlTG9naW4/OiBib29sZWFuO1xyXG59XHJcblxyXG5AYXV0b2luamVjdCgpXHJcbmV4cG9ydCBjbGFzcyBPQXV0aFNlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBjb25maWc6IE9BdXRoQ29uZmlnO1xyXG5cclxuICAgIHByaXZhdGUgZGVmYXVsdHM6IE9BdXRoQ29uZmlnO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IExPR0lOX1NVQ0NFU1NfRVZFTlQoKTogc3RyaW5nIHsgcmV0dXJuICdvYXV0aDpsb2dpblN1Y2Nlc3MnOyB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJTlZBTElEX1RPS0VOX0VWRU5UKCk6IHN0cmluZyB7IHJldHVybiAnb2F1dGg6aW52YWxpZFRva2VuJzsgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgb0F1dGhUb2tlblNlcnZpY2U6IE9BdXRoVG9rZW5TZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgdXJsSGFzaFNlcnZpY2U6IFVybEhhc2hTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgbG9jYWxTdG9yYWdlU2VydmljZTogTG9jYWxTdG9yYWdlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGV2ZW50QWdncmVnYXRvcjogRXZlbnRBZ2dyZWdhdG9yKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZGVmYXVsdHMgPSB7XHJcbiAgICAgICAgICAgIGxvZ2luVXJsOiBudWxsLFxyXG4gICAgICAgICAgICBsb2dvdXRVcmw6IG51bGwsXHJcbiAgICAgICAgICAgIGNsaWVudElkOiBudWxsLFxyXG4gICAgICAgICAgICBsb2dvdXRSZWRpcmVjdFBhcmFtZXRlck5hbWU6ICdwb3N0X2xvZ291dF9yZWRpcmVjdF91cmknLFxyXG4gICAgICAgICAgICBzY29wZTogbnVsbCxcclxuICAgICAgICAgICAgc3RhdGU6IG51bGwsXHJcbiAgICAgICAgICAgIGFsd2F5c1JlcXVpcmVMb2dpbjogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb25maWd1cmUgPSAoY29uZmlnOiBPQXV0aENvbmZpZyk6IE9BdXRoQ29uZmlnID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPQXV0aFByb3ZpZGVyIGFscmVhZHkgY29uZmlndXJlZC4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSB0cmFpbGluZyBzbGFzaCBmcm9tIHVybHMuXHJcbiAgICAgICAgaWYgKGNvbmZpZy5sb2dpblVybC5zdWJzdHIoLTEpID09PSAnLycpIHtcclxuICAgICAgICAgICAgY29uZmlnLmxvZ2luVXJsID0gY29uZmlnLmxvZ2luVXJsLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjb25maWcubG9nb3V0VXJsLnN1YnN0cigtMSkgPT09ICcvJykge1xyXG4gICAgICAgICAgICBjb25maWcubG9nb3V0VXJsID0gY29uZmlnLmxvZ291dFVybC5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBFeHRlbmQgZGVmYXVsdCBjb25maWd1cmF0aW9uLlxyXG4gICAgICAgIHRoaXMuY29uZmlnID0gb2JqZWN0QXNzaWduKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XHJcblxyXG4gICAgICAgIC8vIFJlZGlyZWN0IGlzIHNldCB0byBjdXJyZW50IGxvY2F0aW9uIGJ5IGRlZmF1bHRcclxuICAgICAgICBjb25zdCBleGlzdGluZ0hhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcclxuICAgICAgICBsZXQgcGF0aERlZmF1bHQgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIG5vdCBuZWVkZWQgcGFydHMgZnJvbSB1cmxzLlxyXG4gICAgICAgIGlmIChleGlzdGluZ0hhc2gpIHtcclxuICAgICAgICAgICAgcGF0aERlZmF1bHQgPSBwYXRoRGVmYXVsdC5yZXBsYWNlKGV4aXN0aW5nSGFzaCwgJycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhdGhEZWZhdWx0LnN1YnN0cigtMSkgPT09ICcjJykge1xyXG4gICAgICAgICAgICBwYXRoRGVmYXVsdCA9IHBhdGhEZWZhdWx0LnNsaWNlKDAsIC0xKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlnLnJlZGlyZWN0VXJpID0gY29uZmlnLnJlZGlyZWN0VXJpIHx8IHBhdGhEZWZhdWx0O1xyXG5cclxuICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgaXNBdXRoZW50aWNhdGVkID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgIHJldHVybiA8YW55PnRoaXMub0F1dGhUb2tlblNlcnZpY2UuZ2V0VG9rZW4oKTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGxvZ2luID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGxldCByZWRpcmVjdFVybCA9IGAke3RoaXMuY29uZmlnLmxvZ2luVXJsfT9gICtcclxuICAgICAgICAgICAgYHJlc3BvbnNlX3R5cGU9JHt0aGlzLm9BdXRoVG9rZW5TZXJ2aWNlLmNvbmZpZy5uYW1lfSZgICtcclxuICAgICAgICAgICAgYGNsaWVudF9pZD0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbmZpZy5jbGllbnRJZCl9JmAgK1xyXG4gICAgICAgICAgICBgcmVkaXJlY3RfdXJpPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY29uZmlnLnJlZGlyZWN0VXJpKX0mYCArXHJcbiAgICAgICAgICAgIGBub25jZT0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLmdldFNpbXBsZU5vbmNlVmFsdWUoKSl9YDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnNjb3BlKSB7XHJcbiAgICAgICAgICAgIHJlZGlyZWN0VXJsICs9IGAmc2NvcGU9JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb25maWcuc2NvcGUpfWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5jb25maWcuc3RhdGUpIHtcclxuICAgICAgICAgICAgcmVkaXJlY3RVcmwgKz0gYCZzdGF0ZT0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbmZpZy5zdGF0ZSl9YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVkaXJlY3RVcmw7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBsb2dvdXQgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVkaXJlY3RVcmwgPSBgJHt0aGlzLmNvbmZpZy5sb2dvdXRVcmx9P2AgK1xyXG4gICAgICAgICAgICBgJHt0aGlzLmNvbmZpZy5sb2dvdXRSZWRpcmVjdFBhcmFtZXRlck5hbWV9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY29uZmlnLnJlZGlyZWN0VXJpKX1gO1xyXG5cclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlZGlyZWN0VXJsO1xyXG4gICAgICAgIHRoaXMub0F1dGhUb2tlblNlcnZpY2UucmVtb3ZlVG9rZW4oKTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGxvZ2luT25TdGF0ZUNoYW5nZSA9ICh0b1N0YXRlKTogYm9vbGVhbiA9PiB7XHJcbiAgICAgICAgaWYgKHRvU3RhdGUgJiYgdGhpcy5pc0xvZ2luUmVxdWlyZWQodG9TdGF0ZSkgJiYgIXRoaXMuaXNBdXRoZW50aWNhdGVkKCkgJiYgIXRoaXMuZ2V0VG9rZW5EYXRhRnJvbVVybCgpKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmlzU3RvcmFnZVN1cHBvcnRlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF3aW5kb3cubG9jYXRpb24uaGFzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybCA9IHRoaXMuZ2V0QmFzZVJvdXRlVXJsKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldDxzdHJpbmc+KE9BVVRIX1NUQVJUUEFHRV9TVE9SQUdFX0tFWSwgdXJsKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5sb2dpbigpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBzZXRUb2tlbk9uUmVkaXJlY3QgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgY29uc3QgdG9rZW5EYXRhID0gdGhpcy5nZXRUb2tlbkRhdGFGcm9tVXJsKCk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSAmJiB0b2tlbkRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5vQXV0aFRva2VuU2VydmljZS5zZXRUb2tlbih0b2tlbkRhdGEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5pc1N0b3JhZ2VTdXBwb3J0ZWQoKSAmJiB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KE9BVVRIX1NUQVJUUEFHRV9TVE9SQUdFX0tFWSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0UGFnZSA9IHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5nZXQ8c3RyaW5nPihPQVVUSF9TVEFSVFBBR0VfU1RPUkFHRV9LRVkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5yZW1vdmUoT0FVVEhfU1RBUlRQQUdFX1NUT1JBR0VfS0VZKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gc3RhcnRQYWdlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVkaXJlY3QgdG8gdGhlIGJhc2UgYXBwbGljYXRpb24gcm91dGVcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5nZXRCYXNlUm91dGVVcmwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucHVibGlzaChPQXV0aFNlcnZpY2UuTE9HSU5fU1VDQ0VTU19FVkVOVCwgdG9rZW5EYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgaXNMb2dpblJlcXVpcmVkID0gKHN0YXRlKTogYm9vbGVhbiA9PiB7XHJcbiAgICAgICAgY29uc3Qgcm91dGVIYXNDb25maWcgPSBzdGF0ZS5zZXR0aW5ncyAmJiBzdGF0ZS5zZXR0aW5ncy5yZXF1aXJlTG9naW4gIT09IHVuZGVmaW5lZDtcclxuICAgICAgICBjb25zdCByb3V0ZVJlcXVpcmVzTG9naW4gPSByb3V0ZUhhc0NvbmZpZyAmJiBzdGF0ZS5zZXR0aW5ncy5yZXF1aXJlTG9naW4gPyB0cnVlIDogZmFsc2U7XHJcblxyXG4gICAgICAgIHJldHVybiByb3V0ZUhhc0NvbmZpZyA/IHJvdXRlUmVxdWlyZXNMb2dpbiA6IHRoaXMuY29uZmlnLmFsd2F5c1JlcXVpcmVMb2dpbjtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRUb2tlbkRhdGFGcm9tVXJsID0gKCk6IE9BdXRoVG9rZW5EYXRhID0+IHtcclxuICAgICAgICBjb25zdCBoYXNoRGF0YSA9IHRoaXMudXJsSGFzaFNlcnZpY2UuZ2V0SGFzaERhdGEoKTtcclxuICAgICAgICBjb25zdCB0b2tlbkRhdGEgPSB0aGlzLm9BdXRoVG9rZW5TZXJ2aWNlLmNyZWF0ZVRva2VuKGhhc2hEYXRhKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRva2VuRGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRCYXNlUm91dGVVcmwgPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArICcvIy8nO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0U2ltcGxlTm9uY2VWYWx1ZSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIHJldHVybiAoKERhdGUubm93KCkgKyBNYXRoLnJhbmRvbSgpKSAqIE1hdGgucmFuZG9tKCkpLnRvU3RyaW5nKCkucmVwbGFjZSgnLicsICcnKTtcclxuICAgIH1cclxufSJdfQ==
