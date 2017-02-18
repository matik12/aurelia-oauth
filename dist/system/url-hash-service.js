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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVybC1oYXNoLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUFBO2dCQUFBO29CQUFBLGlCQXFDQztvQkFwQ1UsWUFBTyxHQUFHO3dCQUNiLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO3dCQUVoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDMUIsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDbEQsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2hDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM3QixDQUFDO3dCQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2hCLENBQUMsQ0FBQztvQkFFSyxnQkFBVyxHQUFHO3dCQUNqQixJQUFNLElBQUksR0FBRyxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQzVCLElBQU0sV0FBVyxHQUFHLG9CQUFvQixDQUFDO3dCQUN6QyxJQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7d0JBRXBCLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ25DLE9BQU8sS0FBSyxFQUFFLENBQUM7NEJBQ1gsSUFBTSxTQUFTLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDL0MsSUFBTSxLQUFLLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFFM0MsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQzs0QkFDNUIsS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ25DLENBQUM7d0JBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQztvQkFDcEIsQ0FBQyxDQUFDO29CQUVLLGNBQVMsR0FBRzt3QkFDZixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7b0JBQzlCLENBQUMsQ0FBQztvQkFFTSxrQkFBYSxHQUFHLFVBQUMsQ0FBUzt3QkFDOUIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3JELENBQUMsQ0FBQztnQkFDTixDQUFDO2dCQUFELHFCQUFDO1lBQUQsQ0FyQ0EsQUFxQ0MsSUFBQTs7UUFBQSxDQUFDIiwiZmlsZSI6InVybC1oYXNoLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBVcmxIYXNoU2VydmljZSB7XHJcbiAgICBwdWJsaWMgZ2V0SGFzaCA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIGxldCBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XHJcblxyXG4gICAgICAgIGlmIChoYXNoLmluZGV4T2YoJyMvJykgPiAtMSkge1xyXG4gICAgICAgICAgICBoYXNoID0gaGFzaC5zdWJzdHJpbmcoaGFzaC5pbmRleE9mKCcjLycpICsgMik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChoYXNoLmluZGV4T2YoJyMnKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIGhhc2ggPSBoYXNoLnN1YnN0cmluZygxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBoYXNoO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0SGFzaERhdGEgPSAoKTogYW55ID0+IHtcclxuICAgICAgICBjb25zdCBoYXNoID0gdGhpcy5nZXRIYXNoKCk7XHJcbiAgICAgICAgY29uc3Qgc2VhcmNoUmVnZXggPSAvKFteJj1dKyk9PyhbXiZdKikvZztcclxuICAgICAgICBjb25zdCBoYXNoRGF0YSA9IHt9O1xyXG5cclxuICAgICAgICBsZXQgbWF0Y2ggPSBzZWFyY2hSZWdleC5leGVjKGhhc2gpO1xyXG4gICAgICAgIHdoaWxlIChtYXRjaCkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJhbWV0ZXIgPSB0aGlzLmRlY29kZVVybERhdGEobWF0Y2hbMV0pO1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZGVjb2RlVXJsRGF0YShtYXRjaFsyXSk7XHJcblxyXG4gICAgICAgICAgICBoYXNoRGF0YVtwYXJhbWV0ZXJdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIG1hdGNoID0gc2VhcmNoUmVnZXguZXhlYyhoYXNoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBoYXNoRGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGNsZWFySGFzaCA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcnO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGRlY29kZVVybERhdGEgPSAoczogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHMucmVwbGFjZSgvXFwrL2csICcgJykpO1xyXG4gICAgfTtcclxufSJdfQ==
