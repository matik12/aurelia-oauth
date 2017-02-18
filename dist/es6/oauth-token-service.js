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
            exports_1("OAuthTokenService", OAuthTokenService);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9vYXV0aC10b2tlbi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBc0JhLGlCQUFpQjtnQkFNMUIsMkJBQW9CLGVBQWdDO29CQUFwRCxpQkFTQztvQkFUbUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO29CQVc3QyxjQUFTLEdBQUcsVUFBQyxNQUF3Qjt3QkFHeEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQzs0QkFDNUIsTUFBTSxDQUFDLGtCQUFrQixHQUFHLDhCQUFZLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQzt3QkFDeEcsQ0FBQzt3QkFFRCxLQUFJLENBQUMsTUFBTSxHQUFHLDhCQUFZLENBQUMsS0FBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFFaEQsTUFBTSxDQUFDLE1BQU0sQ0FBQztvQkFDbEIsQ0FBQyxDQUFDO29CQUVLLGdCQUFXLEdBQUcsVUFBQyxZQUFpQjt3QkFDbkMsSUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ25FLElBQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxJQUFJLFFBQVEsQ0FBQzt3QkFFckYsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzRCQUNULE1BQU0sQ0FBQyxJQUFJLENBQUM7d0JBQ2hCLENBQUM7d0JBRUQsSUFBTSxNQUFNLEdBQWMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ25FLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxN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RTtpREFPNEIsMkJBQWU7ZUFOM0MsaUJBQWlCLENBZ0c3Qjs7UUFBQSxDQUFDIiwiZmlsZSI6Im9hdXRoLXRva2VuLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSAnYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvbic7XHJcblxyXG5pbXBvcnQgSnd0VG9rZW5TZXJ2aWNlLCB7IEp3dENsYWltcyB9IGZyb20gJy4vand0LXRva2VuLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBvYmplY3RBc3NpZ24gfSBmcm9tICcuL29hdXRoLXBvbHlmaWxscyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE9BdXRoVG9rZW5Db25maWcge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgdXJsVG9rZW5QYXJhbWV0ZXJzPzoge1xyXG4gICAgICAgIGlkVG9rZW46IHN0cmluZztcclxuICAgICAgICB0b2tlblR5cGU/OiBzdHJpbmc7XHJcbiAgICB9O1xyXG4gICAgZXhwaXJlT2Zmc2V0U2Vjb25kcz86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBPQXV0aFRva2VuRGF0YSB7XHJcbiAgICB0b2tlbjogc3RyaW5nO1xyXG4gICAgdG9rZW5UeXBlOiBzdHJpbmc7XHJcbiAgICBleHBpcmVzQXQ6IG51bWJlcjtcclxuICAgIGp3dENsYWltcz86IEp3dENsYWltcztcclxufVxyXG5cclxuQGF1dG9pbmplY3QoKVxyXG5leHBvcnQgY2xhc3MgT0F1dGhUb2tlblNlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBjb25maWc6IE9BdXRoVG9rZW5Db25maWc7XHJcblxyXG4gICAgcHJpdmF0ZSB0b2tlbkRhdGE6IE9BdXRoVG9rZW5EYXRhO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgand0VG9rZW5TZXJ2aWNlOiBKd3RUb2tlblNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHtcclxuICAgICAgICAgICAgbmFtZTogJ2lkX3Rva2VuJyxcclxuICAgICAgICAgICAgdXJsVG9rZW5QYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBpZFRva2VuOiAnaWRfdG9rZW4nLFxyXG4gICAgICAgICAgICAgICAgdG9rZW5UeXBlOiAndG9rZW5fdHlwZSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXhwaXJlT2Zmc2V0U2Vjb25kczogMTIwXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29uZmlndXJlID0gKGNvbmZpZzogT0F1dGhUb2tlbkNvbmZpZyk6IE9BdXRoVG9rZW5Db25maWcgPT4ge1xyXG5cclxuICAgICAgICAvLyBFeHRlbmQgZGVmYXVsdCBjb25maWdyYXRpb24gd2l0aCBzdXBwbGllZCBjb25maWcgZGF0YVxyXG4gICAgICAgIGlmIChjb25maWcudXJsVG9rZW5QYXJhbWV0ZXJzKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy51cmxUb2tlblBhcmFtZXRlcnMgPSBvYmplY3RBc3NpZ24odGhpcy5jb25maWcudXJsVG9rZW5QYXJhbWV0ZXJzLCBjb25maWcudXJsVG9rZW5QYXJhbWV0ZXJzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlnID0gb2JqZWN0QXNzaWduKHRoaXMuY29uZmlnLCBjb25maWcpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlVG9rZW4gPSAodXJsVG9rZW5EYXRhOiBhbnkpOiBPQXV0aFRva2VuRGF0YSA9PiB7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSB1cmxUb2tlbkRhdGFbdGhpcy5jb25maWcudXJsVG9rZW5QYXJhbWV0ZXJzLmlkVG9rZW5dO1xyXG4gICAgICAgIGNvbnN0IHRva2VuVHlwZSA9IHVybFRva2VuRGF0YVt0aGlzLmNvbmZpZy51cmxUb2tlblBhcmFtZXRlcnMudG9rZW5UeXBlXSB8fCAnQmVhcmVyJztcclxuXHJcbiAgICAgICAgaWYgKCF0b2tlbikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNsYWltczogSnd0Q2xhaW1zID0gdGhpcy5qd3RUb2tlblNlcnZpY2UuZ2V0Snd0Q2xhaW1zKHRva2VuKTtcclxuICAgICAgICBjb25zdCBpc3N1ZWRUaW1lID0gY2xhaW1zLm5iZiA/IGNsYWltcy5uYmYgOiBjbGFpbXMuaWF0O1xyXG4gICAgICAgIGNvbnN0IGV4cGlyYXRpb25UaW1lID0gY2xhaW1zLmV4cCAtIGlzc3VlZFRpbWU7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRva2VuOiB0b2tlbixcclxuICAgICAgICAgICAgdG9rZW5UeXBlOiB0b2tlblR5cGUsXHJcbiAgICAgICAgICAgIGV4cGlyZXNBdDogdGhpcy5nZXRUaW1lTm93KCkgKyBleHBpcmF0aW9uVGltZSxcclxuICAgICAgICAgICAgand0Q2xhaW1zOiBjbGFpbXNcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgc2V0VG9rZW4gPSAoZGF0YTogT0F1dGhUb2tlbkRhdGEpOiBPQXV0aFRva2VuRGF0YSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5EYXRhID0gZGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGdldFRva2VuID0gKCk6IE9BdXRoVG9rZW5EYXRhID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2tlbkRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBnZXRJZFRva2VuID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW4oKSA/IHRoaXMuZ2V0VG9rZW4oKS50b2tlbiA6IHVuZGVmaW5lZDtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGdldEF1dGhvcml6YXRpb25IZWFkZXIgPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICBpZiAoISh0aGlzLmdldFRva2VuVHlwZSgpICYmIHRoaXMuZ2V0SWRUb2tlbigpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0b2tlblR5cGUgPSB0aGlzLmdldFRva2VuVHlwZSgpLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGhpcy5nZXRUb2tlblR5cGUoKS5zdWJzdHIoMSk7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHt0b2tlblR5cGV9ICR7dGhpcy5nZXRJZFRva2VuKCl9YDtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGdldFRva2VuVHlwZSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFRva2VuKCkgPyB0aGlzLmdldFRva2VuKCkudG9rZW5UeXBlIDogdW5kZWZpbmVkO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlVG9rZW4gPSAoKTogT0F1dGhUb2tlbkRhdGEgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRva2VuRGF0YSA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBpc1Rva2VuVmFsaWQgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLmdldFRva2VuKCk7XHJcblxyXG4gICAgICAgIGlmICghdG9rZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdGltZU5vdyA9IHRoaXMuZ2V0VGltZU5vdygpO1xyXG4gICAgICAgIGNvbnN0IGV4cGlyZXNBdCA9IHRva2VuLmV4cGlyZXNBdDtcclxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gKGV4cGlyZXNBdCAmJiAoZXhwaXJlc0F0ID4gdGltZU5vdyArIHRoaXMuY29uZmlnLmV4cGlyZU9mZnNldFNlY29uZHMpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlzVmFsaWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgZ2V0VGltZU5vdyA9ICgpOiBudW1iZXIgPT4ge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMC4wKTtcclxuICAgIH07XHJcbn0iXX0=
