Ext.define('RentalApp.view.main.EditCustomerWindow', {
    extend: 'Ext.window.Window',
    xtype: 'editcustomerwindow',

    title: 'Edit Customer',
    width: 400,
    layout: 'fit',
    modal: true,

    // Pass the customerId to the window as a parameter
    config: {
        customerId: null
    },

    items: [{
        xtype: 'form',
        bodyPadding: 10,
        defaultType: 'textfield',
        items: [{
            fieldLabel: 'ID',
            name: 'customerId',
            allowBlank: false,
            hidden: true
        }, {
            fieldLabel: 'First Name',
            name: 'firstName',
            allowBlank: false
        }, {
            fieldLabel: 'Last Name',
            name: 'lastName',
            allowBlank: false
        }, {
            fieldLabel: 'Email Address',
            name: 'emailAddress',
            allowBlank: false,
            vtype: 'email'
        }, {
            fieldLabel: 'Phone Number',
            name: 'phoneNumber',
            allowBlank: false,
            maskRe: /[0-9]/,
        }, {
            fieldLabel: 'Address',
            name: 'address',
            allowBlank: false
        },]
    }],

    buttons: [{
        text: 'Save',
        handler: function(button) {
            var form = button.up('window').down('form');
            if (form.isValid()) {
                var values = form.getValues();
                var customerId = button.up('editcustomerwindow').getCustomerId();
                var url = 'http://localhost:5283/api/Customers/Edit/' + customerId;
                var options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                };

                fetch(url, options)
                    .then(function(response) {
                        if (response.ok) {
                            Ext.toast('Customer updated successfully', 'Success');
                            customersStore.load();  // loads the store data and triggers the load event
                            button.up('window').close();
                        } else {
                            Ext.toast('Failed to update customer', 'Error');
                        }
                    })
                    .catch(function(error) {
                        console.error('Error:', error);
                        Ext.toast('Failed to update customer', 'Error');
                    });
            }
        }
    }, {
        text: 'Cancel',
        handler: function(button) {
            button.up('window').close();
        }
    }]
});