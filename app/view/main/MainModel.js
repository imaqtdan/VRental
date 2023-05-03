/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('RentalApp.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    stores: {
        customers: {
            storeId: 'customers', // this is important to retrieve the store later using Ext.getStore('Customers')
            type: 'customers',
            pageSize: 10
        },
        movies: {
            type: 'movies',
            pageSize: 10
        },
    },

    data: {
        name: 'Video Rental',
        customerspage: 'Customer List',
        moviespage: 'Movie List',
    },

    //TODO - add data, formulas and/or methods to support your view
});
