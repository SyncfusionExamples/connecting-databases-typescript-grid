import { Grid, Edit, Toolbar, Filter, Sort, Page } from '@syncfusion/ej2-grids';
import { DataManager } from '@syncfusion/ej2-data';
import { CustomAdaptor } from './CustomAdaptor';


Grid.Inject(Edit, Toolbar, Filter, Sort, Page);

let data: DataManager = new DataManager({
    url: 'https://localhost:7200/api/Grid',
    insertUrl: 'https://localhost:7200/api/Grid/Insert',
    updateUrl: 'https://localhost:7200/api/Grid/Update',
    removeUrl: 'https://localhost:7200/api/Grid/Remove',
   // batchUrl: 'https://localhost:7200/api/Grid/BatchUpdate',
    adaptor: new CustomAdaptor()
});

let grid: Grid = new Grid({
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