Ext.define('RentalApp.view.main.AddCustomerModal', {
    extend: 'Ext.window.Window',
    xtype: 'addcustomermodal',
    
    title: 'Add Customer',
    modal: true,
    width: 400,
    height: 400,
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
            allowBlank: false
        }, {
            xtype: 'textfield',
            fieldLabel: 'Last Name',
            name: 'lastName',
            allowBlank: false
        }, {
            xtype: 'textfield',
            fieldLabel: 'Email Address',
            name: 'emailAddress',
            allowBlank: false
        }, {
            xtype: 'textfield',
            fieldLabel: 'Phone Number',
            name: 'phoneNumber',
            allowBlank: false
        }, {
            xtype: 'textfield',
            fieldLabel: 'Address',
            name: 'address',
            allowBlank: false
        }]
    }],
    
    buttons: [{
        text: 'Save',
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
                },
                failure: function(){
                    Ext.toast('Failed to Add Customer', 'Failed ');
                    console.log('Add Operation Failed');
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