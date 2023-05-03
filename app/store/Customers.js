Ext.define('RentalApp.store.Customers', {
    extend: 'Ext.data.Store',
    alias: 'store.customers',

    model: 'RentalApp.model.Customers',

    proxy: {
        type: 'rest',
        api: {
            read: 'http://localhost:5283/api/Customers',
            create: 'http://localhost:5283/api/Customers/New',
            update: 'http://localhost:5283/api/Customers/Update',
            destroy: 'http://localhost:5283/api/Customers/Delete' 
        },
        cors: true,
        useDefaultXhrHeader: false,
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        },
        actionMethods: {
            create: 'POST',
            read: 'GET',
            update: 'PUT',
            destroy: 'DELETE'
        }
    }
    
});