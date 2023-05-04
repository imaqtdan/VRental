Ext.define('RentalApp.model.Movies', {
    extend: 'RentalApp.model.Base',

    fields: [
        { name: 'movieId', type: 'int', useNull: true },
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'genre', type: 'string' },
        { name: 'rentalPrice', type: 'float' },
        { name: 'stock', type: 'int' },
        { name: 'isActive', type: 'bool' }
    ]
});