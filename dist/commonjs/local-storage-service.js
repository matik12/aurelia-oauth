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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvY2FsLXN0b3JhZ2Utc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7SUFBQTtJQWdCQSxDQUFDO0lBZlUsZ0RBQWtCLEdBQXpCO1FBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEtBQUssU0FBUyxDQUFDO0lBQzdDLENBQUM7SUFFTSxpQ0FBRyxHQUFWLFVBQWMsR0FBVyxFQUFFLE1BQVM7UUFDaEMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRU0saUNBQUcsR0FBVixVQUFjLEdBQVc7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRU0sb0NBQU0sR0FBYixVQUFjLEdBQVc7UUFDckIsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUNMLDBCQUFDO0FBQUQsQ0FoQkEsQUFnQkMsSUFBQSIsImZpbGUiOiJsb2NhbC1zdG9yYWdlLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBpc1N0b3JhZ2VTdXBwb3J0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2UgIT09IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0PFQ+KGtleTogc3RyaW5nLCBvYmplY3Q6IFQpOiB2b2lkIHtcclxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShvYmplY3QpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0PFQ+KGtleTogc3RyaW5nKTogVCB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmUoa2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgIH1cclxufSJdfQ==
