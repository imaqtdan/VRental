Ext.define('RentalApp.store.CartItems', {
    extend: 'Ext.data.Store',
    alias: 'store.cartItems',

    model: 'RentalApp.model.CartItem',

    // proxy: {
    //     type: 'localstorage',
    //     id: 'cartItems'
    // },

    proxy: {
        type: 'rest',
        api: {
            read: 'http://localhost:5283/api/CartItems',
            create: 'http://localhost:5283/api/CartItems/New',
            update: 'http://localhost:5283/api/CartItems/Edit',
            destroy: 'http://localhost:5283/api/CartItems/Delete'
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
    
});