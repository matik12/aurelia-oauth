"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = JwtTokenService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImp3dC10b2tlbi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFjQTtJQUFBO1FBQUEsaUJBNkJDO1FBNUJVLGlCQUFZLEdBQUcsVUFBQyxZQUFvQjtZQUN2QyxJQUFNLFFBQVEsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ25ELElBQU0sYUFBYSxHQUFHLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFaEUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDO1FBRU0sbUJBQWMsR0FBRyxVQUFDLEtBQWE7WUFDbkMsSUFBTSxrQkFBa0IsR0FBRyxzQ0FBc0MsQ0FBQztZQUNsRSxJQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0MsSUFBTSxZQUFZLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO1lBRXJELE1BQU0sQ0FBVztnQkFDYixNQUFNLEVBQUUsWUFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO2dCQUN0QyxPQUFPLEVBQUUsWUFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO2dCQUN2QyxTQUFTLEVBQUUsWUFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO2FBQzVDLENBQUM7UUFDTixDQUFDLENBQUM7UUFFTSx1QkFBa0IsR0FBRyxVQUFDLGFBQXFCO1lBQy9DLGFBQWEsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRXBFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBQ3ZELENBQUM7WUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUM7SUFDTixDQUFDO0lBQUQsc0JBQUM7QUFBRCxDQTdCQSxBQTZCQyxJQUFBIiwiZmlsZSI6Imp3dC10b2tlbi1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW50ZXJmYWNlIEp3dFRva2VuIHtcclxuICAgIGhlYWRlcjogc3RyaW5nO1xyXG4gICAgcGF5bG9hZDogc3RyaW5nO1xyXG4gICAgc2lnbmF0dXJlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSnd0Q2xhaW1zIHtcclxuICAgIGV4cDogbnVtYmVyO1xyXG4gICAgbmJmPzogbnVtYmVyO1xyXG4gICAgaWF0PzogbnVtYmVyO1xyXG4gICAgcHBpZD86IHN0cmluZztcclxuICAgIGdpdmVuX25hbWU/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEp3dFRva2VuU2VydmljZSB7XHJcbiAgICBwdWJsaWMgZ2V0Snd0Q2xhaW1zID0gKGVuY29kZWRUb2tlbjogc3RyaW5nKTogSnd0Q2xhaW1zID0+IHtcclxuICAgICAgICBjb25zdCBqd3RUb2tlbiA9IHRoaXMuY3JlYXRlSnd0VG9rZW4oZW5jb2RlZFRva2VuKTtcclxuICAgICAgICBjb25zdCBiYXNlNjREZWNvZGVkID0gdGhpcy5kZWNvZGVCYXNlNjRTdHJpbmcoand0VG9rZW4ucGF5bG9hZCk7XHJcblxyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGJhc2U2NERlY29kZWQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUp3dFRva2VuID0gKHRva2VuOiBzdHJpbmcpOiBKd3RUb2tlbiA9PiB7XHJcbiAgICAgICAgY29uc3Qgand0VG9rZW5QYXJ0c1JlZ2V4ID0gL14oW15cXC5cXHNdKilcXC4oW15cXC5cXHNdKylcXC4oW15cXC5cXHNdKikkLztcclxuICAgICAgICBjb25zdCBtYXRjaGVzID0gand0VG9rZW5QYXJ0c1JlZ2V4LmV4ZWModG9rZW4pO1xyXG4gICAgICAgIGNvbnN0IGlzVmFsaWRUb2tlbiA9IG1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggPT09IDQ7XHJcblxyXG4gICAgICAgIHJldHVybiA8Snd0VG9rZW4+e1xyXG4gICAgICAgICAgICBoZWFkZXI6IGlzVmFsaWRUb2tlbiA/IG1hdGNoZXNbMV0gOiAnJyxcclxuICAgICAgICAgICAgcGF5bG9hZDogaXNWYWxpZFRva2VuID8gbWF0Y2hlc1syXSA6ICcnLFxyXG4gICAgICAgICAgICBzaWduYXR1cmU6IGlzVmFsaWRUb2tlbiA/IG1hdGNoZXNbM10gOiAnJ1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgZGVjb2RlQmFzZTY0U3RyaW5nID0gKGJhc2U2NElkVG9rZW46IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgYmFzZTY0SWRUb2tlbiA9IGJhc2U2NElkVG9rZW4ucmVwbGFjZSgvLS9nLCAnKycpLnJlcGxhY2UoL18vZywgJy8nKTtcclxuXHJcbiAgICAgICAgaWYgKCF3aW5kb3cuYXRvYikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jyb3dzZXIgZG9lc25cXCd0IGltcGxlbWVudCBhdG9iJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gd2luZG93LmF0b2IoYmFzZTY0SWRUb2tlbik7XHJcbiAgICB9O1xyXG59Il19
