Ext.define('RentalApp.view.main.CustomersListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.customerslist',

    onSearchFieldChange: function(field, newValue) {
        var grid = this.getView();
        var store = grid.getStore();
    
        if (store) { // Check if store is not null
            if (newValue) {
                store.clearFilter();
                store.filterBy(function(record) {
                    var regex = new RegExp(newValue, 'i');
                    return regex.test(record.get('firstName')) ||
                        regex.test(record.get('lastName')) ||
                        regex.test(record.get('emailAddress')) ||
                        regex.test(record.get('phoneNumber')) ||
                        regex.test(record.get('address'));
                });
            } else {
                store.clearFilter();
            }
        }
    },

    onSearchButtonClick: function(button) {
        var searchField = this.lookupReference('searchField');
        var searchValue = searchField.getValue();
        this.onSearchFieldChange(searchField, searchValue);
    }

});