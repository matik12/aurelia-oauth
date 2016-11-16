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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVybC1oYXNoLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFBQTtRQUFBO1lBQUEsaUJBcUNDO1lBcENVLFlBQU8sR0FBRztnQkFDYixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFFaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsQ0FBQztnQkFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLENBQUMsQ0FBQztZQUVLLGdCQUFXLEdBQUc7Z0JBQ2pCLElBQUksSUFBSSxHQUFHLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDMUIsSUFBSSxXQUFXLEdBQUcsb0JBQW9CLENBQUM7Z0JBQ3ZDLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFFbEIsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxLQUFLLEVBQUUsQ0FBQztvQkFDWCxJQUFJLFNBQVMsR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QyxJQUFJLEtBQUssR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUV6QyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDO29CQUM1QixLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztnQkFFRCxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ3BCLENBQUMsQ0FBQztZQUVLLGNBQVMsR0FBRztnQkFDZixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDOUIsQ0FBQyxDQUFDO1lBRU0sa0JBQWEsR0FBRyxVQUFDLENBQVM7Z0JBQzlCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3JELENBQUMsQ0FBQztRQUNOLENBQUM7UUFBRCxxQkFBQztJQUFELENBckNBLEFBcUNDLElBQUE7SUFyQ0Q7b0NBcUNDLENBQUEiLCJmaWxlIjoidXJsLWhhc2gtc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVybEhhc2hTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBnZXRIYXNoID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgdmFyIGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcclxuXHJcbiAgICAgICAgaWYgKGhhc2guaW5kZXhPZignIy8nKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIGhhc2ggPSBoYXNoLnN1YnN0cmluZyhoYXNoLmluZGV4T2YoJyMvJykgKyAyKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGhhc2guaW5kZXhPZignIycpID4gLTEpIHtcclxuICAgICAgICAgICAgaGFzaCA9IGhhc2guc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gaGFzaDtcclxuICAgIH07XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXRIYXNoRGF0YSA9ICgpOiBhbnkgPT4ge1xyXG4gICAgICAgIHZhciBoYXNoID0gdGhpcy5nZXRIYXNoKCk7XHJcbiAgICAgICAgdmFyIHNlYXJjaFJlZ2V4ID0gLyhbXiY9XSspPT8oW14mXSopL2c7XHJcbiAgICAgICAgdmFyIGhhc2hEYXRhID0ge307XHJcblxyXG4gICAgICAgIHZhciBtYXRjaCA9IHNlYXJjaFJlZ2V4LmV4ZWMoaGFzaCk7XHJcbiAgICAgICAgd2hpbGUgKG1hdGNoKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJhbWV0ZXIgPSB0aGlzLmRlY29kZVVybERhdGEobWF0Y2hbMV0pO1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmRlY29kZVVybERhdGEobWF0Y2hbMl0pO1xyXG5cclxuICAgICAgICAgICAgaGFzaERhdGFbcGFyYW1ldGVyXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBtYXRjaCA9IHNlYXJjaFJlZ2V4LmV4ZWMoaGFzaCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaGFzaERhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBjbGVhckhhc2ggPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAnJztcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBkZWNvZGVVcmxEYXRhID0gKHM6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcclxuICAgIH07XHJcbn0iXX0=
