Ext.define('RentalApp.view.main.CustomerForm', {
    extend: 'Ext.window.Window',
    xtype: 'customerform',

    title: 'Edit Customer',
    modal: true,
    width: 400,
    height: 400,
    layout: 'fit',

    config: {
        grid: null
    },

    items: [{
        xtype: 'form',
        reference: 'form',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        bodyPadding: 10,
        fieldDefaults: {
            labelAlign: 'top',
            msgTarget: 'side',
            anchor: '100%'
        },
        items: [{
            xtype: 'hiddenfield',
            name: 'customerId',
            bind: '{customer.customerId}'
        }, {
            xtype: 'textfield',
            name: 'firstName',
            fieldLabel: 'First Name',
            bind: '{customer.firstName}',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'lastName',
            fieldLabel: 'Last Name',
            bind: '{customer.lastName}',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'emailAddress',
            fieldLabel: 'Email Address',
            bind: '{customer.emailAddress}',
            vtype: 'email'
        }, {
            xtype: 'textfield',
            name: 'phoneNumber',
            fieldLabel: 'Phone Number',
            bind: '{customer.phoneNumber}'
        }, {
            xtype: 'textfield',
            name: 'address',
            fieldLabel: 'Address',
            bind: '{customer.address}'
        }],
        buttons: [{
            text: 'Save',
            formBind: true,
            disabled: true,
            handler: function(btn) {
                var form = btn.up('customerform').down('form');
                var grid = btn.up('customerform').getConfig('grid');
                if (form.isValid()) {
                    var values = form.getValues();
                    var store = grid.getStore();
                    var selectedRecord = grid.getSelectionModel().getSelection()[0];
                    selectedRecord.set(values);
                    store.sync({
                        success: function() {
                            Ext.toast('Customer data updated successfully');
                            grid.getSelectionModel().deselectAll();
                            form.reset();
                            btn.up('window').close();
                        },
                        failure: function(batch, options) {
                            Ext.toast('Failed to update customer data');
                        },
                        scope: this
                    });
                } else {
                    Ext.toast('Please fill out all required fields');
                }
            }
        }, {
            text: 'Cancel',
            handler: function(btn) {
                btn.up('window').close();
            }
        }]
    }]
});
