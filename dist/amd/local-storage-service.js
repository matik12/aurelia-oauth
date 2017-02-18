define(["require", "exports"], function (require, exports) {
    "use strict";
    var LocalStorageService = (function () {
        function LocalStorageService() {
        }
        LocalStorageService.prototype.isStorageSupported = function () {
            return window.localStorage !== undefined;
        };
        LocalStorageService.prototype.set = function (key, object) {
            window.localStorage.setItem(key, JSON.stringify(object));
        };
        LocalStorageService.prototype.get = function (key) {
            return JSON.parse(window.localStorage.getItem(key));
        };
        LocalStorageService.prototype.remove = function (key) {
            window.localStorage.removeItem(key);
        };
        return LocalStorageService;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = LocalStorageService;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvY2FsLXN0b3JhZ2Utc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztJQUFBO1FBQUE7UUFnQkEsQ0FBQztRQWZVLGdEQUFrQixHQUF6QjtZQUNJLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxLQUFLLFNBQVMsQ0FBQztRQUM3QyxDQUFDO1FBRU0saUNBQUcsR0FBVixVQUFjLEdBQVcsRUFBRSxNQUFTO1lBQ2hDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUVNLGlDQUFHLEdBQVYsVUFBYyxHQUFXO1lBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUVNLG9DQUFNLEdBQWIsVUFBYyxHQUFXO1lBQ3JCLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFDTCwwQkFBQztJQUFELENBaEJBLEFBZ0JDLElBQUEiLCJmaWxlIjoibG9jYWwtc3RvcmFnZS1zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9jYWxTdG9yYWdlU2VydmljZSB7XHJcbiAgICBwdWJsaWMgaXNTdG9yYWdlU3VwcG9ydGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlICE9PSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldDxUPihrZXk6IHN0cmluZywgb2JqZWN0OiBUKTogdm9pZCB7XHJcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkob2JqZWN0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldDxUPihrZXk6IHN0cmluZyk6IFQge1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlKGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XHJcbiAgICB9XHJcbn0iXX0=
