System.register(["aurelia-dependency-injection", "./jwt-token-service", "./oauth-polyfills"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var aurelia_dependency_injection_1, jwt_token_service_1, oauth_polyfills_1, OAuthTokenService;
    return {
        setters: [
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (jwt_token_service_1_1) {
                jwt_token_service_1 = jwt_token_service_1_1;
            },
            function (oauth_polyfills_1_1) {
                oauth_polyfills_1 = oauth_polyfills_1_1;
            }
        ],
        execute: function () {
            OAuthTokenService = (function () {
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
            exports_1("OAuthTokenService", OAuthTokenService);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9vYXV0aC10b2tlbi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBc0JhLGlCQUFpQjtnQkFNMUIsMkJBQW9CLGVBQWdDO29CQUFwRCxpQkFTQztvQkFUbUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO29CQVc3QyxjQUFTLEdBQUcsVUFBQyxNQUF3Qjt3QkFHeEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQzs0QkFDNUIsTUFBTSxDQUFDLGtCQUFrQixHQUFHLDhCQUFZLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQzt3QkFDeEcsQ0FBQzt3QkFFRCxLQUFJLENBQUMsTUFBTSxHQUFHLDhCQUFZLENBQUMsS0FBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFFaEQsTUFBTSxDQUFDLE1BQU0sQ0FBQztvQkFDbEIsQ0FBQyxDQUFDO29CQUVLLGdCQUFXLEdBQUcsVUFBQyxZQUFpQjt3QkFDbkMsSUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ25FLElBQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxJQUFJLFFBQVEsQ0FBQzt3QkFFckYsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzRCQUNULE1BQU0sQ0FBQyxJQUFJLENBQUM7d0JBQ2hCLENBQUM7d0JBRUQsSUFBTSxNQUFNLEdBQWMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ25FLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxN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QkEvRkUsSUFBSSxDQUFDLE1BQU0sR0FBRzt3QkFDVixJQUFJLEVBQUUsVUFBVTt3QkFDaEIsa0JBQWtCLEVBQUU7NEJBQ2hCLE9BQU8sRUFBRSxVQUFVOzRCQUNuQixTQUFTLEVBQUUsWUFBWTt5QkFDMUI7d0JBQ0QsbUJBQW1CLEVBQUUsRUFBRTtxQkFDMUIsQ0FBQztnQkFDTixDQUFDO2dCQXdGTCx3QkFBQztZQUFELENBdkdBLEFBdUdDLElBQUE7WUF2R1ksaUJBQWlCO2dCQUQ3Qix5Q0FBVSxFQUFFO2lEQU80QiwyQkFBZTtlQU4zQyxpQkFBaUIsQ0F1RzdCOztRQUFBLENBQUMiLCJmaWxlIjoib2F1dGgtdG9rZW4tc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tICdhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uJztcclxuXHJcbmltcG9ydCBKd3RUb2tlblNlcnZpY2UsIHsgSnd0Q2xhaW1zIH0gZnJvbSAnLi9qd3QtdG9rZW4tc2VydmljZSc7XHJcbmltcG9ydCB7IG9iamVjdEFzc2lnbiB9IGZyb20gJy4vb2F1dGgtcG9seWZpbGxzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgT0F1dGhUb2tlbkNvbmZpZyB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICB1cmxUb2tlblBhcmFtZXRlcnM/OiB7XHJcbiAgICAgICAgaWRUb2tlbjogc3RyaW5nO1xyXG4gICAgICAgIHRva2VuVHlwZT86IHN0cmluZztcclxuICAgIH07XHJcbiAgICBleHBpcmVPZmZzZXRTZWNvbmRzPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE9BdXRoVG9rZW5EYXRhIHtcclxuICAgIHRva2VuOiBzdHJpbmc7XHJcbiAgICB0b2tlblR5cGU6IHN0cmluZztcclxuICAgIGV4cGlyZXNBdDogbnVtYmVyO1xyXG4gICAgand0Q2xhaW1zPzogSnd0Q2xhaW1zO1xyXG59XHJcblxyXG5AYXV0b2luamVjdCgpXHJcbmV4cG9ydCBjbGFzcyBPQXV0aFRva2VuU2VydmljZSB7XHJcblxyXG4gICAgcHVibGljIGNvbmZpZzogT0F1dGhUb2tlbkNvbmZpZztcclxuXHJcbiAgICBwcml2YXRlIHRva2VuRGF0YTogT0F1dGhUb2tlbkRhdGE7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBqd3RUb2tlblNlcnZpY2U6IEp3dFRva2VuU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0ge1xyXG4gICAgICAgICAgICBuYW1lOiAnaWRfdG9rZW4nLFxyXG4gICAgICAgICAgICB1cmxUb2tlblBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgICAgIGlkVG9rZW46ICdpZF90b2tlbicsXHJcbiAgICAgICAgICAgICAgICB0b2tlblR5cGU6ICd0b2tlbl90eXBlJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBleHBpcmVPZmZzZXRTZWNvbmRzOiA2MFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbmZpZ3VyZSA9IChjb25maWc6IE9BdXRoVG9rZW5Db25maWcpOiBPQXV0aFRva2VuQ29uZmlnID0+IHtcclxuXHJcbiAgICAgICAgLy8gRXh0ZW5kIGRlZmF1bHQgY29uZmlncmF0aW9uIHdpdGggc3VwcGxpZWQgY29uZmlnIGRhdGFcclxuICAgICAgICBpZiAoY29uZmlnLnVybFRva2VuUGFyYW1ldGVycykge1xyXG4gICAgICAgICAgICBjb25maWcudXJsVG9rZW5QYXJhbWV0ZXJzID0gb2JqZWN0QXNzaWduKHRoaXMuY29uZmlnLnVybFRva2VuUGFyYW1ldGVycywgY29uZmlnLnVybFRva2VuUGFyYW1ldGVycyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZyA9IG9iamVjdEFzc2lnbih0aGlzLmNvbmZpZywgY29uZmlnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZVRva2VuID0gKHVybFRva2VuRGF0YTogYW55KTogT0F1dGhUb2tlbkRhdGEgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gdXJsVG9rZW5EYXRhW3RoaXMuY29uZmlnLnVybFRva2VuUGFyYW1ldGVycy5pZFRva2VuXTtcclxuICAgICAgICBjb25zdCB0b2tlblR5cGUgPSB1cmxUb2tlbkRhdGFbdGhpcy5jb25maWcudXJsVG9rZW5QYXJhbWV0ZXJzLnRva2VuVHlwZV0gfHwgJ0JlYXJlcic7XHJcblxyXG4gICAgICAgIGlmICghdG9rZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjbGFpbXM6IEp3dENsYWltcyA9IHRoaXMuand0VG9rZW5TZXJ2aWNlLmdldEp3dENsYWltcyh0b2tlbik7XHJcbiAgICAgICAgY29uc3QgaXNzdWVkVGltZSA9IGNsYWltcy5uYmYgPyBjbGFpbXMubmJmIDogY2xhaW1zLmlhdDtcclxuICAgICAgICBjb25zdCBleHBpcmF0aW9uVGltZSA9IGNsYWltcy5leHAgLSBpc3N1ZWRUaW1lO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b2tlbjogdG9rZW4sXHJcbiAgICAgICAgICAgIHRva2VuVHlwZTogdG9rZW5UeXBlLFxyXG4gICAgICAgICAgICBleHBpcmVzQXQ6IHRoaXMuZ2V0VGltZU5vdygpICsgZXhwaXJhdGlvblRpbWUsXHJcbiAgICAgICAgICAgIGp3dENsYWltczogY2xhaW1zXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIHNldFRva2VuID0gKGRhdGE6IE9BdXRoVG9rZW5EYXRhKTogT0F1dGhUb2tlbkRhdGEgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRva2VuRGF0YSA9IGRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBnZXRUb2tlbiA9ICgpOiBPQXV0aFRva2VuRGF0YSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5EYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0SWRUb2tlbiA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFRva2VuKCkgPyB0aGlzLmdldFRva2VuKCkudG9rZW4gOiB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBnZXRBdXRob3JpemF0aW9uSGVhZGVyID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgaWYgKCEodGhpcy5nZXRUb2tlblR5cGUoKSAmJiB0aGlzLmdldElkVG9rZW4oKSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdG9rZW5UeXBlID0gdGhpcy5nZXRUb2tlblR5cGUoKS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRoaXMuZ2V0VG9rZW5UeXBlKCkuc3Vic3RyKDEpO1xyXG5cclxuICAgICAgICByZXR1cm4gYCR7dG9rZW5UeXBlfSAke3RoaXMuZ2V0SWRUb2tlbigpfWA7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBnZXRUb2tlblR5cGUgPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRUb2tlbigpID8gdGhpcy5nZXRUb2tlbigpLnRva2VuVHlwZSA6IHVuZGVmaW5lZDtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGdldFRva2VuRXhwaXJhdGlvblRpbWUgPSAoKTogbnVtYmVyID0+IHtcclxuICAgICAgICBjb25zdCB0b2tlblJlbmV3YWxPZmZzZXRTZWNvbmRzID0gMzA7XHJcbiAgICAgICAgY29uc3QgZXhwaXJlT2Zmc2V0ID0gdGhpcy5jb25maWcuZXhwaXJlT2Zmc2V0U2Vjb25kcyArIHRva2VuUmVuZXdhbE9mZnNldFNlY29uZHM7XHJcblxyXG4gICAgICAgIHJldHVybiAodGhpcy50b2tlbkRhdGEuZXhwaXJlc0F0IC0gdGhpcy5nZXRUaW1lTm93KCkgLSBleHBpcmVPZmZzZXQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlVG9rZW4gPSAoKTogT0F1dGhUb2tlbkRhdGEgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRva2VuRGF0YSA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBpc1Rva2VuVmFsaWQgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLmdldFRva2VuKCk7XHJcblxyXG4gICAgICAgIGlmICghdG9rZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdGltZU5vdyA9IHRoaXMuZ2V0VGltZU5vdygpO1xyXG4gICAgICAgIGNvbnN0IGV4cGlyZXNBdCA9IHRva2VuLmV4cGlyZXNBdDtcclxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gKGV4cGlyZXNBdCAmJiAoZXhwaXJlc0F0ID4gdGltZU5vdyArIHRoaXMuY29uZmlnLmV4cGlyZU9mZnNldFNlY29uZHMpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlzVmFsaWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgZ2V0VGltZU5vdyA9ICgpOiBudW1iZXIgPT4ge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMC4wKTtcclxuICAgIH07XHJcbn0iXX0=
