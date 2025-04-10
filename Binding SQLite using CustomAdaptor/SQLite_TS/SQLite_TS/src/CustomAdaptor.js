"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomAdaptor = void 0;
var ej2_data_1 = require("@syncfusion/ej2-data");
var CustomAdaptor = /** @class */ (function (_super) {
    __extends(CustomAdaptor, _super);
    function CustomAdaptor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomAdaptor.prototype.processResponse = function () {
        // Calling base class processResponse function.
        var original = _super.prototype.processResponse.apply(this, arguments);
        return original;
    };
    CustomAdaptor.prototype.insert = function (dm, data) {
        return {
            url: dm.dataSource.insertUrl || dm.dataSource.url,
            data: JSON.stringify({
                __RequestVerificationToken: "Syncfusion",
                value: data,
                action: 'insert'
            }),
            type: 'POST'
        };
    };
    CustomAdaptor.prototype.update = function (dm, keyField, value) {
        return {
            url: dm.dataSource.updateUrl || dm.dataSource.url,
            data: JSON.stringify({
                __RequestVerificationToken: "Syncfusion",
                value: value,
                action: 'update'
            }),
            type: 'POST'
        };
    };
    CustomAdaptor.prototype.remove = function (dm, keyField, value) {
        return {
            url: dm.dataSource.removeUrl || dm.dataSource.url,
            data: JSON.stringify({
                __RequestVerificationToken: "Syncfusion",
                key: value,
                keyColumn: keyField,
                action: 'remove'
            }),
            type: 'POST'
        };
    };
    return CustomAdaptor;
}(ej2_data_1.UrlAdaptor));
exports.CustomAdaptor = CustomAdaptor;
//# sourceMappingURL=CustomAdaptor.js.map