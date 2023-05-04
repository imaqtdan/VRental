Ext.define('RentalApp.store.Movies', {
    extend: 'Ext.data.Store',
    alias: 'store.movies',
    
    model: 'RentalApp.model.Movies',

    proxy: {
        type: 'rest',
        api: {
            read: 'http://localhost:5283/api/Movies',
            create: 'http://localhost:5283/api/Movies/New',
            update: 'http://localhost:5283/api/Movies/Edit',
            destroy: 'http://localhost:5283/api/Movies/Delete'
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