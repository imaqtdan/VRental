/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('RentalApp.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    stores: {
        customers: {
            type: 'customers'
        },
        movies: {
            type: 'movies'
        },
        rentals: {
            storeId: 'rentals',
            type: 'rentals'
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
        rentalspage: 'Rental List',
    },

    //TODO - add data, formulas and/or methods to support your view
});
