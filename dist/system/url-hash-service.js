System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UrlHashService;
    return {
        setters: [],
        execute: function () {
            UrlHashService = (function () {
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
            exports_1("default", UrlHashService);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91cmwtaGFzaC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7WUFBQTtnQkFBQTtvQkFBQSxpQkFxQ0M7b0JBcENVLFlBQU8sR0FBRzt3QkFDYixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQzt3QkFFaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzFCLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ2xELENBQUM7d0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNoQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDN0IsQ0FBQzt3QkFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNoQixDQUFDLENBQUM7b0JBRUssZ0JBQVcsR0FBRzt3QkFDakIsSUFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUM1QixJQUFNLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQzt3QkFDekMsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO3dCQUVwQixJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNuQyxPQUFPLEtBQUssRUFBRSxDQUFDOzRCQUNYLElBQU0sU0FBUyxHQUFHLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQy9DLElBQU0sS0FBSyxHQUFHLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBRTNDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxLQUFLLENBQUM7NEJBQzVCLEtBQUssR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNuQyxDQUFDO3dCQUVELE1BQU0sQ0FBQyxRQUFRLENBQUM7b0JBQ3BCLENBQUMsQ0FBQztvQkFFSyxjQUFTLEdBQUc7d0JBQ2YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO29CQUM5QixDQUFDLENBQUM7b0JBRU0sa0JBQWEsR0FBRyxVQUFDLENBQVM7d0JBQzlCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNyRCxDQUFDLENBQUM7Z0JBQ04sQ0FBQztnQkFBRCxxQkFBQztZQUFELENBckNBLEFBcUNDLElBQUE7O1FBQUEsQ0FBQyIsImZpbGUiOiJ1cmwtaGFzaC1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXJsSGFzaFNlcnZpY2Uge1xyXG4gICAgcHVibGljIGdldEhhc2ggPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICBsZXQgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xyXG5cclxuICAgICAgICBpZiAoaGFzaC5pbmRleE9mKCcjLycpID4gLTEpIHtcclxuICAgICAgICAgICAgaGFzaCA9IGhhc2guc3Vic3RyaW5nKGhhc2guaW5kZXhPZignIy8nKSArIDIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaGFzaC5pbmRleE9mKCcjJykgPiAtMSkge1xyXG4gICAgICAgICAgICBoYXNoID0gaGFzaC5zdWJzdHJpbmcoMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaGFzaDtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGdldEhhc2hEYXRhID0gKCk6IGFueSA9PiB7XHJcbiAgICAgICAgY29uc3QgaGFzaCA9IHRoaXMuZ2V0SGFzaCgpO1xyXG4gICAgICAgIGNvbnN0IHNlYXJjaFJlZ2V4ID0gLyhbXiY9XSspPT8oW14mXSopL2c7XHJcbiAgICAgICAgY29uc3QgaGFzaERhdGEgPSB7fTtcclxuXHJcbiAgICAgICAgbGV0IG1hdGNoID0gc2VhcmNoUmVnZXguZXhlYyhoYXNoKTtcclxuICAgICAgICB3aGlsZSAobWF0Y2gpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFyYW1ldGVyID0gdGhpcy5kZWNvZGVVcmxEYXRhKG1hdGNoWzFdKTtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmRlY29kZVVybERhdGEobWF0Y2hbMl0pO1xyXG5cclxuICAgICAgICAgICAgaGFzaERhdGFbcGFyYW1ldGVyXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBtYXRjaCA9IHNlYXJjaFJlZ2V4LmV4ZWMoaGFzaCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaGFzaERhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBjbGVhckhhc2ggPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAnJztcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBkZWNvZGVVcmxEYXRhID0gKHM6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcclxuICAgIH07XHJcbn0iXX0=
