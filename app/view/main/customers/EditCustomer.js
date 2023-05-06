Ext.define('RentalApp.view.main.EditCustomerModal', {
    extend: 'Ext.window.Window',
    xtype: 'editcustomermodal',
    
    title: 'Edit Customer',
    modal: true,
    width: 400,
    layout: 'fit',
    closable: true,
    resizable: false,
    autoShow: true,
    
    config: {
        customer: null
    },

    items: [{
        xtype: 'form',
        reference: 'editCustomerForm',
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
            name: 'id',
            bind: '{customer.customerId}'
        }, {
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
            var customer = me.up('window').getCustomer();
            form.updateRecord(customer);
            var store = me.up('window').grid.getStore();
            store.sync({
                success: function(){
                    Ext.toast('Customer Updated.', 'Success');
                    console.log('Update Operation Success');
                },
                failure: function(){
                    Ext.toast('Failed to Update Customer', 'Failed');
                    console.log('Update Operation Failed');
                }
            });
            me.up('window').close();
        }
    }, {
        text: 'Cancel',
        handler: function() {
            var me = this;
            var grid = Ext.ComponentQuery.query('customerslist')[0];
            grid.getStore().reload();
            me.up('window').close();
        }
    }]
});
