Ext.define('RentalApp.model.Rentals', {
    extend: 'RentalApp.model.Base',

    fields: [
        { name: 'rentalId', type: 'int', useNull: true },
        { name: 'customerId', type: 'int' },
        { name: 'originId', type: 'int' },
        { name: 'movieId', type: 'int' },
        { name: 'rentalDate', type: 'date' },
        { name: 'returnDate', type: 'date' },
        { name: 'rentalCost', type: 'number' },
        { name: 'overdueCost', type: 'number' },
        { name: 'rentStatus', type: 'boolean' }
    ]
});
