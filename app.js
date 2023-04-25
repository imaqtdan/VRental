/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'RentalApp.Application',

    name: 'RentalApp',

    requires: [
        // This will automatically load all classes in the RentalApp namespace
        // so that application classes do not need to require each other.
        'RentalApp.*'
    ],

    // The name of the initial view to create.
    mainView: 'RentalApp.view.main.Main'
});
