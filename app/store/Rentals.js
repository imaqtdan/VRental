Ext.define('RentalApp.store.Rentals', {
    extend: 'Ext.data.Store',
    alias: 'store.rentals',
    
    model: 'RentalApp.model.Rentals',

    proxy: {
        type: 'rest',
        api: {
            read: 'http://localhost:5283/api/Rentals',
            create: 'http://localhost:5283/api/Rentals/New',
            update: 'http://localhost:5283/api/Rentals/Edit',
            destroy: 'http://localhost:5283/api/Rentals/Delete'
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
    },

    pageSize: 10
});