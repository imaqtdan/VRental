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
    },

    onAddCustomerClick: function() {
        var window = Ext.create({
            xtype: 'addcustomerwindow'
        });
    
        window.show();
    
        var saveButton = window.down('button[text=OK]');
        saveButton.on('click', function() {
            var form = window.down('form');
            var values = form.getValues();
    
            var store = Ext.getStore('customers');
            var newRecord = Ext.create('RentalApp.model.Customer', values);
            store.add(newRecord);
    
            store.sync({
                success: function() {
                    Ext.toast('Customer Added.', 'Success');
                    console.log('Add Operation Success');
                },
                failure: function() {
                    Ext.toast('Failed to Add Customer', 'Failed');
                    console.log('Add Operation Failed');
                }
            });
    
            window.close();
        });
    }

});