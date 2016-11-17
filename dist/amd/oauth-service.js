var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-event-aggregator', 'aurelia-dependency-injection', './oauth-token-service', './url-hash-service', './local-storage-service', './oauth-polyfills'], function (require, exports, aurelia_event_aggregator_1, aurelia_dependency_injection_1, oauth_token_service_1, url_hash_service_1, local_storage_service_1, oauth_polyfills_1) {
    "use strict";
    var OAUTH_STARTPAGE_STORAGE_KEY = 'oauth.startPage';
    var OAuthService = (function () {
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
    exports.OAuthService = OAuthService;
});

//# sourceMappingURL=data:application/json;base64,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QUk7Z0JBQ2YsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsMkJBQTJCLEVBQUUsMEJBQTBCO2dCQUN2RCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxrQkFBa0IsRUFBRSxLQUFLO2FBQzVCLENBQUM7UUFDTixDQUFDO1FBbEJELHNCQUFrQixtQ0FBbUI7aUJBQXJDLGNBQWtELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7OztXQUFBO1FBQ2hGLHNCQUFrQixtQ0FBbUI7aUJBQXJDLGNBQWtELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7OztXQUFBO1FBUHBGO1lBQUMseUNBQVUsRUFBRTs7d0JBQUE7UUF5SmIsbUJBQUM7SUFBRCxDQXhKQSxBQXdKQyxJQUFBO0lBeEpZLG9CQUFZLGVBd0p4QixDQUFBIiwiZmlsZSI6Im9hdXRoLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSAnYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvbic7XHJcblxyXG5pbXBvcnQgeyBPQXV0aFRva2VuU2VydmljZSB9IGZyb20gJy4vb2F1dGgtdG9rZW4tc2VydmljZSc7XHJcbmltcG9ydCBVcmxIYXNoU2VydmljZSBmcm9tICcuL3VybC1oYXNoLXNlcnZpY2UnO1xyXG5pbXBvcnQgTG9jYWxTdG9yYWdlU2VydmljZSBmcm9tICcuL2xvY2FsLXN0b3JhZ2Utc2VydmljZSc7XHJcbmltcG9ydCB7IG9iamVjdEFzc2lnbiB9IGZyb20gJy4vb2F1dGgtcG9seWZpbGxzJztcclxuXHJcbmNvbnN0IE9BVVRIX1NUQVJUUEFHRV9TVE9SQUdFX0tFWTogc3RyaW5nID0gJ29hdXRoLnN0YXJ0UGFnZSc7XHJcblxyXG5AYXV0b2luamVjdCgpXHJcbmV4cG9ydCBjbGFzcyBPQXV0aFNlcnZpY2UgaW1wbGVtZW50cyBJT0F1dGhTZXJ2aWNlIHtcclxuXHJcbiAgICBwcml2YXRlIGRlZmF1bHRzOiBJT0F1dGhDb25maWc7XHJcbiAgICBwdWJsaWMgY29uZmlnOiBJT0F1dGhDb25maWc7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgTE9HSU5fU1VDQ0VTU19FVkVOVCgpOiBzdHJpbmcgeyByZXR1cm4gJ29hdXRoOmxvZ2luU3VjY2Vzcyc7IH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IElOVkFMSURfVE9LRU5fRVZFTlQoKTogc3RyaW5nIHsgcmV0dXJuICdvYXV0aDppbnZhbGlkVG9rZW4nOyB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBvQXV0aFRva2VuU2VydmljZTogT0F1dGhUb2tlblNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSB1cmxIYXNoU2VydmljZTogVXJsSGFzaFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBsb2NhbFN0b3JhZ2VTZXJ2aWNlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3IpIHtcclxuICAgIFxyXG4gICAgICAgIHRoaXMuZGVmYXVsdHMgPSB7XHJcbiAgICAgICAgICAgIGxvZ2luVXJsOiBudWxsLFxyXG4gICAgICAgICAgICBsb2dvdXRVcmw6IG51bGwsXHJcbiAgICAgICAgICAgIGNsaWVudElkOiBudWxsLFxyXG4gICAgICAgICAgICBsb2dvdXRSZWRpcmVjdFBhcmFtZXRlck5hbWU6ICdwb3N0X2xvZ291dF9yZWRpcmVjdF91cmknLFxyXG4gICAgICAgICAgICBzY29wZTogbnVsbCxcclxuICAgICAgICAgICAgc3RhdGU6IG51bGwsXHJcbiAgICAgICAgICAgIGFsd2F5c1JlcXVpcmVMb2dpbjogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb25maWd1cmUgPSAoY29uZmlnOiBJT0F1dGhDb25maWcpOiBJT0F1dGhDb25maWcgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09BdXRoUHJvdmlkZXIgYWxyZWFkeSBjb25maWd1cmVkLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHNsYXNoIGZyb20gdXJscy5cclxuICAgICAgICBpZiAoY29uZmlnLmxvZ2luVXJsLnN1YnN0cigtMSkgPT09ICcvJykge1xyXG4gICAgICAgICAgICBjb25maWcubG9naW5VcmwgPSBjb25maWcubG9naW5Vcmwuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNvbmZpZy5sb2dvdXRVcmwuc3Vic3RyKC0xKSA9PT0gJy8nKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5sb2dvdXRVcmwgPSBjb25maWcubG9nb3V0VXJsLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEV4dGVuZCBkZWZhdWx0IGNvbmZpZ3VyYXRpb24uXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBvYmplY3RBc3NpZ24odGhpcy5kZWZhdWx0cywgY29uZmlnKTtcclxuXHJcbiAgICAgICAgLy8gUmVkaXJlY3QgaXMgc2V0IHRvIGN1cnJlbnQgbG9jYXRpb24gYnkgZGVmYXVsdFxyXG4gICAgICAgIHZhciBleGlzdGluZ0hhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcclxuICAgICAgICB2YXIgcGF0aERlZmF1bHQgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIG5vdCBuZWVkZWQgcGFydHMgZnJvbSB1cmxzLlxyXG4gICAgICAgIGlmIChleGlzdGluZ0hhc2gpIHtcclxuICAgICAgICAgICAgcGF0aERlZmF1bHQgPSBwYXRoRGVmYXVsdC5yZXBsYWNlKGV4aXN0aW5nSGFzaCwgJycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhdGhEZWZhdWx0LnN1YnN0cigtMSkgPT09ICcjJykge1xyXG4gICAgICAgICAgICBwYXRoRGVmYXVsdCA9IHBhdGhEZWZhdWx0LnNsaWNlKDAsIC0xKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlnLnJlZGlyZWN0VXJpID0gY29uZmlnLnJlZGlyZWN0VXJpIHx8IHBhdGhEZWZhdWx0O1xyXG5cclxuICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgaXNBdXRoZW50aWNhdGVkID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgIHJldHVybiA8YW55PnRoaXMub0F1dGhUb2tlblNlcnZpY2UuZ2V0VG9rZW4oKTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGxvZ2luID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIHZhciByZWRpcmVjdFVybCA9IGAke3RoaXMuY29uZmlnLmxvZ2luVXJsfT9gICtcclxuICAgICAgICAgICAgYHJlc3BvbnNlX3R5cGU9JHt0aGlzLm9BdXRoVG9rZW5TZXJ2aWNlLmNvbmZpZy5uYW1lfSZgICtcclxuICAgICAgICAgICAgYGNsaWVudF9pZD0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbmZpZy5jbGllbnRJZCl9JmAgK1xyXG4gICAgICAgICAgICBgcmVkaXJlY3RfdXJpPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY29uZmlnLnJlZGlyZWN0VXJpKX0mYCArXHJcbiAgICAgICAgICAgIGBub25jZT0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLmdldFNpbXBsZU5vbmNlVmFsdWUoKSl9YDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnNjb3BlKSB7XHJcbiAgICAgICAgICAgIHJlZGlyZWN0VXJsICs9IGAmc2NvcGU9JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb25maWcuc2NvcGUpfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5zdGF0ZSkge1xyXG4gICAgICAgICAgICByZWRpcmVjdFVybCArPSBgJnN0YXRlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY29uZmlnLnN0YXRlKX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlZGlyZWN0VXJsO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgbG9nb3V0ID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIHZhciByZWRpcmVjdFVybCA9IGAke3RoaXMuY29uZmlnLmxvZ291dFVybH0/YCArXHJcbiAgICAgICAgICAgIGAke3RoaXMuY29uZmlnLmxvZ291dFJlZGlyZWN0UGFyYW1ldGVyTmFtZX09JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb25maWcucmVkaXJlY3RVcmkpfWA7XHJcblxyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVkaXJlY3RVcmw7XHJcbiAgICAgICAgdGhpcy5vQXV0aFRva2VuU2VydmljZS5yZW1vdmVUb2tlbigpO1xyXG4gICAgfTsgICBcclxuXHJcbiAgICBwdWJsaWMgbG9naW5PblN0YXRlQ2hhbmdlID0gKHRvU3RhdGUpOiBib29sZWFuID0+IHtcclxuICAgICAgICBpZiAodG9TdGF0ZSAmJiB0aGlzLmlzTG9naW5SZXF1aXJlZCh0b1N0YXRlKSAmJiAhdGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSAmJiAhdGhpcy5nZXRUb2tlbkRhdGFGcm9tVXJsKCkpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UuaXNTdG9yYWdlU3VwcG9ydGVkKCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gdGhpcy5nZXRCYXNlUm91dGVVcmwoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0PHN0cmluZz4oT0FVVEhfU1RBUlRQQUdFX1NUT1JBR0VfS0VZLCB1cmwpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHRoaXMubG9naW4oKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgc2V0VG9rZW5PblJlZGlyZWN0ID0gKCk6IHZvaWQgPT4geyAgICAgICAgXHJcbiAgICAgICAgdmFyIHRva2VuRGF0YSA9IHRoaXMuZ2V0VG9rZW5EYXRhRnJvbVVybCgpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaXNBdXRoZW50aWNhdGVkKCkgJiYgdG9rZW5EYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMub0F1dGhUb2tlblNlcnZpY2Uuc2V0VG9rZW4odG9rZW5EYXRhKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UuaXNTdG9yYWdlU3VwcG9ydGVkKCkgJiYgdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldChPQVVUSF9TVEFSVFBBR0VfU1RPUkFHRV9LRVkpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnRQYWdlID0gdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldDxzdHJpbmc+KE9BVVRIX1NUQVJUUEFHRV9TVE9SQUdFX0tFWSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLnJlbW92ZShPQVVUSF9TVEFSVFBBR0VfU1RPUkFHRV9LRVkpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gc3RhcnRQYWdlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVkaXJlY3QgdG8gdGhlIGJhc2UgYXBwbGljYXRpb24gcm91dGVcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5nZXRCYXNlUm91dGVVcmwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucHVibGlzaChPQXV0aFNlcnZpY2UuTE9HSU5fU1VDQ0VTU19FVkVOVCwgdG9rZW5EYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgaXNMb2dpblJlcXVpcmVkID0gKHN0YXRlKTogYm9vbGVhbiA9PiB7IFxyXG4gICAgICAgIHZhciByb3V0ZUhhc0NvbmZpZyA9IHN0YXRlLnNldHRpbmdzICYmIHN0YXRlLnNldHRpbmdzLnJlcXVpcmVMb2dpbiAhPT0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHZhciByb3V0ZVJlcXVpcmVzTG9naW4gPSByb3V0ZUhhc0NvbmZpZyAmJiBzdGF0ZS5zZXR0aW5ncy5yZXF1aXJlTG9naW4gPyB0cnVlIDogZmFsc2U7XHJcblxyXG4gICAgICAgIHJldHVybiByb3V0ZUhhc0NvbmZpZyA/IHJvdXRlUmVxdWlyZXNMb2dpbiA6IHRoaXMuY29uZmlnLmFsd2F5c1JlcXVpcmVMb2dpbjtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRUb2tlbkRhdGFGcm9tVXJsID0gKCk6IElPQXV0aFRva2VuRGF0YSA9PiB7XHJcbiAgICAgICAgdmFyIGhhc2hEYXRhID0gdGhpcy51cmxIYXNoU2VydmljZS5nZXRIYXNoRGF0YSgpO1xyXG4gICAgICAgIHZhciB0b2tlbkRhdGEgPSB0aGlzLm9BdXRoVG9rZW5TZXJ2aWNlLmNyZWF0ZVRva2VuKGhhc2hEYXRhKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRva2VuRGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRCYXNlUm91dGVVcmwgPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArICcvIy8nO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0U2ltcGxlTm9uY2VWYWx1ZSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIHJldHVybiAoKERhdGUubm93KCkgKyBNYXRoLnJhbmRvbSgpKSAqIE1hdGgucmFuZG9tKCkpLnRvU3RyaW5nKCkucmVwbGFjZSgnLicsICcnKTtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
