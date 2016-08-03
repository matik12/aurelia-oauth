var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-dependency-injection', './jwt-token-service', './oauth-polyfills'], function (require, exports, aurelia_dependency_injection_1, jwt_token_service_1, oauth_polyfills_1) {
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
        OAuthTokenService = __decorate([
            aurelia_dependency_injection_1.autoinject(), 
            __metadata('design:paramtypes', [jwt_token_service_1.default])
        ], OAuthTokenService);
        return OAuthTokenService;
    }());
    exports.OAuthTokenService = OAuthTokenService;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9hdXRoLXRva2VuLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFNQTtRQUtJLDJCQUFvQixlQUFnQztZQUx4RCxpQkErRkM7WUExRnVCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtZQVc3QyxjQUFTLEdBQUcsVUFBQyxNQUF5QjtnQkFHekMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztvQkFDNUIsTUFBTSxDQUFDLGtCQUFrQixHQUFHLDhCQUFZLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDeEcsQ0FBQztnQkFFRCxLQUFJLENBQUMsTUFBTSxHQUFHLDhCQUFZLENBQUMsS0FBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFFaEQsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNsQixDQUFDLENBQUM7WUFFSyxnQkFBVyxHQUFHLFVBQUMsWUFBaUI7Z0JBQ25DLElBQUksS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNqRSxJQUFJLFNBQVMsR0FBRyxZQUFZLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxRQUFRLENBQUM7Z0JBRW5GLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDVCxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELElBQUksTUFBTSxHQUFlLEtBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsRSxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQkFDdEQsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUM7Z0JBRTdDLE1BQU0sQ0FBQztvQkFDSCxLQUFLLEVBQUUsS0FBSztvQkFDWixTQUFTLEVBQUUsU0FBUztvQkFDcEIsU0FBUyxFQUFFLEtBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxjQUFjO29CQUM3QyxTQUFTLEVBQUUsTUFBTTtpQkFDcEIsQ0FBQztZQUNOLENBQUMsQ0FBQztZQUVLLGFBQVEsR0FBRyxVQUFDLElBQXFCO2dCQUNwQyxNQUFNLENBQUMsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDakMsQ0FBQyxDQUFDO1lBRUssYUFBUSxHQUFHO2dCQUNkLE1BQU0sQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFCLENBQUMsQ0FBQztZQUVLLGVBQVUsR0FBRztnQkFDaEIsTUFBTSxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUMvRCxDQUFDLENBQUM7WUFFSywyQkFBc0IsR0FBRztnQkFDNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlDLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQ2QsQ0FBQztnQkFFRCxJQUFJLFNBQVMsR0FBRyxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTVGLE1BQU0sQ0FBSSxTQUFTLFNBQUksS0FBSSxDQUFDLFVBQVUsRUFBSSxDQUFDO1lBQy9DLENBQUMsQ0FBQztZQUVLLGlCQUFZLEdBQUc7Z0JBQ2xCLE1BQU0sQ0FBQyxLQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDbkUsQ0FBQyxDQUFDO1lBRUssZ0JBQVcsR0FBRztnQkFDakIsTUFBTSxDQUFDLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ2pDLENBQUMsQ0FBQztZQUVLLGlCQUFZLEdBQUc7Z0JBQ2xCLElBQUksS0FBSyxHQUFHLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFFNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNULE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ2pCLENBQUM7Z0JBRUQsSUFBSSxPQUFPLEdBQUcsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNoQyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO2dCQUNoQyxJQUFJLE9BQU8sR0FBRyxDQUFDLFNBQVMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7Z0JBRXJGLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDbkIsQ0FBQyxDQUFDO1lBRU0sZUFBVSxHQUFHO2dCQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDO1lBQ3JELENBQUMsQ0FBQztZQXhGRSxJQUFJLENBQUMsTUFBTSxHQUFHO2dCQUNWLElBQUksRUFBRSxVQUFVO2dCQUNoQixrQkFBa0IsRUFBRTtvQkFDaEIsT0FBTyxFQUFFLFVBQVU7b0JBQ25CLFNBQVMsRUFBRSxZQUFZO2lCQUMxQjtnQkFDRCxtQkFBbUIsRUFBRSxHQUFHO2FBQzNCLENBQUM7UUFDTCxDQUFDO1FBZk47WUFBQyx5Q0FBVSxFQUFFOzs2QkFBQTtRQWdHYix3QkFBQztJQUFELENBL0ZBLEFBK0ZDLElBQUE7SUEvRlkseUJBQWlCLG9CQStGN0IsQ0FBQSIsImZpbGUiOiJvYXV0aC10b2tlbi1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gJ2F1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb24nO1xyXG5cclxuaW1wb3J0IEp3dFRva2VuU2VydmljZSBmcm9tICcuL2p3dC10b2tlbi1zZXJ2aWNlJztcclxuaW1wb3J0IHsgb2JqZWN0QXNzaWduIH0gZnJvbSAnLi9vYXV0aC1wb2x5ZmlsbHMnO1xyXG5cclxuQGF1dG9pbmplY3QoKVxyXG5leHBvcnQgY2xhc3MgT0F1dGhUb2tlblNlcnZpY2UgaW1wbGVtZW50cyBJT0F1dGhUb2tlblNlcnZpY2Uge1xyXG4gICAgXHJcbiAgICBwcml2YXRlIHRva2VuRGF0YTogSU9BdXRoVG9rZW5EYXRhO1xyXG4gICAgcHVibGljIGNvbmZpZzogSU9BdXRoVG9rZW5Db25maWc7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBqd3RUb2tlblNlcnZpY2U6IEp3dFRva2VuU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0ge1xyXG4gICAgICAgICAgICBuYW1lOiAnaWRfdG9rZW4nLFxyXG4gICAgICAgICAgICB1cmxUb2tlblBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgICAgIGlkVG9rZW46ICdpZF90b2tlbicsXHJcbiAgICAgICAgICAgICAgICB0b2tlblR5cGU6ICd0b2tlbl90eXBlJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBleHBpcmVPZmZzZXRTZWNvbmRzOiAxMjBcclxuICAgICAgICB9O1xyXG4gICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29uZmlndXJlID0gKGNvbmZpZzogSU9BdXRoVG9rZW5Db25maWcpOiBJT0F1dGhUb2tlbkNvbmZpZyA9PiB7XHJcblxyXG4gICAgICAgIC8vIEV4dGVuZCBkZWZhdWx0IGNvbmZpZ3JhdGlvbiB3aXRoIHN1cHBsaWVkIGNvbmZpZyBkYXRhXHJcbiAgICAgICAgaWYgKGNvbmZpZy51cmxUb2tlblBhcmFtZXRlcnMpIHtcclxuICAgICAgICAgICAgY29uZmlnLnVybFRva2VuUGFyYW1ldGVycyA9IG9iamVjdEFzc2lnbih0aGlzLmNvbmZpZy51cmxUb2tlblBhcmFtZXRlcnMsIGNvbmZpZy51cmxUb2tlblBhcmFtZXRlcnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IG9iamVjdEFzc2lnbih0aGlzLmNvbmZpZywgY29uZmlnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZVRva2VuID0gKHVybFRva2VuRGF0YTogYW55KTogSU9BdXRoVG9rZW5EYXRhID0+IHtcclxuICAgICAgICB2YXIgdG9rZW4gPSB1cmxUb2tlbkRhdGFbdGhpcy5jb25maWcudXJsVG9rZW5QYXJhbWV0ZXJzLmlkVG9rZW5dO1xyXG4gICAgICAgIHZhciB0b2tlblR5cGUgPSB1cmxUb2tlbkRhdGFbdGhpcy5jb25maWcudXJsVG9rZW5QYXJhbWV0ZXJzLnRva2VuVHlwZV0gfHwgJ0JlYXJlcic7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCF0b2tlbikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBjbGFpbXM6IElKd3RDbGFpbXMgPSB0aGlzLmp3dFRva2VuU2VydmljZS5nZXRKd3RDbGFpbXModG9rZW4pO1xyXG4gICAgICAgIHZhciBpc3N1ZWRUaW1lID0gY2xhaW1zLm5iZiA/IGNsYWltcy5uYmYgOiBjbGFpbXMuaWF0O1xyXG4gICAgICAgIHZhciBleHBpcmF0aW9uVGltZSA9IGNsYWltcy5leHAgLSBpc3N1ZWRUaW1lO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b2tlbjogdG9rZW4sXHJcbiAgICAgICAgICAgIHRva2VuVHlwZTogdG9rZW5UeXBlLFxyXG4gICAgICAgICAgICBleHBpcmVzQXQ6IHRoaXMuZ2V0VGltZU5vdygpICsgZXhwaXJhdGlvblRpbWUsXHJcbiAgICAgICAgICAgIGp3dENsYWltczogY2xhaW1zXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIHNldFRva2VuID0gKGRhdGE6IElPQXV0aFRva2VuRGF0YSk6IElPQXV0aFRva2VuRGF0YSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5EYXRhID0gZGF0YTtcclxuICAgIH07ICAgIFxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0VG9rZW4gPSAoKTogSU9BdXRoVG9rZW5EYXRhID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2tlbkRhdGE7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0SWRUb2tlbiA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFRva2VuKCkgPyB0aGlzLmdldFRva2VuKCkudG9rZW4gOiB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0QXV0aG9yaXphdGlvbkhlYWRlciA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIGlmICghKHRoaXMuZ2V0VG9rZW5UeXBlKCkgJiYgdGhpcy5nZXRJZFRva2VuKCkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciB0b2tlblR5cGUgPSB0aGlzLmdldFRva2VuVHlwZSgpLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGhpcy5nZXRUb2tlblR5cGUoKS5zdWJzdHIoMSk7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHt0b2tlblR5cGV9ICR7dGhpcy5nZXRJZFRva2VuKCl9YDtcclxuICAgIH07XHJcbiAgICAgICAgICAgIFxyXG4gICAgcHVibGljIGdldFRva2VuVHlwZSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFRva2VuKCkgPyB0aGlzLmdldFRva2VuKCkudG9rZW5UeXBlIDogdW5kZWZpbmVkO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgcHVibGljIHJlbW92ZVRva2VuID0gKCk6IElPQXV0aFRva2VuRGF0YSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5EYXRhID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGlzVG9rZW5WYWxpZCA9ICgpOiBib29sZWFuID0+IHtcclxuICAgICAgICB2YXIgdG9rZW4gPSB0aGlzLmdldFRva2VuKCk7XHJcblxyXG4gICAgICAgIGlmICghdG9rZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHRpbWVOb3cgPSB0aGlzLmdldFRpbWVOb3coKTtcclxuICAgICAgICB2YXIgZXhwaXJlc0F0ID0gdG9rZW4uZXhwaXJlc0F0O1xyXG4gICAgICAgIHZhciBpc1ZhbGlkID0gKGV4cGlyZXNBdCAmJiAoZXhwaXJlc0F0ID4gdGltZU5vdyArIHRoaXMuY29uZmlnLmV4cGlyZU9mZnNldFNlY29uZHMpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlzVmFsaWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgZ2V0VGltZU5vdyA9ICgpOiBudW1iZXIgPT4ge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMC4wKTtcclxuICAgIH07ICAgICAgXHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
