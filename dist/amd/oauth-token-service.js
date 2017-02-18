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
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9hdXRoLXRva2VuLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFzQkEsSUFBYSxpQkFBaUI7UUFNMUIsMkJBQW9CLGVBQWdDO1lBQXBELGlCQVNDO1lBVG1CLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtZQVc3QyxjQUFTLEdBQUcsVUFBQyxNQUF3QjtnQkFHeEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztvQkFDNUIsTUFBTSxDQUFDLGtCQUFrQixHQUFHLDhCQUFZLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDeEcsQ0FBQztnQkFFRCxLQUFJLENBQUMsTUFBTSxHQUFHLDhCQUFZLENBQUMsS0FBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFFaEQsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNsQixDQUFDLENBQUM7WUFFSyxnQkFBVyxHQUFHLFVBQUMsWUFBaUI7Z0JBQ25DLElBQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNuRSxJQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxRQUFRLENBQUM7Z0JBRXJGLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDVCxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELElBQU0sTUFBTSxHQUFjLEtBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuRSxJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQkFD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aUIiLCJmaWxlIjoib2F1dGgtdG9rZW4tc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tICdhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uJztcclxuXHJcbmltcG9ydCBKd3RUb2tlblNlcnZpY2UsIHsgSnd0Q2xhaW1zIH0gZnJvbSAnLi9qd3QtdG9rZW4tc2VydmljZSc7XHJcbmltcG9ydCB7IG9iamVjdEFzc2lnbiB9IGZyb20gJy4vb2F1dGgtcG9seWZpbGxzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgT0F1dGhUb2tlbkNvbmZpZyB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICB1cmxUb2tlblBhcmFtZXRlcnM/OiB7XHJcbiAgICAgICAgaWRUb2tlbjogc3RyaW5nO1xyXG4gICAgICAgIHRva2VuVHlwZT86IHN0cmluZztcclxuICAgIH07XHJcbiAgICBleHBpcmVPZmZzZXRTZWNvbmRzPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE9BdXRoVG9rZW5EYXRhIHtcclxuICAgIHRva2VuOiBzdHJpbmc7XHJcbiAgICB0b2tlblR5cGU6IHN0cmluZztcclxuICAgIGV4cGlyZXNBdDogbnVtYmVyO1xyXG4gICAgand0Q2xhaW1zPzogSnd0Q2xhaW1zO1xyXG59XHJcblxyXG5AYXV0b2luamVjdCgpXHJcbmV4cG9ydCBjbGFzcyBPQXV0aFRva2VuU2VydmljZSB7XHJcblxyXG4gICAgcHVibGljIGNvbmZpZzogT0F1dGhUb2tlbkNvbmZpZztcclxuXHJcbiAgICBwcml2YXRlIHRva2VuRGF0YTogT0F1dGhUb2tlbkRhdGE7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBqd3RUb2tlblNlcnZpY2U6IEp3dFRva2VuU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0ge1xyXG4gICAgICAgICAgICBuYW1lOiAnaWRfdG9rZW4nLFxyXG4gICAgICAgICAgICB1cmxUb2tlblBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgICAgIGlkVG9rZW46ICdpZF90b2tlbicsXHJcbiAgICAgICAgICAgICAgICB0b2tlblR5cGU6ICd0b2tlbl90eXBlJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBleHBpcmVPZmZzZXRTZWNvbmRzOiAxMjBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb25maWd1cmUgPSAoY29uZmlnOiBPQXV0aFRva2VuQ29uZmlnKTogT0F1dGhUb2tlbkNvbmZpZyA9PiB7XHJcblxyXG4gICAgICAgIC8vIEV4dGVuZCBkZWZhdWx0IGNvbmZpZ3JhdGlvbiB3aXRoIHN1cHBsaWVkIGNvbmZpZyBkYXRhXHJcbiAgICAgICAgaWYgKGNvbmZpZy51cmxUb2tlblBhcmFtZXRlcnMpIHtcclxuICAgICAgICAgICAgY29uZmlnLnVybFRva2VuUGFyYW1ldGVycyA9IG9iamVjdEFzc2lnbih0aGlzLmNvbmZpZy51cmxUb2tlblBhcmFtZXRlcnMsIGNvbmZpZy51cmxUb2tlblBhcmFtZXRlcnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBvYmplY3RBc3NpZ24odGhpcy5jb25maWcsIGNvbmZpZyk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVUb2tlbiA9ICh1cmxUb2tlbkRhdGE6IGFueSk6IE9BdXRoVG9rZW5EYXRhID0+IHtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IHVybFRva2VuRGF0YVt0aGlzLmNvbmZpZy51cmxUb2tlblBhcmFtZXRlcnMuaWRUb2tlbl07XHJcbiAgICAgICAgY29uc3QgdG9rZW5UeXBlID0gdXJsVG9rZW5EYXRhW3RoaXMuY29uZmlnLnVybFRva2VuUGFyYW1ldGVycy50b2tlblR5cGVdIHx8ICdCZWFyZXInO1xyXG5cclxuICAgICAgICBpZiAoIXRva2VuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY2xhaW1zOiBKd3RDbGFpbXMgPSB0aGlzLmp3dFRva2VuU2VydmljZS5nZXRKd3RDbGFpbXModG9rZW4pO1xyXG4gICAgICAgIGNvbnN0IGlzc3VlZFRpbWUgPSBjbGFpbXMubmJmID8gY2xhaW1zLm5iZiA6IGNsYWltcy5pYXQ7XHJcbiAgICAgICAgY29uc3QgZXhwaXJhdGlvblRpbWUgPSBjbGFpbXMuZXhwIC0gaXNzdWVkVGltZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9rZW46IHRva2VuLFxyXG4gICAgICAgICAgICB0b2tlblR5cGU6IHRva2VuVHlwZSxcclxuICAgICAgICAgICAgZXhwaXJlc0F0OiB0aGlzLmdldFRpbWVOb3coKSArIGV4cGlyYXRpb25UaW1lLFxyXG4gICAgICAgICAgICBqd3RDbGFpbXM6IGNsYWltc1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBzZXRUb2tlbiA9IChkYXRhOiBPQXV0aFRva2VuRGF0YSk6IE9BdXRoVG9rZW5EYXRhID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2tlbkRhdGEgPSBkYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0VG9rZW4gPSAoKTogT0F1dGhUb2tlbkRhdGEgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRva2VuRGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGdldElkVG9rZW4gPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRUb2tlbigpID8gdGhpcy5nZXRUb2tlbigpLnRva2VuIDogdW5kZWZpbmVkO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0QXV0aG9yaXphdGlvbkhlYWRlciA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIGlmICghKHRoaXMuZ2V0VG9rZW5UeXBlKCkgJiYgdGhpcy5nZXRJZFRva2VuKCkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRva2VuVHlwZSA9IHRoaXMuZ2V0VG9rZW5UeXBlKCkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0aGlzLmdldFRva2VuVHlwZSgpLnN1YnN0cigxKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke3Rva2VuVHlwZX0gJHt0aGlzLmdldElkVG9rZW4oKX1gO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0VG9rZW5UeXBlID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW4oKSA/IHRoaXMuZ2V0VG9rZW4oKS50b2tlblR5cGUgOiB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyByZW1vdmVUb2tlbiA9ICgpOiBPQXV0aFRva2VuRGF0YSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5EYXRhID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGlzVG9rZW5WYWxpZCA9ICgpOiBib29sZWFuID0+IHtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IHRoaXMuZ2V0VG9rZW4oKTtcclxuXHJcbiAgICAgICAgaWYgKCF0b2tlbikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0aW1lTm93ID0gdGhpcy5nZXRUaW1lTm93KCk7XHJcbiAgICAgICAgY29uc3QgZXhwaXJlc0F0ID0gdG9rZW4uZXhwaXJlc0F0O1xyXG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSAoZXhwaXJlc0F0ICYmIChleHBpcmVzQXQgPiB0aW1lTm93ICsgdGhpcy5jb25maWcuZXhwaXJlT2Zmc2V0U2Vjb25kcykpO1xyXG5cclxuICAgICAgICByZXR1cm4gaXNWYWxpZDtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRUaW1lTm93ID0gKCk6IG51bWJlciA9PiB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwLjApO1xyXG4gICAgfTtcclxufSJdfQ==
