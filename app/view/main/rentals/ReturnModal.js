Ext.define('RentalApp.view.main.EditRentals', {
    extend: 'Ext.window.Window',
    xtype: 'editrentalmodal',
    
    title: 'Edit Rental',
    modal: true,
    width: 400,
    layout: 'fit',
    closable: true,
    resizable: false,
    autoShow: true,
    
    config: {
        rental: null
    },

    items: [{
        xtype: 'form',
        reference: 'editRentalForm',
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
            bind: '{rental.rentalId}',
            allowBlank: false,
        }, {
            xtype: 'checkboxfield',
            fieldLabel: 'Returned',
            name: 'rentStatus',
            bind: '{rental.rentStatus}',
            boxLabel: 'Available',
            inputValue: true,
            uncheckedValue: false,
            allowBlank: false
        },]
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
            var rental = me.up('window').getRental();
            form.updateRecord(rental);
            var store = me.up('window').grid.getStore();
            store.sync({
                success: function(){
                    Ext.toast('Movie Updated.', 'Success');
                    console.log('Update Operation Success');
                },
                failure: function(){
                    Ext.toast('Failed to Update Movie', 'Failed');
                    var grid = Ext.ComponentQuery.query('movieslist')[0];
                    grid.getStore().reload();
                    console.log('Update Operation Failed');
                }
            });
            me.up('window').close();
        }
    }, {
        text: 'Cancel',
        handler: function() {
            var me = this;
            var grid = Ext.ComponentQuery.query('movieslist')[0];
            grid.getStore().reload();
            me.up('window').close();
        }
    }]
});

Ext.define('CustomVtypes', {
    override: 'Ext.form.field.VTypes',

    customDecimal: function(value) {
        return /^\d+(\.\d{1,2})?$/.test(value);
    },
    customDecimalText: 'Please enter a valid decimal number with up to two decimal places.'
});
