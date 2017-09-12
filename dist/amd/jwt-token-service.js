define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var JwtTokenService = (function () {
        function JwtTokenService() {
            var _this = this;
            this.getJwtClaims = function (encodedToken) {
                var jwtToken = _this.createJwtToken(encodedToken);
                var base64Decoded = _this.decodeBase64String(jwtToken.payload);
                return JSON.parse(base64Decoded);
            };
            this.createJwtToken = function (token) {
                var jwtTokenPartsRegex = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/;
                var matches = jwtTokenPartsRegex.exec(token);
                var isValidToken = matches && matches.length === 4;
                return {
                    header: isValidToken ? matches[1] : '',
                    payload: isValidToken ? matches[2] : '',
                    signature: isValidToken ? matches[3] : ''
                };
            };
            this.decodeBase64String = function (base64IdToken) {
                base64IdToken = base64IdToken.replace(/-/g, '+').replace(/_/g, '/');
                if (!window.atob) {
                    throw new Error('Browser doesn\'t implement atob');
                }
                return window.atob(base64IdToken);
            };
        }
        return JwtTokenService;
    }());
    exports.default = JwtTokenService;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qd3QtdG9rZW4tc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFjQTtRQUFBO1lBQUEsaUJBNkJDO1lBNUJVLGlCQUFZLEdBQUcsVUFBQyxZQUFvQjtnQkFDdkMsSUFBTSxRQUFRLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDbkQsSUFBTSxhQUFhLEdBQUcsS0FBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFaEUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDO1lBRU0sbUJBQWMsR0FBRyxVQUFDLEtBQWE7Z0JBQ25DLElBQU0sa0JBQWtCLEdBQUcsc0NBQXNDLENBQUM7Z0JBQ2xFLElBQU0sT0FBTyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0MsSUFBTSxZQUFZLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO2dCQUVyRCxNQUFNLENBQVc7b0JBQ2IsTUFBTSxFQUFFLFlBQVksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtvQkFDdEMsT0FBTyxFQUFFLFlBQVksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtvQkFDdkMsU0FBUyxFQUFFLFlBQVksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtpQkFDNUMsQ0FBQztZQUNOLENBQUMsQ0FBQztZQUVNLHVCQUFrQixHQUFHLFVBQUMsYUFBcUI7Z0JBQy9DLGFBQWEsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUVwRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztnQkFDdkQsQ0FBQztnQkFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN0QyxDQUFDLENBQUM7UUFDTixDQUFDO1FBQUQsc0JBQUM7SUFBRCxDQTdCQSxBQTZCQyxJQUFBIiwiZmlsZSI6Imp3dC10b2tlbi1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW50ZXJmYWNlIEp3dFRva2VuIHtcclxuICAgIGhlYWRlcjogc3RyaW5nO1xyXG4gICAgcGF5bG9hZDogc3RyaW5nO1xyXG4gICAgc2lnbmF0dXJlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSnd0Q2xhaW1zIHtcclxuICAgIGV4cDogbnVtYmVyO1xyXG4gICAgbmJmPzogbnVtYmVyO1xyXG4gICAgaWF0PzogbnVtYmVyO1xyXG4gICAgcHBpZD86IHN0cmluZztcclxuICAgIGdpdmVuX25hbWU/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEp3dFRva2VuU2VydmljZSB7XHJcbiAgICBwdWJsaWMgZ2V0Snd0Q2xhaW1zID0gKGVuY29kZWRUb2tlbjogc3RyaW5nKTogSnd0Q2xhaW1zID0+IHtcclxuICAgICAgICBjb25zdCBqd3RUb2tlbiA9IHRoaXMuY3JlYXRlSnd0VG9rZW4oZW5jb2RlZFRva2VuKTtcclxuICAgICAgICBjb25zdCBiYXNlNjREZWNvZGVkID0gdGhpcy5kZWNvZGVCYXNlNjRTdHJpbmcoand0VG9rZW4ucGF5bG9hZCk7XHJcblxyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGJhc2U2NERlY29kZWQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUp3dFRva2VuID0gKHRva2VuOiBzdHJpbmcpOiBKd3RUb2tlbiA9PiB7XHJcbiAgICAgICAgY29uc3Qgand0VG9rZW5QYXJ0c1JlZ2V4ID0gL14oW15cXC5cXHNdKilcXC4oW15cXC5cXHNdKylcXC4oW15cXC5cXHNdKikkLztcclxuICAgICAgICBjb25zdCBtYXRjaGVzID0gand0VG9rZW5QYXJ0c1JlZ2V4LmV4ZWModG9rZW4pO1xyXG4gICAgICAgIGNvbnN0IGlzVmFsaWRUb2tlbiA9IG1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggPT09IDQ7XHJcblxyXG4gICAgICAgIHJldHVybiA8Snd0VG9rZW4+e1xyXG4gICAgICAgICAgICBoZWFkZXI6IGlzVmFsaWRUb2tlbiA/IG1hdGNoZXNbMV0gOiAnJyxcclxuICAgICAgICAgICAgcGF5bG9hZDogaXNWYWxpZFRva2VuID8gbWF0Y2hlc1syXSA6ICcnLFxyXG4gICAgICAgICAgICBzaWduYXR1cmU6IGlzVmFsaWRUb2tlbiA/IG1hdGNoZXNbM10gOiAnJ1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgZGVjb2RlQmFzZTY0U3RyaW5nID0gKGJhc2U2NElkVG9rZW46IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgYmFzZTY0SWRUb2tlbiA9IGJhc2U2NElkVG9rZW4ucmVwbGFjZSgvLS9nLCAnKycpLnJlcGxhY2UoL18vZywgJy8nKTtcclxuXHJcbiAgICAgICAgaWYgKCF3aW5kb3cuYXRvYikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jyb3dzZXIgZG9lc25cXCd0IGltcGxlbWVudCBhdG9iJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gd2luZG93LmF0b2IoYmFzZTY0SWRUb2tlbik7XHJcbiAgICB9O1xyXG59Il19
