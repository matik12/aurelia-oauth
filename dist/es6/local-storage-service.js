System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var LocalStorageService;
    return {
        setters: [],
        execute: function () {
            LocalStorageService = (function () {
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
            exports_1("default", LocalStorageService);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvY2FsLXN0b3JhZ2Utc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBQUE7Z0JBQUE7Z0JBZ0JBLENBQUM7Z0JBZlUsZ0RBQWtCLEdBQXpCO29CQUNJLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxLQUFLLFNBQVMsQ0FBQztnQkFDN0MsQ0FBQztnQkFFTSxpQ0FBRyxHQUFWLFVBQWMsR0FBVyxFQUFFLE1BQVM7b0JBQ2hDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzdELENBQUM7Z0JBRU0saUNBQUcsR0FBVixVQUFjLEdBQVc7b0JBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELENBQUM7Z0JBRU0sb0NBQU0sR0FBYixVQUFjLEdBQVc7b0JBQ3JCLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QyxDQUFDO2dCQUNMLDBCQUFDO1lBQUQsQ0FoQkEsQUFnQkMsSUFBQTs7UUFBQSxDQUFDIiwiZmlsZSI6ImxvY2FsLXN0b3JhZ2Utc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIExvY2FsU3RvcmFnZVNlcnZpY2Uge1xyXG4gICAgcHVibGljIGlzU3RvcmFnZVN1cHBvcnRlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQ8VD4oa2V5OiBzdHJpbmcsIG9iamVjdDogVCk6IHZvaWQge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KG9iamVjdCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQ8VD4oa2V5OiBzdHJpbmcpOiBUIHtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZShrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgfVxyXG59Il19
