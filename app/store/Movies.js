Ext.define('RentalApp.store.Movies', {
    extend: 'Ext.data.Store',
    alias: 'store.movies',
    model: 'RentalApp.model.Movies',

    proxy: {
        type: 'rest',
        url: 'http://localhost:5283/api/Movies',
        reader: {
            type: 'json',
            rootProperty: 'items'
        },
        writer: {
            type: 'json'
        },
        api: {
            create: 'http://localhost:5283/api/Movies/New',
            update: 'http://localhost:5283/api/Movies/Update',
            destroy: 'http://localhost:5283/api/Movies/Delete'
        }
    },

    //autoLoad: true,
    //autoSync: true
});