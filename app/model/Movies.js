Ext.define('RentalApp.model.Movies', {
    extend: 'RentalApp.model.Base',

    fields: [
        { name: 'movieId', type: 'int', useNull: true },
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'genre', type: 'string' },
        { name: 'releaseDate', type: 'date' },
        { name: 'rentalPrice', type: 'float' },
        { name: 'isActive', type: 'bool' }
    ]
});