Ext.define('RentalApp.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    stores: {
        customers: {
            type: 'customers'
        },
        movies: {
            storeId: 'movies',
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

});
