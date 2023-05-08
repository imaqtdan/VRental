Ext.define('RentalApp.model.CartItem', {
    extend: 'RentalApp.model.Base',

    fields: [
        { name: 'cartId', type: 'int', useNull: true },
        { name: 'movieId', type: 'int' },
        { name: 'title', type: 'string' },
        { name: 'rentalPrice', type: 'float' },
        { name: 'rentalDate', type: 'date' },
        { name: 'returnDate', type: 'date' }
    ]
    
});