"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ej2_grids_1 = require("@syncfusion/ej2-grids");
var ej2_data_1 = require("@syncfusion/ej2-data");
var CustomAdaptor_1 = require("./CustomAdaptor");
ej2_grids_1.Grid.Inject(ej2_grids_1.Edit, ej2_grids_1.Toolbar, ej2_grids_1.Page, ej2_grids_1.Filter, ej2_grids_1.Sort);
var data = new ej2_data_1.DataManager({
    url: 'https://localhost:7266/api/Grid',
    insertUrl: 'https://localhost:7266/api/Grid/Insert',
    updateUrl: 'https://localhost:7266/api/Grid/Update',
    removeUrl: 'https://localhost:7266/api/Grid/Remove',
    batchUrl: 'https://localhost:7266/api/Grid/BatchUpdate',
    adaptor: new CustomAdaptor_1.CustomAdaptor()
}); //Use remote server host instead number ****
var grid = new ej2_grids_1.Grid({
    dataSource: data,
    toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'],
    allowPaging: true,
    allowSorting: true,
    allowFiltering: true,
    editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Batch' },
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, isIdentity: true, isPrimaryKey: true, type: 'number' },
        { field: 'CustomerID', width: 140, headerText: 'Customer ID', type: 'string' },
        { field: 'EmployeeID', headerText: 'Employee ID', width: 120 },
        { field: 'Freight', headerText: 'Freight', width: 90, format: 'C2', textAlign: 'Right', type: 'number' },
        { field: 'ShipCity', headerText: 'ShipCity', width: 140 },
    ]
});
grid.appendTo('#Grid');
//# sourceMappingURL=index.js.map