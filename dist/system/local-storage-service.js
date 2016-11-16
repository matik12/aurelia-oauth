System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var LocalStorageService;
    return {
        setters:[],
        execute: function() {
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
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvY2FsLXN0b3JhZ2Utc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBQUE7Z0JBQUE7Z0JBZ0JBLENBQUM7Z0JBZlUsZ0RBQWtCLEdBQXpCO29CQUNJLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxLQUFLLFNBQVMsQ0FBQztnQkFDN0MsQ0FBQztnQkFFTSxpQ0FBRyxHQUFWLFVBQWMsR0FBVyxFQUFFLE1BQVM7b0JBQ2hDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzdELENBQUM7Z0JBRU0saUNBQUcsR0FBVixVQUFjLEdBQVc7b0JBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELENBQUM7Z0JBRU0sb0NBQU0sR0FBYixVQUFjLEdBQVc7b0JBQ3JCLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QyxDQUFDO2dCQUNMLDBCQUFDO1lBQUQsQ0FoQkEsQUFnQkMsSUFBQTtZQWhCRCx5Q0FnQkMsQ0FBQSIsImZpbGUiOiJsb2NhbC1zdG9yYWdlLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBpc1N0b3JhZ2VTdXBwb3J0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2UgIT09IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0PFQ+KGtleTogc3RyaW5nLCBvYmplY3Q6IFQpOiB2b2lkIHtcclxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShvYmplY3QpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0PFQ+KGtleTogc3RyaW5nKTogVCB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmUoa2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgIH1cclxufSJdfQ==
