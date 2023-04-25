Ext.define('RentalApp.view.main.DeleteCustomerWindow', {
    extend: 'Ext.window.Window',
    xtype: 'deletecustomerwindow',

    title: 'Delete Customer',
    width: 400,
    layout: 'fit',
    modal: true,

    config: {
        customerId: null
    },

    items: [{
        xtype: 'form',
        defaultType: 'displayfield',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'label',
            text: 'Are you sure you want to delete this customer?',
            flex: 3
        }, {
            xtype: 'displayfield',
            name: 'confirmMessage',
            flex: 1
        }]
    }],

    buttons: [{
        text: 'Yes',
        handler: function(button) {
            var customerId = button.up('window').getCustomerId();
            var url = 'http://localhost:5283/api/Customers/Delete/' + customerId;
            var options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            fetch(url, options)
                .then(function(response) {
                    if (response.ok) {
                        Ext.toast('Customer deleted successfully', 'Success');
                        customersStore.load();  // loads the store data and triggers the load event
                        button.up('window').close();
                    } else {
                        Ext.toast('Failed to delete customer', 'Error');
                    }
                })
                .catch(function(error) {
                    console.error('Error:', error);
                    Ext.toast('Failed to delete customer', 'Error');
                });
        }
    }, {
        text: 'No',
        handler: function(button) {
            button.up('window').close();
        }
    }]
});