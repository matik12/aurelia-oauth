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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2NhbC1zdG9yYWdlLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUFBO2dCQUFBO2dCQWdCQSxDQUFDO2dCQWZVLGdEQUFrQixHQUF6QjtvQkFDSSxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksS0FBSyxTQUFTLENBQUM7Z0JBQzdDLENBQUM7Z0JBRU0saUNBQUcsR0FBVixVQUFjLEdBQVcsRUFBRSxNQUFTO29CQUNoQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxDQUFDO2dCQUVNLGlDQUFHLEdBQVYsVUFBYyxHQUFXO29CQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN4RCxDQUFDO2dCQUVNLG9DQUFNLEdBQWIsVUFBYyxHQUFXO29CQUNyQixNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEMsQ0FBQztnQkFDTCwwQkFBQztZQUFELENBaEJBLEFBZ0JDLElBQUE7O1FBQUEsQ0FBQyIsImZpbGUiOiJsb2NhbC1zdG9yYWdlLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBpc1N0b3JhZ2VTdXBwb3J0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2UgIT09IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0PFQ+KGtleTogc3RyaW5nLCBvYmplY3Q6IFQpOiB2b2lkIHtcclxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShvYmplY3QpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0PFQ+KGtleTogc3RyaW5nKTogVCB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmUoa2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgIH1cclxufSJdfQ==
