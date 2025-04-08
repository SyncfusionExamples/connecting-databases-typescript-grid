import { Grid, Edit, Filter, Toolbar, Sort, Page } from '@syncfusion/ej2-grids';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { CustomAdaptor } from './CustomAdaptor';

Grid.Inject(Edit, Toolbar, Page, Filter, Sort);

let data: DataManager = new DataManager({
    url: 'https://localhost:7082/api/Grid',
    insertUrl: 'https://localhost:7082/api/Grid/Insert',
    updateUrl: 'https://localhost:7082/api/Grid/Update',
    removeUrl: 'https://localhost:7082/api/Grid/Remove',
    batchUrl: 'https://localhost:7082/api/Grid/BatchUpdate',
    adaptor: new CustomAdaptor()
}); //Use remote server host instead number ****

let grid: Grid = new Grid({
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

