import { UrlAdaptor } from '@syncfusion/ej2-data';
export class CustomAdaptor extends UrlAdaptor {
    public override processResponse(): any {
        // Calling base class processResponse function.
        const original: any = super.processResponse.apply(this, arguments as any);
        return original;
    }
    public override insert(dm: any, data: any): any {
        return {
            url: dm.dataSource.insertUrl || dm.dataSource.url,
            data: JSON.stringify({
                __RequestVerificationToken: "Syncfusion",
                value: data,
                action: 'insert'
            }),
            type: 'POST'
        };
    }

    public override update(dm: any, keyField: string, value: any): any {
        return {
            url: dm.dataSource.updateUrl || dm.dataSource.url,
            data: JSON.stringify({
                __RequestVerificationToken: "Syncfusion",
                value: value,
                action: 'update'
            }),
            type: 'POST'
        };
    }

    public override remove(dm: any, keyField: string, value: any): any {
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
    }
}
