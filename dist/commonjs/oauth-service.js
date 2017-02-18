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
var oauth_token_service_1 = require("./oauth-token-service");
var url_hash_service_1 = require("./url-hash-service");
var local_storage_service_1 = require("./local-storage-service");
var oauth_polyfills_1 = require("./oauth-polyfills");
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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USxHQUFHO1lBQ1osUUFBUSxFQUFFLElBQUk7WUFDZCxTQUFTLEVBQUUsSUFBSTtZQUNmLFFBQVEsRUFBRSxJQUFJO1lBQ2QsMkJBQTJCLEVBQUUsMEJBQTBCO1lBQ3ZELEtBQUssRUFBRSxJQUFJO1lBQ1gsS0FBSyxFQUFFLElBQUk7WUFDWCxrQkFBa0IsRUFBRSxLQUFLO1NBQzVCLENBQUM7SUFDTixDQUFDO0lBbEJELHNCQUFrQixtQ0FBbUI7YUFBckMsY0FBa0QsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDaEYsc0JBQWtCLG1DQUFtQjthQUFyQyxjQUFrRCxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQWtKcEYsbUJBQUM7QUFBRCxDQXpKQSxBQXlKQyxJQUFBO0FBekpZLFlBQVk7SUFEeEIseUNBQVUsRUFBRTtxQ0FXc0IsdUNBQWlCO1FBQ3BCLDBCQUFjO1FBQ1QsK0JBQW1CO1FBQ3ZCLDBDQUFlO0dBYm5DLFlBQVksQ0F5SnhCO0FBekpZLG9DQUFZIiwiZmlsZSI6Im9hdXRoLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xyXG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSAnYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvbic7XHJcblxyXG5pbXBvcnQgeyBPQXV0aFRva2VuU2VydmljZSwgT0F1dGhUb2tlbkRhdGEgfSBmcm9tICcuL29hdXRoLXRva2VuLXNlcnZpY2UnO1xyXG5pbXBvcnQgVXJsSGFzaFNlcnZpY2UgZnJvbSAnLi91cmwtaGFzaC1zZXJ2aWNlJztcclxuaW1wb3J0IExvY2FsU3RvcmFnZVNlcnZpY2UgZnJvbSAnLi9sb2NhbC1zdG9yYWdlLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBvYmplY3RBc3NpZ24gfSBmcm9tICcuL29hdXRoLXBvbHlmaWxscyc7XHJcblxyXG5jb25zdCBPQVVUSF9TVEFSVFBBR0VfU1RPUkFHRV9LRVk6IHN0cmluZyA9ICdvYXV0aC5zdGFydFBhZ2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBPQXV0aENvbmZpZyB7XHJcbiAgICBsb2dpblVybDogc3RyaW5nO1xyXG4gICAgbG9nb3V0VXJsOiBzdHJpbmc7XHJcbiAgICBjbGllbnRJZDogc3RyaW5nO1xyXG4gICAgbG9nb3V0UmVkaXJlY3RQYXJhbWV0ZXJOYW1lPzogc3RyaW5nO1xyXG4gICAgc2NvcGU/OiBzdHJpbmc7XHJcbiAgICBzdGF0ZT86IHN0cmluZztcclxuICAgIHJlZGlyZWN0VXJpPzogc3RyaW5nO1xyXG4gICAgYWx3YXlzUmVxdWlyZUxvZ2luPzogYm9vbGVhbjtcclxufVxyXG5cclxuQGF1dG9pbmplY3QoKVxyXG5leHBvcnQgY2xhc3MgT0F1dGhTZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgY29uZmlnOiBPQXV0aENvbmZpZztcclxuXHJcbiAgICBwcml2YXRlIGRlZmF1bHRzOiBPQXV0aENvbmZpZztcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBMT0dJTl9TVUNDRVNTX0VWRU5UKCk6IHN0cmluZyB7IHJldHVybiAnb2F1dGg6bG9naW5TdWNjZXNzJzsgfVxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSU5WQUxJRF9UT0tFTl9FVkVOVCgpOiBzdHJpbmcgeyByZXR1cm4gJ29hdXRoOmludmFsaWRUb2tlbic7IH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIG9BdXRoVG9rZW5TZXJ2aWNlOiBPQXV0aFRva2VuU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHVybEhhc2hTZXJ2aWNlOiBVcmxIYXNoU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGxvY2FsU3RvcmFnZVNlcnZpY2U6IExvY2FsU3RvcmFnZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcikge1xyXG5cclxuICAgICAgICB0aGlzLmRlZmF1bHRzID0ge1xyXG4gICAgICAgICAgICBsb2dpblVybDogbnVsbCxcclxuICAgICAgICAgICAgbG9nb3V0VXJsOiBudWxsLFxyXG4gICAgICAgICAgICBjbGllbnRJZDogbnVsbCxcclxuICAgICAgICAgICAgbG9nb3V0UmVkaXJlY3RQYXJhbWV0ZXJOYW1lOiAncG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpJyxcclxuICAgICAgICAgICAgc2NvcGU6IG51bGwsXHJcbiAgICAgICAgICAgIHN0YXRlOiBudWxsLFxyXG4gICAgICAgICAgICBhbHdheXNSZXF1aXJlTG9naW46IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29uZmlndXJlID0gKGNvbmZpZzogT0F1dGhDb25maWcpOiBPQXV0aENvbmZpZyA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT0F1dGhQcm92aWRlciBhbHJlYWR5IGNvbmZpZ3VyZWQuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZW1vdmUgdHJhaWxpbmcgc2xhc2ggZnJvbSB1cmxzLlxyXG4gICAgICAgIGlmIChjb25maWcubG9naW5Vcmwuc3Vic3RyKC0xKSA9PT0gJy8nKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5sb2dpblVybCA9IGNvbmZpZy5sb2dpblVybC5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY29uZmlnLmxvZ291dFVybC5zdWJzdHIoLTEpID09PSAnLycpIHtcclxuICAgICAgICAgICAgY29uZmlnLmxvZ291dFVybCA9IGNvbmZpZy5sb2dvdXRVcmwuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRXh0ZW5kIGRlZmF1bHQgY29uZmlndXJhdGlvbi5cclxuICAgICAgICB0aGlzLmNvbmZpZyA9IG9iamVjdEFzc2lnbih0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xyXG5cclxuICAgICAgICAvLyBSZWRpcmVjdCBpcyBzZXQgdG8gY3VycmVudCBsb2NhdGlvbiBieSBkZWZhdWx0XHJcbiAgICAgICAgY29uc3QgZXhpc3RpbmdIYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XHJcbiAgICAgICAgbGV0IHBhdGhEZWZhdWx0ID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBub3QgbmVlZGVkIHBhcnRzIGZyb20gdXJscy5cclxuICAgICAgICBpZiAoZXhpc3RpbmdIYXNoKSB7XHJcbiAgICAgICAgICAgIHBhdGhEZWZhdWx0ID0gcGF0aERlZmF1bHQucmVwbGFjZShleGlzdGluZ0hhc2gsICcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYXRoRGVmYXVsdC5zdWJzdHIoLTEpID09PSAnIycpIHtcclxuICAgICAgICAgICAgcGF0aERlZmF1bHQgPSBwYXRoRGVmYXVsdC5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZy5yZWRpcmVjdFVyaSA9IGNvbmZpZy5yZWRpcmVjdFVyaSB8fCBwYXRoRGVmYXVsdDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGlzQXV0aGVudGljYXRlZCA9ICgpOiBib29sZWFuID0+IHtcclxuICAgICAgICByZXR1cm4gPGFueT50aGlzLm9BdXRoVG9rZW5TZXJ2aWNlLmdldFRva2VuKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBsb2dpbiA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICBsZXQgcmVkaXJlY3RVcmwgPSBgJHt0aGlzLmNvbmZpZy5sb2dpblVybH0/YCArXHJcbiAgICAgICAgICAgIGByZXNwb25zZV90eXBlPSR7dGhpcy5vQXV0aFRva2VuU2VydmljZS5jb25maWcubmFtZX0mYCArXHJcbiAgICAgICAgICAgIGBjbGllbnRfaWQ9JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb25maWcuY2xpZW50SWQpfSZgICtcclxuICAgICAgICAgICAgYHJlZGlyZWN0X3VyaT0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbmZpZy5yZWRpcmVjdFVyaSl9JmAgK1xyXG4gICAgICAgICAgICBgbm9uY2U9JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5nZXRTaW1wbGVOb25jZVZhbHVlKCkpfWA7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5zY29wZSkge1xyXG4gICAgICAgICAgICByZWRpcmVjdFVybCArPSBgJnNjb3BlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY29uZmlnLnNjb3BlKX1gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnN0YXRlKSB7XHJcbiAgICAgICAgICAgIHJlZGlyZWN0VXJsICs9IGAmc3RhdGU9JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5jb25maWcuc3RhdGUpfWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlZGlyZWN0VXJsO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgbG9nb3V0ID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlZGlyZWN0VXJsID0gYCR7dGhpcy5jb25maWcubG9nb3V0VXJsfT9gICtcclxuICAgICAgICAgICAgYCR7dGhpcy5jb25maWcubG9nb3V0UmVkaXJlY3RQYXJhbWV0ZXJOYW1lfT0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNvbmZpZy5yZWRpcmVjdFVyaSl9YDtcclxuXHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZWRpcmVjdFVybDtcclxuICAgICAgICB0aGlzLm9BdXRoVG9rZW5TZXJ2aWNlLnJlbW92ZVRva2VuKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBsb2dpbk9uU3RhdGVDaGFuZ2UgPSAodG9TdGF0ZSk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgIGlmICh0b1N0YXRlICYmIHRoaXMuaXNMb2dpblJlcXVpcmVkKHRvU3RhdGUpICYmICF0aGlzLmlzQXV0aGVudGljYXRlZCgpICYmICF0aGlzLmdldFRva2VuRGF0YUZyb21VcmwoKSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5pc1N0b3JhZ2VTdXBwb3J0ZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghd2luZG93LmxvY2F0aW9uLmhhc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmwgPSB0aGlzLmdldEJhc2VSb3V0ZVVybCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2VydmljZS5zZXQ8c3RyaW5nPihPQVVUSF9TVEFSVFBBR0VfU1RPUkFHRV9LRVksIHVybCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMubG9naW4oKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgc2V0VG9rZW5PblJlZGlyZWN0ID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRva2VuRGF0YSA9IHRoaXMuZ2V0VG9rZW5EYXRhRnJvbVVybCgpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaXNBdXRoZW50aWNhdGVkKCkgJiYgdG9rZW5EYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMub0F1dGhUb2tlblNlcnZpY2Uuc2V0VG9rZW4odG9rZW5EYXRhKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UuaXNTdG9yYWdlU3VwcG9ydGVkKCkgJiYgdGhpcy5sb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldChPQVVUSF9TVEFSVFBBR0VfU1RPUkFHRV9LRVkpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydFBhZ2UgPSB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0PHN0cmluZz4oT0FVVEhfU1RBUlRQQUdFX1NUT1JBR0VfS0VZKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZVNlcnZpY2UucmVtb3ZlKE9BVVRIX1NUQVJUUEFHRV9TVE9SQUdFX0tFWSk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHN0YXJ0UGFnZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFJlZGlyZWN0IHRvIHRoZSBiYXNlIGFwcGxpY2F0aW9uIHJvdXRlXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuZ2V0QmFzZVJvdXRlVXJsKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnB1Ymxpc2goT0F1dGhTZXJ2aWNlLkxPR0lOX1NVQ0NFU1NfRVZFTlQsIHRva2VuRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGlzTG9naW5SZXF1aXJlZCA9IChzdGF0ZSk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHJvdXRlSGFzQ29uZmlnID0gc3RhdGUuc2V0dGluZ3MgJiYgc3RhdGUuc2V0dGluZ3MucmVxdWlyZUxvZ2luICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgICAgY29uc3Qgcm91dGVSZXF1aXJlc0xvZ2luID0gcm91dGVIYXNDb25maWcgJiYgc3RhdGUuc2V0dGluZ3MucmVxdWlyZUxvZ2luID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuICAgICAgICByZXR1cm4gcm91dGVIYXNDb25maWcgPyByb3V0ZVJlcXVpcmVzTG9naW4gOiB0aGlzLmNvbmZpZy5hbHdheXNSZXF1aXJlTG9naW47XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgZ2V0VG9rZW5EYXRhRnJvbVVybCA9ICgpOiBPQXV0aFRva2VuRGF0YSA9PiB7XHJcbiAgICAgICAgY29uc3QgaGFzaERhdGEgPSB0aGlzLnVybEhhc2hTZXJ2aWNlLmdldEhhc2hEYXRhKCk7XHJcbiAgICAgICAgY29uc3QgdG9rZW5EYXRhID0gdGhpcy5vQXV0aFRva2VuU2VydmljZS5jcmVhdGVUb2tlbihoYXNoRGF0YSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0b2tlbkRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgZ2V0QmFzZVJvdXRlVXJsID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnLyMvJztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFNpbXBsZU5vbmNlVmFsdWUgPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gKChEYXRlLm5vdygpICsgTWF0aC5yYW5kb20oKSkgKiBNYXRoLnJhbmRvbSgpKS50b1N0cmluZygpLnJlcGxhY2UoJy4nLCAnJyk7XHJcbiAgICB9XHJcbn0iXX0=
