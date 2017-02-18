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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9vYXV0aC10b2tlbi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2RUFBMEQ7QUFFMUQseURBQWlFO0FBQ2pFLHFEQUFpRDtBQW1CakQsSUFBYSxpQkFBaUI7SUFNMUIsMkJBQW9CLGVBQWdDO1FBQXBELGlCQVNDO1FBVG1CLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQVc3QyxjQUFTLEdBQUcsVUFBQyxNQUF3QjtZQUd4QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixNQUFNLENBQUMsa0JBQWtCLEdBQUcsOEJBQVksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3hHLENBQUM7WUFFRCxLQUFJLENBQUMsTUFBTSxHQUFHLDhCQUFZLENBQUMsS0FBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUVoRCxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUMsQ0FBQztRQUVLLGdCQUFXLEdBQUcsVUFBQyxZQUFpQjtZQUNuQyxJQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNuRSxJQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxRQUFRLENBQUM7WUFFckYsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNULE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDaEIsQ0FBQztZQUVELElBQU0sTUFBTSxHQUFjLEtBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25FLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFD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O0FBaEdZLDhDQUFpQiIsImZpbGUiOiJvYXV0aC10b2tlbi1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gJ2F1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb24nO1xyXG5cclxuaW1wb3J0IEp3dFRva2VuU2VydmljZSwgeyBKd3RDbGFpbXMgfSBmcm9tICcuL2p3dC10b2tlbi1zZXJ2aWNlJztcclxuaW1wb3J0IHsgb2JqZWN0QXNzaWduIH0gZnJvbSAnLi9vYXV0aC1wb2x5ZmlsbHMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBPQXV0aFRva2VuQ29uZmlnIHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHVybFRva2VuUGFyYW1ldGVycz86IHtcclxuICAgICAgICBpZFRva2VuOiBzdHJpbmc7XHJcbiAgICAgICAgdG9rZW5UeXBlPzogc3RyaW5nO1xyXG4gICAgfTtcclxuICAgIGV4cGlyZU9mZnNldFNlY29uZHM/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgT0F1dGhUb2tlbkRhdGEge1xyXG4gICAgdG9rZW46IHN0cmluZztcclxuICAgIHRva2VuVHlwZTogc3RyaW5nO1xyXG4gICAgZXhwaXJlc0F0OiBudW1iZXI7XHJcbiAgICBqd3RDbGFpbXM/OiBKd3RDbGFpbXM7XHJcbn1cclxuXHJcbkBhdXRvaW5qZWN0KClcclxuZXhwb3J0IGNsYXNzIE9BdXRoVG9rZW5TZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgY29uZmlnOiBPQXV0aFRva2VuQ29uZmlnO1xyXG5cclxuICAgIHByaXZhdGUgdG9rZW5EYXRhOiBPQXV0aFRva2VuRGF0YTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGp3dFRva2VuU2VydmljZTogSnd0VG9rZW5TZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdpZF90b2tlbicsXHJcbiAgICAgICAgICAgIHVybFRva2VuUGFyYW1ldGVyczoge1xyXG4gICAgICAgICAgICAgICAgaWRUb2tlbjogJ2lkX3Rva2VuJyxcclxuICAgICAgICAgICAgICAgIHRva2VuVHlwZTogJ3Rva2VuX3R5cGUnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGV4cGlyZU9mZnNldFNlY29uZHM6IDEyMFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbmZpZ3VyZSA9IChjb25maWc6IE9BdXRoVG9rZW5Db25maWcpOiBPQXV0aFRva2VuQ29uZmlnID0+IHtcclxuXHJcbiAgICAgICAgLy8gRXh0ZW5kIGRlZmF1bHQgY29uZmlncmF0aW9uIHdpdGggc3VwcGxpZWQgY29uZmlnIGRhdGFcclxuICAgICAgICBpZiAoY29uZmlnLnVybFRva2VuUGFyYW1ldGVycykge1xyXG4gICAgICAgICAgICBjb25maWcudXJsVG9rZW5QYXJhbWV0ZXJzID0gb2JqZWN0QXNzaWduKHRoaXMuY29uZmlnLnVybFRva2VuUGFyYW1ldGVycywgY29uZmlnLnVybFRva2VuUGFyYW1ldGVycyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZyA9IG9iamVjdEFzc2lnbih0aGlzLmNvbmZpZywgY29uZmlnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZVRva2VuID0gKHVybFRva2VuRGF0YTogYW55KTogT0F1dGhUb2tlbkRhdGEgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gdXJsVG9rZW5EYXRhW3RoaXMuY29uZmlnLnVybFRva2VuUGFyYW1ldGVycy5pZFRva2VuXTtcclxuICAgICAgICBjb25zdCB0b2tlblR5cGUgPSB1cmxUb2tlbkRhdGFbdGhpcy5jb25maWcudXJsVG9rZW5QYXJhbWV0ZXJzLnRva2VuVHlwZV0gfHwgJ0JlYXJlcic7XHJcblxyXG4gICAgICAgIGlmICghdG9rZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjbGFpbXM6IEp3dENsYWltcyA9IHRoaXMuand0VG9rZW5TZXJ2aWNlLmdldEp3dENsYWltcyh0b2tlbik7XHJcbiAgICAgICAgY29uc3QgaXNzdWVkVGltZSA9IGNsYWltcy5uYmYgPyBjbGFpbXMubmJmIDogY2xhaW1zLmlhdDtcclxuICAgICAgICBjb25zdCBleHBpcmF0aW9uVGltZSA9IGNsYWltcy5leHAgLSBpc3N1ZWRUaW1lO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b2tlbjogdG9rZW4sXHJcbiAgICAgICAgICAgIHRva2VuVHlwZTogdG9rZW5UeXBlLFxyXG4gICAgICAgICAgICBleHBpcmVzQXQ6IHRoaXMuZ2V0VGltZU5vdygpICsgZXhwaXJhdGlvblRpbWUsXHJcbiAgICAgICAgICAgIGp3dENsYWltczogY2xhaW1zXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIHNldFRva2VuID0gKGRhdGE6IE9BdXRoVG9rZW5EYXRhKTogT0F1dGhUb2tlbkRhdGEgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRva2VuRGF0YSA9IGRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBnZXRUb2tlbiA9ICgpOiBPQXV0aFRva2VuRGF0YSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5EYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0SWRUb2tlbiA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFRva2VuKCkgPyB0aGlzLmdldFRva2VuKCkudG9rZW4gOiB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBnZXRBdXRob3JpemF0aW9uSGVhZGVyID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgaWYgKCEodGhpcy5nZXRUb2tlblR5cGUoKSAmJiB0aGlzLmdldElkVG9rZW4oKSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdG9rZW5UeXBlID0gdGhpcy5nZXRUb2tlblR5cGUoKS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRoaXMuZ2V0VG9rZW5UeXBlKCkuc3Vic3RyKDEpO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7dG9rZW5UeXBlfSAke3RoaXMuZ2V0SWRUb2tlbigpfWA7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBnZXRUb2tlblR5cGUgPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRUb2tlbigpID8gdGhpcy5nZXRUb2tlbigpLnRva2VuVHlwZSA6IHVuZGVmaW5lZDtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIHJlbW92ZVRva2VuID0gKCk6IE9BdXRoVG9rZW5EYXRhID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2tlbkRhdGEgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgaXNUb2tlblZhbGlkID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gdGhpcy5nZXRUb2tlbigpO1xyXG5cclxuICAgICAgICBpZiAoIXRva2VuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRpbWVOb3cgPSB0aGlzLmdldFRpbWVOb3coKTtcclxuICAgICAgICBjb25zdCBleHBpcmVzQXQgPSB0b2tlbi5leHBpcmVzQXQ7XHJcbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IChleHBpcmVzQXQgJiYgKGV4cGlyZXNBdCA+IHRpbWVOb3cgKyB0aGlzLmNvbmZpZy5leHBpcmVPZmZzZXRTZWNvbmRzKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpc1ZhbGlkO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGdldFRpbWVOb3cgPSAoKTogbnVtYmVyID0+IHtcclxuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDAuMCk7XHJcbiAgICB9O1xyXG59Il19
