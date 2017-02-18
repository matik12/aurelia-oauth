define(["require", "exports"], function (require, exports) {
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
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qd3QtdG9rZW4tc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQWNBO1FBQUE7WUFBQSxpQkE2QkM7WUE1QlUsaUJBQVksR0FBRyxVQUFDLFlBQW9CO2dCQUN2QyxJQUFNLFFBQVEsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNuRCxJQUFNLGFBQWEsR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUVoRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUM7WUFFTSxtQkFBYyxHQUFHLFVBQUMsS0FBYTtnQkFDbkMsSUFBTSxrQkFBa0IsR0FBRyxzQ0FBc0MsQ0FBQztnQkFDbEUsSUFBTSxPQUFPLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMvQyxJQUFNLFlBQVksR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7Z0JBRXJELE1BQU0sQ0FBVztvQkFDYixNQUFNLEVBQUUsWUFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO29CQUN0QyxPQUFPLEVBQUUsWUFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO29CQUN2QyxTQUFTLEVBQUUsWUFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO2lCQUM1QyxDQUFDO1lBQ04sQ0FBQyxDQUFDO1lBRU0sdUJBQWtCLEdBQUcsVUFBQyxhQUFxQjtnQkFDL0MsYUFBYSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBRXBFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO2dCQUN2RCxDQUFDO2dCQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQztRQUNOLENBQUM7UUFBRCxzQkFBQztJQUFELENBN0JBLEFBNkJDLElBQUEiLCJmaWxlIjoiand0LXRva2VuLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbnRlcmZhY2UgSnd0VG9rZW4ge1xyXG4gICAgaGVhZGVyOiBzdHJpbmc7XHJcbiAgICBwYXlsb2FkOiBzdHJpbmc7XHJcbiAgICBzaWduYXR1cmU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBKd3RDbGFpbXMge1xyXG4gICAgZXhwOiBudW1iZXI7XHJcbiAgICBuYmY/OiBudW1iZXI7XHJcbiAgICBpYXQ/OiBudW1iZXI7XHJcbiAgICBwcGlkPzogc3RyaW5nO1xyXG4gICAgZ2l2ZW5fbmFtZT86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSnd0VG9rZW5TZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBnZXRKd3RDbGFpbXMgPSAoZW5jb2RlZFRva2VuOiBzdHJpbmcpOiBKd3RDbGFpbXMgPT4ge1xyXG4gICAgICAgIGNvbnN0IGp3dFRva2VuID0gdGhpcy5jcmVhdGVKd3RUb2tlbihlbmNvZGVkVG9rZW4pO1xyXG4gICAgICAgIGNvbnN0IGJhc2U2NERlY29kZWQgPSB0aGlzLmRlY29kZUJhc2U2NFN0cmluZyhqd3RUb2tlbi5wYXlsb2FkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoYmFzZTY0RGVjb2RlZCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlSnd0VG9rZW4gPSAodG9rZW46IHN0cmluZyk6IEp3dFRva2VuID0+IHtcclxuICAgICAgICBjb25zdCBqd3RUb2tlblBhcnRzUmVnZXggPSAvXihbXlxcLlxcc10qKVxcLihbXlxcLlxcc10rKVxcLihbXlxcLlxcc10qKSQvO1xyXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBqd3RUb2tlblBhcnRzUmVnZXguZXhlYyh0b2tlbik7XHJcbiAgICAgICAgY29uc3QgaXNWYWxpZFRva2VuID0gbWF0Y2hlcyAmJiBtYXRjaGVzLmxlbmd0aCA9PT0gNDtcclxuXHJcbiAgICAgICAgcmV0dXJuIDxKd3RUb2tlbj57XHJcbiAgICAgICAgICAgIGhlYWRlcjogaXNWYWxpZFRva2VuID8gbWF0Y2hlc1sxXSA6ICcnLFxyXG4gICAgICAgICAgICBwYXlsb2FkOiBpc1ZhbGlkVG9rZW4gPyBtYXRjaGVzWzJdIDogJycsXHJcbiAgICAgICAgICAgIHNpZ25hdHVyZTogaXNWYWxpZFRva2VuID8gbWF0Y2hlc1szXSA6ICcnXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBkZWNvZGVCYXNlNjRTdHJpbmcgPSAoYmFzZTY0SWRUb2tlbjogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICAgICAgICBiYXNlNjRJZFRva2VuID0gYmFzZTY0SWRUb2tlbi5yZXBsYWNlKC8tL2csICcrJykucmVwbGFjZSgvXy9nLCAnLycpO1xyXG5cclxuICAgICAgICBpZiAoIXdpbmRvdy5hdG9iKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQnJvd3NlciBkb2VzblxcJ3QgaW1wbGVtZW50IGF0b2InKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB3aW5kb3cuYXRvYihiYXNlNjRJZFRva2VuKTtcclxuICAgIH07XHJcbn0iXX0=
