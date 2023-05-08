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
        transactions: {
            storeId: 'transactions',
            type: 'transactions'
        },
    },

    data: {
        name: 'Video Rental',
        customerspage: 'Customer List',
        moviespage: 'Movie List',
        rentalmovielist: 'List of Movies you will rent.',
        rentalspage: 'Rental List',
        transactionspage: 'Transactions List',
    },

    //TODO - add data, formulas and/or methods to support your view
});
