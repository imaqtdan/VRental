/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('RentalApp.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    stores: {
        customers: {
            type: 'customers',
        },
        movies: {
            type: 'movies',
        },
        cartItems: {
            storeId: 'cartItems',
            type: 'cartItems'
        },
    },

    data: {
        name: 'Video Rental',
        customerspage: 'Customer List',
        moviespage: 'Movie List',
    },

    //TODO - add data, formulas and/or methods to support your view
});
