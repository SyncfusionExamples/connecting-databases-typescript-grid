"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ej2_grids_1 = require("@syncfusion/ej2-grids");
var ej2_data_1 = require("@syncfusion/ej2-data");
ej2_grids_1.Grid.Inject(ej2_grids_1.Toolbar, ej2_grids_1.Filter, ej2_grids_1.Sort, ej2_grids_1.Group, ej2_grids_1.Page, ej2_grids_1.Edit);
var data = new ej2_data_1.DataManager({
    url: 'https://localhost:7279/api/Grid',
    insertUrl: 'https://localhost:7279/api/Grid/Insert',
    updateUrl: 'https://localhost:7279/api/Grid/Update',
    removeUrl: 'https://localhost:7279/api/Grid/Remove',
    // Enable batch URL when batch editing is enabled.
    batchUrl: 'https://localhost:7279/api/Grid/BatchUpdate',
    adaptor: new ej2_data_1.UrlAdaptor()
});
var grid = new ej2_grids_1.Grid({
    dataSource: data,
    allowGrouping: true,
    allowFiltering: true,
    allowSorting: true,
    allowPaging: true,
    toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'],
    editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 100, isPrimaryKey: true, isIdentity: true, type: 'number' },
        { field: 'CustomerID', headerText: 'Customer ID', validationRules: { required: true }, type: 'string', width: 100 },
        { field: 'EmployeeID', headerText: 'Employee ID', validationRules: { required: true, number: true }, width: 100 },
        { field: 'Freight', headerText: 'Freight', validationRules: { required: true, min: 1, max: 1000 }, textAlign: 'Right', width: 100 },
        { field: 'ShipCity', headerText: 'Ship City', validationRules: { required: true }, textAlign: 'Right', width: 120 }
    ],
    height: 250
});
grid.appendTo('#Grid');
//# sourceMappingURL=index.js.map