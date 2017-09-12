define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UrlHashService = (function () {
        function UrlHashService() {
            var _this = this;
            this.getHash = function (hashValue) {
                var hash = hashValue ? hashValue : window.location.hash;
                if (hash.indexOf('#/') > -1) {
                    hash = hash.substring(hash.indexOf('#/') + 2);
                }
                else if (hash.indexOf('#') > -1) {
                    hash = hash.substring(1);
                }
                return hash;
            };
            this.getHashData = function (hashValue) {
                var hash = _this.getHash(hashValue);
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
    exports.default = UrlHashService;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91cmwtaGFzaC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBO1FBQUE7WUFBQSxpQkFxQ0M7WUFwQ1UsWUFBTyxHQUFHLFVBQUMsU0FBa0I7Z0JBQ2hDLElBQUksSUFBSSxHQUFHLFNBQVMsR0FBRyxTQUFTLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBRXhELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQixJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLENBQUM7Z0JBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNoQixDQUFDLENBQUM7WUFFSyxnQkFBVyxHQUFHLFVBQUMsU0FBa0I7Z0JBQ3BDLElBQU0sSUFBSSxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3JDLElBQU0sV0FBVyxHQUFHLG9CQUFvQixDQUFDO2dCQUN6QyxJQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7Z0JBRXBCLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25DLE9BQU8sS0FBSyxFQUFFLENBQUM7b0JBQ1gsSUFBTSxTQUFTLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDL0MsSUFBTSxLQUFLLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFM0MsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQztvQkFDNUIsS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25DLENBQUM7Z0JBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNwQixDQUFDLENBQUM7WUFFSyxjQUFTLEdBQUc7Z0JBQ2YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQzlCLENBQUMsQ0FBQztZQUVNLGtCQUFhLEdBQUcsVUFBQyxDQUFTO2dCQUM5QixNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNyRCxDQUFDLENBQUM7UUFDTixDQUFDO1FBQUQscUJBQUM7SUFBRCxDQXJDQSxBQXFDQyxJQUFBIiwiZmlsZSI6InVybC1oYXNoLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBVcmxIYXNoU2VydmljZSB7XHJcbiAgICBwdWJsaWMgZ2V0SGFzaCA9IChoYXNoVmFsdWU/OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gICAgICAgIGxldCBoYXNoID0gaGFzaFZhbHVlID8gaGFzaFZhbHVlIDogd2luZG93LmxvY2F0aW9uLmhhc2g7XHJcblxyXG4gICAgICAgIGlmIChoYXNoLmluZGV4T2YoJyMvJykgPiAtMSkge1xyXG4gICAgICAgICAgICBoYXNoID0gaGFzaC5zdWJzdHJpbmcoaGFzaC5pbmRleE9mKCcjLycpICsgMik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChoYXNoLmluZGV4T2YoJyMnKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIGhhc2ggPSBoYXNoLnN1YnN0cmluZygxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBoYXNoO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0SGFzaERhdGEgPSAoaGFzaFZhbHVlPzogc3RyaW5nKTogYW55ID0+IHtcclxuICAgICAgICBjb25zdCBoYXNoID0gdGhpcy5nZXRIYXNoKGhhc2hWYWx1ZSk7XHJcbiAgICAgICAgY29uc3Qgc2VhcmNoUmVnZXggPSAvKFteJj1dKyk9PyhbXiZdKikvZztcclxuICAgICAgICBjb25zdCBoYXNoRGF0YSA9IHt9O1xyXG5cclxuICAgICAgICBsZXQgbWF0Y2ggPSBzZWFyY2hSZWdleC5leGVjKGhhc2gpO1xyXG4gICAgICAgIHdoaWxlIChtYXRjaCkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJhbWV0ZXIgPSB0aGlzLmRlY29kZVVybERhdGEobWF0Y2hbMV0pO1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZGVjb2RlVXJsRGF0YShtYXRjaFsyXSk7XHJcblxyXG4gICAgICAgICAgICBoYXNoRGF0YVtwYXJhbWV0ZXJdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIG1hdGNoID0gc2VhcmNoUmVnZXguZXhlYyhoYXNoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBoYXNoRGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGNsZWFySGFzaCA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcnO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGRlY29kZVVybERhdGEgPSAoczogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHMucmVwbGFjZSgvXFwrL2csICcgJykpO1xyXG4gICAgfTtcclxufSJdfQ==
