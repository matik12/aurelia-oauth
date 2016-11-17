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
var aurelia_dependency_injection_1 = require('aurelia-dependency-injection');
var jwt_token_service_1 = require('./jwt-token-service');
var oauth_polyfills_1 = require('./oauth-polyfills');
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
    OAuthTokenService = __decorate([
        aurelia_dependency_injection_1.autoinject(), 
        __metadata('design:paramtypes', [jwt_token_service_1.default])
    ], OAuthTokenService);
    return OAuthTokenService;
}());
exports.OAuthTokenService = OAuthTokenService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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L0ZZLHlCQUFpQixvQkErRjdCLENBQUEiLCJmaWxlIjoib2F1dGgtdG9rZW4tc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tICdhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uJztcclxuXHJcbmltcG9ydCBKd3RUb2tlblNlcnZpY2UgZnJvbSAnLi9qd3QtdG9rZW4tc2VydmljZSc7XHJcbmltcG9ydCB7IG9iamVjdEFzc2lnbiB9IGZyb20gJy4vb2F1dGgtcG9seWZpbGxzJztcclxuXHJcbkBhdXRvaW5qZWN0KClcclxuZXhwb3J0IGNsYXNzIE9BdXRoVG9rZW5TZXJ2aWNlIGltcGxlbWVudHMgSU9BdXRoVG9rZW5TZXJ2aWNlIHtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSB0b2tlbkRhdGE6IElPQXV0aFRva2VuRGF0YTtcclxuICAgIHB1YmxpYyBjb25maWc6IElPQXV0aFRva2VuQ29uZmlnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgand0VG9rZW5TZXJ2aWNlOiBKd3RUb2tlblNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHtcclxuICAgICAgICAgICAgbmFtZTogJ2lkX3Rva2VuJyxcclxuICAgICAgICAgICAgdXJsVG9rZW5QYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBpZFRva2VuOiAnaWRfdG9rZW4nLFxyXG4gICAgICAgICAgICAgICAgdG9rZW5UeXBlOiAndG9rZW5fdHlwZSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXhwaXJlT2Zmc2V0U2Vjb25kczogMTIwXHJcbiAgICAgICAgfTtcclxuICAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbmZpZ3VyZSA9IChjb25maWc6IElPQXV0aFRva2VuQ29uZmlnKTogSU9BdXRoVG9rZW5Db25maWcgPT4ge1xyXG5cclxuICAgICAgICAvLyBFeHRlbmQgZGVmYXVsdCBjb25maWdyYXRpb24gd2l0aCBzdXBwbGllZCBjb25maWcgZGF0YVxyXG4gICAgICAgIGlmIChjb25maWcudXJsVG9rZW5QYXJhbWV0ZXJzKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy51cmxUb2tlblBhcmFtZXRlcnMgPSBvYmplY3RBc3NpZ24odGhpcy5jb25maWcudXJsVG9rZW5QYXJhbWV0ZXJzLCBjb25maWcudXJsVG9rZW5QYXJhbWV0ZXJzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBvYmplY3RBc3NpZ24odGhpcy5jb25maWcsIGNvbmZpZyk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVUb2tlbiA9ICh1cmxUb2tlbkRhdGE6IGFueSk6IElPQXV0aFRva2VuRGF0YSA9PiB7XHJcbiAgICAgICAgdmFyIHRva2VuID0gdXJsVG9rZW5EYXRhW3RoaXMuY29uZmlnLnVybFRva2VuUGFyYW1ldGVycy5pZFRva2VuXTtcclxuICAgICAgICB2YXIgdG9rZW5UeXBlID0gdXJsVG9rZW5EYXRhW3RoaXMuY29uZmlnLnVybFRva2VuUGFyYW1ldGVycy50b2tlblR5cGVdIHx8ICdCZWFyZXInO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghdG9rZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgY2xhaW1zOiBJSnd0Q2xhaW1zID0gdGhpcy5qd3RUb2tlblNlcnZpY2UuZ2V0Snd0Q2xhaW1zKHRva2VuKTtcclxuICAgICAgICB2YXIgaXNzdWVkVGltZSA9IGNsYWltcy5uYmYgPyBjbGFpbXMubmJmIDogY2xhaW1zLmlhdDtcclxuICAgICAgICB2YXIgZXhwaXJhdGlvblRpbWUgPSBjbGFpbXMuZXhwIC0gaXNzdWVkVGltZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9rZW46IHRva2VuLFxyXG4gICAgICAgICAgICB0b2tlblR5cGU6IHRva2VuVHlwZSxcclxuICAgICAgICAgICAgZXhwaXJlc0F0OiB0aGlzLmdldFRpbWVOb3coKSArIGV4cGlyYXRpb25UaW1lLFxyXG4gICAgICAgICAgICBqd3RDbGFpbXM6IGNsYWltc1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBzZXRUb2tlbiA9IChkYXRhOiBJT0F1dGhUb2tlbkRhdGEpOiBJT0F1dGhUb2tlbkRhdGEgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRva2VuRGF0YSA9IGRhdGE7XHJcbiAgICB9OyAgICBcclxuICAgIFxyXG4gICAgcHVibGljIGdldFRva2VuID0gKCk6IElPQXV0aFRva2VuRGF0YSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5EYXRhO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgcHVibGljIGdldElkVG9rZW4gPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRUb2tlbigpID8gdGhpcy5nZXRUb2tlbigpLnRva2VuIDogdW5kZWZpbmVkO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgcHVibGljIGdldEF1dGhvcml6YXRpb25IZWFkZXIgPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICBpZiAoISh0aGlzLmdldFRva2VuVHlwZSgpICYmIHRoaXMuZ2V0SWRUb2tlbigpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgdG9rZW5UeXBlID0gdGhpcy5nZXRUb2tlblR5cGUoKS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRoaXMuZ2V0VG9rZW5UeXBlKCkuc3Vic3RyKDEpO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7dG9rZW5UeXBlfSAke3RoaXMuZ2V0SWRUb2tlbigpfWA7XHJcbiAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgIHB1YmxpYyBnZXRUb2tlblR5cGUgPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRUb2tlbigpID8gdGhpcy5nZXRUb2tlbigpLnRva2VuVHlwZSA6IHVuZGVmaW5lZDtcclxuICAgIH07XHJcbiAgICBcclxuICAgIHB1YmxpYyByZW1vdmVUb2tlbiA9ICgpOiBJT0F1dGhUb2tlbkRhdGEgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRva2VuRGF0YSA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBpc1Rva2VuVmFsaWQgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgICAgICAgdmFyIHRva2VuID0gdGhpcy5nZXRUb2tlbigpO1xyXG5cclxuICAgICAgICBpZiAoIXRva2VuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciB0aW1lTm93ID0gdGhpcy5nZXRUaW1lTm93KCk7XHJcbiAgICAgICAgdmFyIGV4cGlyZXNBdCA9IHRva2VuLmV4cGlyZXNBdDtcclxuICAgICAgICB2YXIgaXNWYWxpZCA9IChleHBpcmVzQXQgJiYgKGV4cGlyZXNBdCA+IHRpbWVOb3cgKyB0aGlzLmNvbmZpZy5leHBpcmVPZmZzZXRTZWNvbmRzKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpc1ZhbGlkO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGdldFRpbWVOb3cgPSAoKTogbnVtYmVyID0+IHtcclxuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDAuMCk7XHJcbiAgICB9OyAgICAgIFxyXG59Il19
