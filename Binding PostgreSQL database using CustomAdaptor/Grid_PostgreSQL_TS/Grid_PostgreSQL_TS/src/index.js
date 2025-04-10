"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ej2_grids_1 = require("@syncfusion/ej2-grids");
var ej2_data_1 = require("@syncfusion/ej2-data");
var CustomAdaptor_1 = require("./CustomAdaptor");
ej2_grids_1.Grid.Inject(ej2_grids_1.Edit, ej2_grids_1.Toolbar, ej2_grids_1.Filter, ej2_grids_1.Sort, ej2_grids_1.Page);
var data = new ej2_data_1.DataManager({
    url: 'https://localhost:7074/api/Grid',
    insertUrl: 'https://localhost:7074/api/Grid/Insert',
    updateUrl: 'https://localhost:7074/api/Grid/Update',
    removeUrl: 'https://localhost:7074/api/Grid/Remove',
    // batchUrl: 'https://localhost:7074/api/Grid/BatchUpdate',
    adaptor: new CustomAdaptor_1.CustomAdaptor()
});
var grid = new ej2_grids_1.Grid({
    dataSource: data,
    allowPaging: true,
    allowSorting: true,
    allowFiltering: true,
    toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'],
    editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' },
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, isIdentity: true, isPrimaryKey: true },
        { field: 'CustomerID', width: 140, headerText: 'Customer ID' },
        { field: 'EmployeeID', headerText: 'Employee ID', width: 120, textAlign: 'Right' },
        { field: 'Freight', headerText: 'Freight', width: 90, format: 'C2', textAlign: 'Right' },
        { field: 'ShipCity', headerText: 'ShipCity', width: 140 },
    ]
});
grid.appendTo('#Grid');
//# sourceMappingURL=index.js.map