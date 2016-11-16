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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImp3dC10b2tlbi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFNQTtJQUFBO1FBQUEsaUJBNkJDO1FBNUJVLGlCQUFZLEdBQUcsVUFBQyxZQUFvQjtZQUN2QyxJQUFJLFFBQVEsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2pELElBQUksYUFBYSxHQUFHLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFOUQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDO1FBRU0sbUJBQWMsR0FBRyxVQUFDLEtBQWE7WUFDbkMsSUFBSSxrQkFBa0IsR0FBRyxzQ0FBc0MsQ0FBQztZQUNoRSxJQUFJLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0MsSUFBSSxZQUFZLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO1lBRW5ELE1BQU0sQ0FBWTtnQkFDZCxNQUFNLEVBQUUsWUFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO2dCQUN0QyxPQUFPLEVBQUUsWUFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO2dCQUN2QyxTQUFTLEVBQUUsWUFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO2FBQzVDLENBQUM7UUFDTixDQUFDLENBQUM7UUFFTSx1QkFBa0IsR0FBRyxVQUFDLGFBQXFCO1lBQy9DLGFBQWEsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRXBFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBQ3ZELENBQUM7WUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUM7SUFDTixDQUFDO0lBQUQsc0JBQUM7QUFBRCxDQTdCQSxBQTZCQyxJQUFBO0FBN0JEO2lDQTZCQyxDQUFBIiwiZmlsZSI6Imp3dC10b2tlbi1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW50ZXJmYWNlIElKd3RUb2tlbiB7XHJcbiAgICBoZWFkZXI6IHN0cmluZztcclxuICAgIHBheWxvYWQ6IHN0cmluZztcclxuICAgIHNpZ25hdHVyZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKd3RUb2tlblNlcnZpY2UgeyAgICBcclxuICAgIHB1YmxpYyBnZXRKd3RDbGFpbXMgPSAoZW5jb2RlZFRva2VuOiBzdHJpbmcpOiBJSnd0Q2xhaW1zID0+IHtcclxuICAgICAgICB2YXIgand0VG9rZW4gPSB0aGlzLmNyZWF0ZUp3dFRva2VuKGVuY29kZWRUb2tlbik7XHJcbiAgICAgICAgdmFyIGJhc2U2NERlY29kZWQgPSB0aGlzLmRlY29kZUJhc2U2NFN0cmluZyhqd3RUb2tlbi5wYXlsb2FkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoYmFzZTY0RGVjb2RlZCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlSnd0VG9rZW4gPSAodG9rZW46IHN0cmluZyk6IElKd3RUb2tlbiA9PiB7XHJcbiAgICAgICAgdmFyIGp3dFRva2VuUGFydHNSZWdleCA9IC9eKFteXFwuXFxzXSopXFwuKFteXFwuXFxzXSspXFwuKFteXFwuXFxzXSopJC87XHJcbiAgICAgICAgdmFyIG1hdGNoZXMgPSBqd3RUb2tlblBhcnRzUmVnZXguZXhlYyh0b2tlbik7XHJcbiAgICAgICAgdmFyIGlzVmFsaWRUb2tlbiA9IG1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggPT09IDQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIDxJSnd0VG9rZW4+e1xyXG4gICAgICAgICAgICBoZWFkZXI6IGlzVmFsaWRUb2tlbiA/IG1hdGNoZXNbMV0gOiAnJyxcclxuICAgICAgICAgICAgcGF5bG9hZDogaXNWYWxpZFRva2VuID8gbWF0Y2hlc1syXSA6ICcnLFxyXG4gICAgICAgICAgICBzaWduYXR1cmU6IGlzVmFsaWRUb2tlbiA/IG1hdGNoZXNbM10gOiAnJ1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgZGVjb2RlQmFzZTY0U3RyaW5nID0gKGJhc2U2NElkVG9rZW46IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgYmFzZTY0SWRUb2tlbiA9IGJhc2U2NElkVG9rZW4ucmVwbGFjZSgvLS9nLCAnKycpLnJlcGxhY2UoL18vZywgJy8nKTtcclxuXHJcbiAgICAgICAgaWYgKCF3aW5kb3cuYXRvYikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jyb3dzZXIgZG9lc25cXCd0IGltcGxlbWVudCBhdG9iJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gd2luZG93LmF0b2IoYmFzZTY0SWRUb2tlbik7XHJcbiAgICB9O1xyXG59Il19
