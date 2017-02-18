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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2NhbC1zdG9yYWdlLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFBQTtRQUFBO1FBZ0JBLENBQUM7UUFmVSxnREFBa0IsR0FBekI7WUFDSSxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksS0FBSyxTQUFTLENBQUM7UUFDN0MsQ0FBQztRQUVNLGlDQUFHLEdBQVYsVUFBYyxHQUFXLEVBQUUsTUFBUztZQUNoQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFFTSxpQ0FBRyxHQUFWLFVBQWMsR0FBVztZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFFTSxvQ0FBTSxHQUFiLFVBQWMsR0FBVztZQUNyQixNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBQ0wsMEJBQUM7SUFBRCxDQWhCQSxBQWdCQyxJQUFBIiwiZmlsZSI6ImxvY2FsLXN0b3JhZ2Utc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIExvY2FsU3RvcmFnZVNlcnZpY2Uge1xyXG4gICAgcHVibGljIGlzU3RvcmFnZVN1cHBvcnRlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQ8VD4oa2V5OiBzdHJpbmcsIG9iamVjdDogVCk6IHZvaWQge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KG9iamVjdCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQ8VD4oa2V5OiBzdHJpbmcpOiBUIHtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZShrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgfVxyXG59Il19
