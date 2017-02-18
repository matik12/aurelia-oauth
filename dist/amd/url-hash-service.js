define(["require", "exports"], function (require, exports) {
    "use strict";
    var UrlHashService = (function () {
        function UrlHashService() {
            var _this = this;
            this.getHash = function () {
                var hash = window.location.hash;
                if (hash.indexOf('#/') > -1) {
                    hash = hash.substring(hash.indexOf('#/') + 2);
                }
                else if (hash.indexOf('#') > -1) {
                    hash = hash.substring(1);
                }
                return hash;
            };
            this.getHashData = function () {
                var hash = _this.getHash();
                var searchRegex = /([^&=]+)=?([^&]*)/g;
                var hashData = {};
                var match = searchRegex.exec(hash);
                while (match) {
                    var parameter = _this.decodeUrlData(match[1]);
                    var value = _this.decodeUrlData(match[2]);
                    hashData[parameter] = value;
                    match = searchRegex.exec(hash);
                }
                return hashData;
            };
            this.clearHash = function () {
                window.location.hash = '';
            };
            this.decodeUrlData = function (s) {
                return decodeURIComponent(s.replace(/\+/g, ' '));
            };
        }
        return UrlHashService;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = UrlHashService;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVybC1oYXNoLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFBQTtRQUFBO1lBQUEsaUJBcUNDO1lBcENVLFlBQU8sR0FBRztnQkFDYixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFFaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsQ0FBQztnQkFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLENBQUMsQ0FBQztZQUVLLGdCQUFXLEdBQUc7Z0JBQ2pCLElBQU0sSUFBSSxHQUFHLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDNUIsSUFBTSxXQUFXLEdBQUcsb0JBQW9CLENBQUM7Z0JBQ3pDLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFFcEIsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxLQUFLLEVBQUUsQ0FBQztvQkFDWCxJQUFNLFNBQVMsR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvQyxJQUFNLEtBQUssR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUUzQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDO29CQUM1QixLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztnQkFFRCxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ3BCLENBQUMsQ0FBQztZQUVLLGNBQVMsR0FBRztnQkFDZixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDOUIsQ0FBQyxDQUFDO1lBRU0sa0JBQWEsR0FBRyxVQUFDLENBQVM7Z0JBQzlCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3JELENBQUMsQ0FBQztRQUNOLENBQUM7UUFBRCxxQkFBQztJQUFELENBckNBLEFBcUNDLElBQUEiLCJmaWxlIjoidXJsLWhhc2gtc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVybEhhc2hTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBnZXRIYXNoID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgbGV0IGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcclxuXHJcbiAgICAgICAgaWYgKGhhc2guaW5kZXhPZignIy8nKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIGhhc2ggPSBoYXNoLnN1YnN0cmluZyhoYXNoLmluZGV4T2YoJyMvJykgKyAyKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGhhc2guaW5kZXhPZignIycpID4gLTEpIHtcclxuICAgICAgICAgICAgaGFzaCA9IGhhc2guc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGhhc2g7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBnZXRIYXNoRGF0YSA9ICgpOiBhbnkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLmdldEhhc2goKTtcclxuICAgICAgICBjb25zdCBzZWFyY2hSZWdleCA9IC8oW14mPV0rKT0/KFteJl0qKS9nO1xyXG4gICAgICAgIGNvbnN0IGhhc2hEYXRhID0ge307XHJcblxyXG4gICAgICAgIGxldCBtYXRjaCA9IHNlYXJjaFJlZ2V4LmV4ZWMoaGFzaCk7XHJcbiAgICAgICAgd2hpbGUgKG1hdGNoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtZXRlciA9IHRoaXMuZGVjb2RlVXJsRGF0YShtYXRjaFsxXSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5kZWNvZGVVcmxEYXRhKG1hdGNoWzJdKTtcclxuXHJcbiAgICAgICAgICAgIGhhc2hEYXRhW3BhcmFtZXRlcl0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgbWF0Y2ggPSBzZWFyY2hSZWdleC5leGVjKGhhc2gpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGhhc2hEYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgY2xlYXJIYXNoID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJyc7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgZGVjb2RlVXJsRGF0YSA9IChzOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocy5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XHJcbiAgICB9O1xyXG59Il19
