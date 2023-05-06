Ext.define('RentalApp.store.CartItems', {
    extend: 'Ext.data.Store',
    alias: 'store.cartItems',

    model: 'RentalApp.model.CartItem',

    proxy: {
        type: 'localstorage',
        id: 'cartItems'
    },

    // listeners: {
    //     add: function(store, records) {
    //         console.log('Movie added to cart:', records[0]);
    //     }
    // }
});