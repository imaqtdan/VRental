Ext.define('RentalApp.model.CartItem', {
    extend: 'RentalApp.model.Base',

    fields: [
        { name: 'movieId', type: 'int', useNull: true },
        { name: 'title', type: 'string' },
    ]
    
});