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
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var jwt_token_service_1 = require("./jwt-token-service");
var oauth_polyfills_1 = require("./oauth-polyfills");
var OAuthTokenService = (function () {
    function OAuthTokenService(jwtTokenService) {
        var _this = this;
        this.jwtTokenService = jwtTokenService;
        this.configure = function (config) {
            if (config.urlTokenParameters) {
                config.urlTokenParameters = oauth_polyfills_1.objectAssign(_this.config.urlTokenParameters, config.urlTokenParameters);
            }
            _this.config = oauth_polyfills_1.objectAssign(_this.config, config);
            return config;
        };
        this.createToken = function (urlTokenData) {
            var token = urlTokenData[_this.config.urlTokenParameters.idToken];
            var tokenType = urlTokenData[_this.config.urlTokenParameters.tokenType] || 'Bearer';
            if (!token) {
                return null;
            }
            var claims = _this.jwtTokenService.getJwtClaims(token);
            var issuedTime = claims.nbf ? claims.nbf : claims.iat;
            var expirationTime = claims.exp - issuedTime;
            return {
                token: token,
                tokenType: tokenType,
                expiresAt: _this.getTimeNow() + expirationTime,
                jwtClaims: claims
            };
        };
        this.setToken = function (data) {
            return _this.tokenData = data;
        };
        this.getToken = function () {
            return _this.tokenData;
        };
        this.getIdToken = function () {
            return _this.getToken() ? _this.getToken().token : undefined;
        };
        this.getAuthorizationHeader = function () {
            if (!(_this.getTokenType() && _this.getIdToken())) {
                return '';
            }
            var tokenType = _this.getTokenType().charAt(0).toUpperCase() + _this.getTokenType().substr(1);
            return tokenType + " " + _this.getIdToken();
        };
        this.getTokenType = function () {
            return _this.getToken() ? _this.getToken().tokenType : undefined;
        };
        this.removeToken = function () {
            return _this.tokenData = null;
        };
        this.isTokenValid = function () {
            var token = _this.getToken();
            if (!token) {
                return false;
            }
            var timeNow = _this.getTimeNow();
            var expiresAt = token.expiresAt;
            var isValid = (expiresAt && (expiresAt > timeNow + _this.config.expireOffsetSeconds));
            return isValid;
        };
        this.getTimeNow = function () {
            return Math.round(new Date().getTime() / 1000.0);
        };
        this.config = {
            name: 'id_token',
            urlTokenParameters: {
                idToken: 'id_token',
                tokenType: 'token_type'
            },
            expireOffsetSeconds: 120
        };
    }
    return OAuthTokenService;
}());
OAuthTokenService = __decorate([
    aurelia_dependency_injection_1.autoinject(),
    __metadata("design:paramtypes", [jwt_token_service_1.default])
], OAuthTokenService);
exports.OAuthTokenService = OAuthTokenService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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OENBQWlCIiwiZmlsZSI6Im9hdXRoLXRva2VuLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSAnYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvbic7XHJcblxyXG5pbXBvcnQgSnd0VG9rZW5TZXJ2aWNlLCB7IEp3dENsYWltcyB9IGZyb20gJy4vand0LXRva2VuLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBvYmplY3RBc3NpZ24gfSBmcm9tICcuL29hdXRoLXBvbHlmaWxscyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE9BdXRoVG9rZW5Db25maWcge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgdXJsVG9rZW5QYXJhbWV0ZXJzPzoge1xyXG4gICAgICAgIGlkVG9rZW46IHN0cmluZztcclxuICAgICAgICB0b2tlblR5cGU/OiBzdHJpbmc7XHJcbiAgICB9O1xyXG4gICAgZXhwaXJlT2Zmc2V0U2Vjb25kcz86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBPQXV0aFRva2VuRGF0YSB7XHJcbiAgICB0b2tlbjogc3RyaW5nO1xyXG4gICAgdG9rZW5UeXBlOiBzdHJpbmc7XHJcbiAgICBleHBpcmVzQXQ6IG51bWJlcjtcclxuICAgIGp3dENsYWltcz86IEp3dENsYWltcztcclxufVxyXG5cclxuQGF1dG9pbmplY3QoKVxyXG5leHBvcnQgY2xhc3MgT0F1dGhUb2tlblNlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBjb25maWc6IE9BdXRoVG9rZW5Db25maWc7XHJcblxyXG4gICAgcHJpdmF0ZSB0b2tlbkRhdGE6IE9BdXRoVG9rZW5EYXRhO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgand0VG9rZW5TZXJ2aWNlOiBKd3RUb2tlblNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHtcclxuICAgICAgICAgICAgbmFtZTogJ2lkX3Rva2VuJyxcclxuICAgICAgICAgICAgdXJsVG9rZW5QYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBpZFRva2VuOiAnaWRfdG9rZW4nLFxyXG4gICAgICAgICAgICAgICAgdG9rZW5UeXBlOiAndG9rZW5fdHlwZSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXhwaXJlT2Zmc2V0U2Vjb25kczogMTIwXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29uZmlndXJlID0gKGNvbmZpZzogT0F1dGhUb2tlbkNvbmZpZyk6IE9BdXRoVG9rZW5Db25maWcgPT4ge1xyXG5cclxuICAgICAgICAvLyBFeHRlbmQgZGVmYXVsdCBjb25maWdyYXRpb24gd2l0aCBzdXBwbGllZCBjb25maWcgZGF0YVxyXG4gICAgICAgIGlmIChjb25maWcudXJsVG9rZW5QYXJhbWV0ZXJzKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy51cmxUb2tlblBhcmFtZXRlcnMgPSBvYmplY3RBc3NpZ24odGhpcy5jb25maWcudXJsVG9rZW5QYXJhbWV0ZXJzLCBjb25maWcudXJsVG9rZW5QYXJhbWV0ZXJzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlnID0gb2JqZWN0QXNzaWduKHRoaXMuY29uZmlnLCBjb25maWcpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlVG9rZW4gPSAodXJsVG9rZW5EYXRhOiBhbnkpOiBPQXV0aFRva2VuRGF0YSA9PiB7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSB1cmxUb2tlbkRhdGFbdGhpcy5jb25maWcudXJsVG9rZW5QYXJhbWV0ZXJzLmlkVG9rZW5dO1xyXG4gICAgICAgIGNvbnN0IHRva2VuVHlwZSA9IHVybFRva2VuRGF0YVt0aGlzLmNvbmZpZy51cmxUb2tlblBhcmFtZXRlcnMudG9rZW5UeXBlXSB8fCAnQmVhcmVyJztcclxuXHJcbiAgICAgICAgaWYgKCF0b2tlbikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNsYWltczogSnd0Q2xhaW1zID0gdGhpcy5qd3RUb2tlblNlcnZpY2UuZ2V0Snd0Q2xhaW1zKHRva2VuKTtcclxuICAgICAgICBjb25zdCBpc3N1ZWRUaW1lID0gY2xhaW1zLm5iZiA/IGNsYWltcy5uYmYgOiBjbGFpbXMuaWF0O1xyXG4gICAgICAgIGNvbnN0IGV4cGlyYXRpb25UaW1lID0gY2xhaW1zLmV4cCAtIGlzc3VlZFRpbWU7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRva2VuOiB0b2tlbixcclxuICAgICAgICAgICAgdG9rZW5UeXBlOiB0b2tlblR5cGUsXHJcbiAgICAgICAgICAgIGV4cGlyZXNBdDogdGhpcy5nZXRUaW1lTm93KCkgKyBleHBpcmF0aW9uVGltZSxcclxuICAgICAgICAgICAgand0Q2xhaW1zOiBjbGFpbXNcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgc2V0VG9rZW4gPSAoZGF0YTogT0F1dGhUb2tlbkRhdGEpOiBPQXV0aFRva2VuRGF0YSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5EYXRhID0gZGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGdldFRva2VuID0gKCk6IE9BdXRoVG9rZW5EYXRhID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2tlbkRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBnZXRJZFRva2VuID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW4oKSA/IHRoaXMuZ2V0VG9rZW4oKS50b2tlbiA6IHVuZGVmaW5lZDtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGdldEF1dGhvcml6YXRpb25IZWFkZXIgPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICBpZiAoISh0aGlzLmdldFRva2VuVHlwZSgpICYmIHRoaXMuZ2V0SWRUb2tlbigpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0b2tlblR5cGUgPSB0aGlzLmdldFRva2VuVHlwZSgpLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGhpcy5nZXRUb2tlblR5cGUoKS5zdWJzdHIoMSk7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHt0b2tlblR5cGV9ICR7dGhpcy5nZXRJZFRva2VuKCl9YDtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGdldFRva2VuVHlwZSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFRva2VuKCkgPyB0aGlzLmdldFRva2VuKCkudG9rZW5UeXBlIDogdW5kZWZpbmVkO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlVG9rZW4gPSAoKTogT0F1dGhUb2tlbkRhdGEgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRva2VuRGF0YSA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBpc1Rva2VuVmFsaWQgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLmdldFRva2VuKCk7XHJcblxyXG4gICAgICAgIGlmICghdG9rZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdGltZU5vdyA9IHRoaXMuZ2V0VGltZU5vdygpO1xyXG4gICAgICAgIGNvbnN0IGV4cGlyZXNBdCA9IHRva2VuLmV4cGlyZXNBdDtcclxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gKGV4cGlyZXNBdCAmJiAoZXhwaXJlc0F0ID4gdGltZU5vdyArIHRoaXMuY29uZmlnLmV4cGlyZU9mZnNldFNlY29uZHMpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlzVmFsaWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgZ2V0VGltZU5vdyA9ICgpOiBudW1iZXIgPT4ge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMC4wKTtcclxuICAgIH07XHJcbn0iXX0=
