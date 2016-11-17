System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UrlHashService;
    return {
        setters:[],
        execute: function() {
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
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVybC1oYXNoLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUFBO2dCQUFBO29CQUFBLGlCQXFDQztvQkFwQ1UsWUFBTyxHQUFHO3dCQUNiLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO3dCQUVoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDMUIsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDbEQsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2hDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM3QixDQUFDO3dCQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2hCLENBQUMsQ0FBQztvQkFFSyxnQkFBVyxHQUFHO3dCQUNqQixJQUFJLElBQUksR0FBRyxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQzFCLElBQUksV0FBVyxHQUFHLG9CQUFvQixDQUFDO3dCQUN2QyxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7d0JBRWxCLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ25DLE9BQU8sS0FBSyxFQUFFLENBQUM7NEJBQ1gsSUFBSSxTQUFTLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDN0MsSUFBSSxLQUFLLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFFekMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQzs0QkFDNUIsS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ25DLENBQUM7d0JBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQztvQkFDcEIsQ0FBQyxDQUFDO29CQUVLLGNBQVMsR0FBRzt3QkFDZixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7b0JBQzlCLENBQUMsQ0FBQztvQkFFTSxrQkFBYSxHQUFHLFVBQUMsQ0FBUzt3QkFDOUIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3JELENBQUMsQ0FBQztnQkFDTixDQUFDO2dCQUFELHFCQUFDO1lBQUQsQ0FyQ0EsQUFxQ0MsSUFBQTtZQXJDRCxvQ0FxQ0MsQ0FBQSIsImZpbGUiOiJ1cmwtaGFzaC1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXJsSGFzaFNlcnZpY2Uge1xyXG4gICAgcHVibGljIGdldEhhc2ggPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICB2YXIgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xyXG5cclxuICAgICAgICBpZiAoaGFzaC5pbmRleE9mKCcjLycpID4gLTEpIHtcclxuICAgICAgICAgICAgaGFzaCA9IGhhc2guc3Vic3RyaW5nKGhhc2guaW5kZXhPZignIy8nKSArIDIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaGFzaC5pbmRleE9mKCcjJykgPiAtMSkge1xyXG4gICAgICAgICAgICBoYXNoID0gaGFzaC5zdWJzdHJpbmcoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBoYXNoO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgcHVibGljIGdldEhhc2hEYXRhID0gKCk6IGFueSA9PiB7XHJcbiAgICAgICAgdmFyIGhhc2ggPSB0aGlzLmdldEhhc2goKTtcclxuICAgICAgICB2YXIgc2VhcmNoUmVnZXggPSAvKFteJj1dKyk9PyhbXiZdKikvZztcclxuICAgICAgICB2YXIgaGFzaERhdGEgPSB7fTtcclxuXHJcbiAgICAgICAgdmFyIG1hdGNoID0gc2VhcmNoUmVnZXguZXhlYyhoYXNoKTtcclxuICAgICAgICB3aGlsZSAobWF0Y2gpIHtcclxuICAgICAgICAgICAgdmFyIHBhcmFtZXRlciA9IHRoaXMuZGVjb2RlVXJsRGF0YShtYXRjaFsxXSk7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuZGVjb2RlVXJsRGF0YShtYXRjaFsyXSk7XHJcblxyXG4gICAgICAgICAgICBoYXNoRGF0YVtwYXJhbWV0ZXJdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIG1hdGNoID0gc2VhcmNoUmVnZXguZXhlYyhoYXNoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBoYXNoRGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGNsZWFySGFzaCA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcnO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGRlY29kZVVybERhdGEgPSAoczogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHMucmVwbGFjZSgvXFwrL2csICcgJykpO1xyXG4gICAgfTtcclxufSJdfQ==
