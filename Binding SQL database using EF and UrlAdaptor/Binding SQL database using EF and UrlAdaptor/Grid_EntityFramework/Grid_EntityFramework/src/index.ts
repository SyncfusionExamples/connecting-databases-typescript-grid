import { Grid, Toolbar, Filter, Sort, Group, Page, Edit } from '@syncfusion/ej2-grids';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

Grid.Inject(Toolbar, Filter, Sort, Group, Page, Edit);

let data: DataManager = new DataManager({
    url: 'https://localhost:xxxx/api/Grid',
    insertUrl: 'https://localhost:xxxx/api/Grid/Insert',
    updateUrl: 'https://localhost:xxxx/api/Grid/Update',
    removeUrl: 'https://localhost:xxxx/api/Grid/Remove',
    // Enable batch URL when batch editing is enabled.
    //batchUrl: 'https://localhost:xxxx/api/Grid/BatchUpdate',
    adaptor: new UrlAdaptor()
});

let grid: Grid = new Grid({
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
    height: 348
});

grid.appendTo('#Grid');