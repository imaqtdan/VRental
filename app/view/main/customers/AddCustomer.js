Ext.define('RentalApp.view.main.AddCustomerWindow', {
    extend: 'Ext.window.Window',
    xtype: 'addcustomerwindow',

    title: 'Add Customer',
    width: 400,
    layout: 'fit',
    modal: true,

    items: [{
        xtype: 'form',
        bodyPadding: 10,
        defaultType: 'textfield',
        items: [{
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
                var store = Ext.getStore('customers');
                store.add(values);
                store.sync({
                    success: function() {
                        Ext.toast('Customer added successfully', 'Success');
                        button.up('window').close();
                    },
                    failure: function() {
                        Ext.toast('Failed to add customer', 'Error');
                    }
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