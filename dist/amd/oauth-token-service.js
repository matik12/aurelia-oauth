var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-dependency-injection", "./jwt-token-service", "./oauth-polyfills"], function (require, exports, aurelia_dependency_injection_1, jwt_token_service_1, oauth_polyfills_1) {
    "use strict";
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
            this.getTokenExpirationTime = function () {
                var tokenRenewalOffsetSeconds = 30;
                var expireOffset = _this.config.expireOffsetSeconds + tokenRenewalOffsetSeconds;
                return (_this.tokenData.expiresAt - _this.getTimeNow() - expireOffset);
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
                expireOffsetSeconds: 60
            };
        }
        return OAuthTokenService;
    }());
    OAuthTokenService = __decorate([
        aurelia_dependency_injection_1.autoinject(),
        __metadata("design:paramtypes", [jwt_token_service_1.default])
    ], OAuthTokenService);
    exports.OAuthTokenService = OAuthTokenService;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9vYXV0aC10b2tlbi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBc0JBLElBQWEsaUJBQWlCO1FBTTFCLDJCQUFvQixlQUFnQztZQUFwRCxpQkFTQztZQVRtQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7WUFXN0MsY0FBUyxHQUFHLFVBQUMsTUFBd0I7Z0JBR3hDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7b0JBQzVCLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyw4QkFBWSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ3hHLENBQUM7Z0JBRUQsS0FBSSxDQUFDLE1BQU0sR0FBRyw4QkFBWSxDQUFDLEtBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBRWhELE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDbEIsQ0FBQyxDQUFDO1lBRUssZ0JBQVcsR0FBRyxVQUFDLFlBQWlCO2dCQUNuQyxJQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbkUsSUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLElBQUksUUFBUSxDQUFDO2dCQUVyRixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDaEIsQ0FBQztnQkFFRCxJQUFNLE1BQU0sR0FBYyxLQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkUsSUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENB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LEVBQUUsVUFBVTtnQkFDaEIsa0JBQWtCLEVBQUU7b0JBQ2hCLE9BQU8sRUFBRSxVQUFVO29CQUNuQixTQUFTLEVBQUUsWUFBWTtpQkFDMUI7Z0JBQ0QsbUJBQW1CLEVBQUUsRUFBRTthQUMxQixDQUFDO1FBQ04sQ0FBQztRQXdGTCx3QkFBQztJQUFELENBdkdBLEFBdUdDLElBQUE7SUF2R1ksaUJBQWlCO1FBRDdCLHlDQUFVLEVBQUU7eUNBTzRCLDJCQUFlO09BTjNDLGlCQUFpQixDQXVHN0I7SUF2R1ksOENBQWlCIiwiZmlsZSI6Im9hdXRoLXRva2VuLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSAnYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvbic7XHJcblxyXG5pbXBvcnQgSnd0VG9rZW5TZXJ2aWNlLCB7IEp3dENsYWltcyB9IGZyb20gJy4vand0LXRva2VuLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBvYmplY3RBc3NpZ24gfSBmcm9tICcuL29hdXRoLXBvbHlmaWxscyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE9BdXRoVG9rZW5Db25maWcge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgdXJsVG9rZW5QYXJhbWV0ZXJzPzoge1xyXG4gICAgICAgIGlkVG9rZW46IHN0cmluZztcclxuICAgICAgICB0b2tlblR5cGU/OiBzdHJpbmc7XHJcbiAgICB9O1xyXG4gICAgZXhwaXJlT2Zmc2V0U2Vjb25kcz86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBPQXV0aFRva2VuRGF0YSB7XHJcbiAgICB0b2tlbjogc3RyaW5nO1xyXG4gICAgdG9rZW5UeXBlOiBzdHJpbmc7XHJcbiAgICBleHBpcmVzQXQ6IG51bWJlcjtcclxuICAgIGp3dENsYWltcz86IEp3dENsYWltcztcclxufVxyXG5cclxuQGF1dG9pbmplY3QoKVxyXG5leHBvcnQgY2xhc3MgT0F1dGhUb2tlblNlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBjb25maWc6IE9BdXRoVG9rZW5Db25maWc7XHJcblxyXG4gICAgcHJpdmF0ZSB0b2tlbkRhdGE6IE9BdXRoVG9rZW5EYXRhO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgand0VG9rZW5TZXJ2aWNlOiBKd3RUb2tlblNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHtcclxuICAgICAgICAgICAgbmFtZTogJ2lkX3Rva2VuJyxcclxuICAgICAgICAgICAgdXJsVG9rZW5QYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBpZFRva2VuOiAnaWRfdG9rZW4nLFxyXG4gICAgICAgICAgICAgICAgdG9rZW5UeXBlOiAndG9rZW5fdHlwZSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXhwaXJlT2Zmc2V0U2Vjb25kczogNjBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb25maWd1cmUgPSAoY29uZmlnOiBPQXV0aFRva2VuQ29uZmlnKTogT0F1dGhUb2tlbkNvbmZpZyA9PiB7XHJcblxyXG4gICAgICAgIC8vIEV4dGVuZCBkZWZhdWx0IGNvbmZpZ3JhdGlvbiB3aXRoIHN1cHBsaWVkIGNvbmZpZyBkYXRhXHJcbiAgICAgICAgaWYgKGNvbmZpZy51cmxUb2tlblBhcmFtZXRlcnMpIHtcclxuICAgICAgICAgICAgY29uZmlnLnVybFRva2VuUGFyYW1ldGVycyA9IG9iamVjdEFzc2lnbih0aGlzLmNvbmZpZy51cmxUb2tlblBhcmFtZXRlcnMsIGNvbmZpZy51cmxUb2tlblBhcmFtZXRlcnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBvYmplY3RBc3NpZ24odGhpcy5jb25maWcsIGNvbmZpZyk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVUb2tlbiA9ICh1cmxUb2tlbkRhdGE6IGFueSk6IE9BdXRoVG9rZW5EYXRhID0+IHtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IHVybFRva2VuRGF0YVt0aGlzLmNvbmZpZy51cmxUb2tlblBhcmFtZXRlcnMuaWRUb2tlbl07XHJcbiAgICAgICAgY29uc3QgdG9rZW5UeXBlID0gdXJsVG9rZW5EYXRhW3RoaXMuY29uZmlnLnVybFRva2VuUGFyYW1ldGVycy50b2tlblR5cGVdIHx8ICdCZWFyZXInO1xyXG5cclxuICAgICAgICBpZiAoIXRva2VuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY2xhaW1zOiBKd3RDbGFpbXMgPSB0aGlzLmp3dFRva2VuU2VydmljZS5nZXRKd3RDbGFpbXModG9rZW4pO1xyXG4gICAgICAgIGNvbnN0IGlzc3VlZFRpbWUgPSBjbGFpbXMubmJmID8gY2xhaW1zLm5iZiA6IGNsYWltcy5pYXQ7XHJcbiAgICAgICAgY29uc3QgZXhwaXJhdGlvblRpbWUgPSBjbGFpbXMuZXhwIC0gaXNzdWVkVGltZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9rZW46IHRva2VuLFxyXG4gICAgICAgICAgICB0b2tlblR5cGU6IHRva2VuVHlwZSxcclxuICAgICAgICAgICAgZXhwaXJlc0F0OiB0aGlzLmdldFRpbWVOb3coKSArIGV4cGlyYXRpb25UaW1lLFxyXG4gICAgICAgICAgICBqd3RDbGFpbXM6IGNsYWltc1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBzZXRUb2tlbiA9IChkYXRhOiBPQXV0aFRva2VuRGF0YSk6IE9BdXRoVG9rZW5EYXRhID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2tlbkRhdGEgPSBkYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0VG9rZW4gPSAoKTogT0F1dGhUb2tlbkRhdGEgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRva2VuRGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGdldElkVG9rZW4gPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRUb2tlbigpID8gdGhpcy5nZXRUb2tlbigpLnRva2VuIDogdW5kZWZpbmVkO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0QXV0aG9yaXphdGlvbkhlYWRlciA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIGlmICghKHRoaXMuZ2V0VG9rZW5UeXBlKCkgJiYgdGhpcy5nZXRJZFRva2VuKCkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRva2VuVHlwZSA9IHRoaXMuZ2V0VG9rZW5UeXBlKCkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0aGlzLmdldFRva2VuVHlwZSgpLnN1YnN0cigxKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke3Rva2VuVHlwZX0gJHt0aGlzLmdldElkVG9rZW4oKX1gO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0VG9rZW5UeXBlID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW4oKSA/IHRoaXMuZ2V0VG9rZW4oKS50b2tlblR5cGUgOiB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBnZXRUb2tlbkV4cGlyYXRpb25UaW1lID0gKCk6IG51bWJlciA9PiB7XHJcbiAgICAgICAgY29uc3QgdG9rZW5SZW5ld2FsT2Zmc2V0U2Vjb25kcyA9IDMwO1xyXG4gICAgICAgIGNvbnN0IGV4cGlyZU9mZnNldCA9IHRoaXMuY29uZmlnLmV4cGlyZU9mZnNldFNlY29uZHMgKyB0b2tlblJlbmV3YWxPZmZzZXRTZWNvbmRzO1xyXG5cclxuICAgICAgICByZXR1cm4gKHRoaXMudG9rZW5EYXRhLmV4cGlyZXNBdCAtIHRoaXMuZ2V0VGltZU5vdygpIC0gZXhwaXJlT2Zmc2V0KTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIHJlbW92ZVRva2VuID0gKCk6IE9BdXRoVG9rZW5EYXRhID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2tlbkRhdGEgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgaXNUb2tlblZhbGlkID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gdGhpcy5nZXRUb2tlbigpO1xyXG5cclxuICAgICAgICBpZiAoIXRva2VuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRpbWVOb3cgPSB0aGlzLmdldFRpbWVOb3coKTtcclxuICAgICAgICBjb25zdCBleHBpcmVzQXQgPSB0b2tlbi5leHBpcmVzQXQ7XHJcbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IChleHBpcmVzQXQgJiYgKGV4cGlyZXNBdCA+IHRpbWVOb3cgKyB0aGlzLmNvbmZpZy5leHBpcmVPZmZzZXRTZWNvbmRzKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpc1ZhbGlkO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGdldFRpbWVOb3cgPSAoKTogbnVtYmVyID0+IHtcclxuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDAuMCk7XHJcbiAgICB9O1xyXG59Il19
