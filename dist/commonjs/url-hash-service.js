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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVybC1oYXNoLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0lBQUE7UUFBQSxpQkFxQ0M7UUFwQ1UsWUFBTyxHQUFHO1lBQ2IsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFFaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbEQsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDO1FBRUssZ0JBQVcsR0FBRztZQUNqQixJQUFJLElBQUksR0FBRyxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUIsSUFBSSxXQUFXLEdBQUcsb0JBQW9CLENBQUM7WUFDdkMsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBRWxCLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDWCxJQUFJLFNBQVMsR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLEtBQUssR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV6QyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUM1QixLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQyxDQUFDO1lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNwQixDQUFDLENBQUM7UUFFSyxjQUFTLEdBQUc7WUFDZixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDOUIsQ0FBQyxDQUFDO1FBRU0sa0JBQWEsR0FBRyxVQUFDLENBQVM7WUFDOUIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FyQ0EsQUFxQ0MsSUFBQTtBQXJDRDtnQ0FxQ0MsQ0FBQSIsImZpbGUiOiJ1cmwtaGFzaC1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXJsSGFzaFNlcnZpY2Uge1xyXG4gICAgcHVibGljIGdldEhhc2ggPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICB2YXIgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xyXG5cclxuICAgICAgICBpZiAoaGFzaC5pbmRleE9mKCcjLycpID4gLTEpIHtcclxuICAgICAgICAgICAgaGFzaCA9IGhhc2guc3Vic3RyaW5nKGhhc2guaW5kZXhPZignIy8nKSArIDIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaGFzaC5pbmRleE9mKCcjJykgPiAtMSkge1xyXG4gICAgICAgICAgICBoYXNoID0gaGFzaC5zdWJzdHJpbmcoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBoYXNoO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgcHVibGljIGdldEhhc2hEYXRhID0gKCk6IGFueSA9PiB7XHJcbiAgICAgICAgdmFyIGhhc2ggPSB0aGlzLmdldEhhc2goKTtcclxuICAgICAgICB2YXIgc2VhcmNoUmVnZXggPSAvKFteJj1dKyk9PyhbXiZdKikvZztcclxuICAgICAgICB2YXIgaGFzaERhdGEgPSB7fTtcclxuXHJcbiAgICAgICAgdmFyIG1hdGNoID0gc2VhcmNoUmVnZXguZXhlYyhoYXNoKTtcclxuICAgICAgICB3aGlsZSAobWF0Y2gpIHtcclxuICAgICAgICAgICAgdmFyIHBhcmFtZXRlciA9IHRoaXMuZGVjb2RlVXJsRGF0YShtYXRjaFsxXSk7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuZGVjb2RlVXJsRGF0YShtYXRjaFsyXSk7XHJcblxyXG4gICAgICAgICAgICBoYXNoRGF0YVtwYXJhbWV0ZXJdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIG1hdGNoID0gc2VhcmNoUmVnZXguZXhlYyhoYXNoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBoYXNoRGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGNsZWFySGFzaCA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcnO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGRlY29kZVVybERhdGEgPSAoczogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHMucmVwbGFjZSgvXFwrL2csICcgJykpO1xyXG4gICAgfTtcclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
