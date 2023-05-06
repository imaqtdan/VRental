Ext.define('RentalApp.view.main.AddCustomerModal', {
    extend: 'Ext.window.Window',
    xtype: 'addcustomermodal',
    
    title: 'Add Customer',
    modal: true,
    width: 400,
    layout: 'fit',
    closable: true,
    resizable: false,
    autoShow: true,
    
    items: [{
        xtype: 'form',
        reference: 'addCustomerForm',
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
            xtype: 'textfield',
            fieldLabel: 'First Name',
            name: 'firstName',
            bind: '{customer.firstName}',
            allowBlank: false
        }, {
            xtype: 'textfield',
            fieldLabel: 'Last Name',
            name: 'lastName',
            bind: '{customer.lastName}',
            allowBlank: false
        }, {
            xtype: 'textfield',
            fieldLabel: 'Email Address',
            name: 'emailAddress',
            bind: '{customer.emailAddress}',
            allowBlank: false,
            vtype: 'email'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Phone Number',
            name: 'phoneNumber',
            bind: '{customer.phoneNumber}',
            allowBlank: false,
            inputMask: '99999999999',
            validator: function(value) {
                if (!/^\d{11}$/.test(value)) {
                    return 'Phone number must be 11 digits long';
                }
                return true;
            }
        }, {
            xtype: 'textarea',
            fieldLabel: 'Address',
            name: 'address',
            bind: '{customer.address}',
            allowBlank: false
        }]
    }],
    
    buttons: [{
        text: 'Save',
        formBind: true,
        disabled: true,
        listeners: {
            beforerender: function(button) {
                var form = button.up('window').down('form');
                form.on('validitychange', function(form, valid) {
                    button.setDisabled(!valid);
                });
            }
        },
        handler: function() {
            var me = this;
            var form = me.up('window').down('form');
            var values = form.getValues();
            var grid = Ext.ComponentQuery.query('customerslist')[0];
            var store = grid.getStore();
            var newCustomer = Ext.create('RentalApp.model.Customers', values);
            store.add(newCustomer);
            store.sync({
                success: function(){
                    Ext.toast('Customer Added.', 'Success');
                    console.log('Add Operation Success');
                    var grid = Ext.ComponentQuery.query('customerslist')[0];
                    grid.getStore().reload();
                },
                failure: function(){
                    Ext.toast('Failed to Add Customer', 'Failed ');
                    console.log('Add Operation Failed');
                    var grid = Ext.ComponentQuery.query('customerslist')[0];
                    grid.getStore().reload();
                }
            });
            me.up('window').close();
        }
    }, {
        text: 'Cancel',
        handler: function() {
            this.up('window').close();
        }
    }]
});