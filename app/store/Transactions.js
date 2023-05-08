Ext.define('RentalApp.store.Transactions', {
    extend: 'Ext.data.Store',
    alias: 'store.transactions',
    
    model: 'RentalApp.model.Transactions',

    proxy: {
        type: 'rest',
        api: {
            read: 'http://localhost:5283/api/Transactions',
            create: 'http://localhost:5283/api/Transactions/New',
            update: 'http://localhost:5283/api/Transactions/Edit',
            destroy: 'http://localhost:5283/api/Transactions/Delete'
        },
        cors: true,
        useDefaultXhrHeader: false,
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            dateFormat: 'c'
        },
        actionMethods: {
            create: 'POST',
            read: 'GET',
            update: 'PUT',
            destroy: 'DELETE'
        }
    },

    pageSize: 20
});