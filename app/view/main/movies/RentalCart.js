Ext.define('RentalApp.view.main.RentalCart', {
    extend: 'Ext.window.Window',
    xtype: 'rentalcart',

    title: 'Rental Cart',
    modal: true,
    width: 900,
    closable: true,
    resizable: false,
    autoShow: true,

    items: [{
        xtype: 'combo',
        reference: 'customerCombo',
        fieldLabel: 'Customer',
        displayField: 'customerId',
        valueField: 'customerId',
        bind: {
            store: '{customers}'
        },
        editable: true,
        typeAhead: true,
    }, {
        xtype: 'cartlist',
        reference: 'cartList',
        bind: {
            store: '{cartItems}'
        }
    }, {

        dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: [{
                xtype: 'displayfield',
                fieldLabel: 'Total Rental Price',
                labelWidth: 120,
                bind: {
                    value: '{totalRentalPrice}'
                }
            }, '->', {
                xtype: 'button',
                text: 'Proceed',
                handler: function() {
                    var me = this.up('window');
                    var customerCombo = me.down('combo[reference=customerCombo]');
                    var customer = customerCombo.getValue();  
                    var cartItemsStore = Ext.create('RentalApp.store.CartItems');
                    cartItemsStore.load({
                        callback: function(records, operation, success) {
                            if (success) {
                                cartItemsStore.each(function(record) {
                                    record.set('customer', customer);
                                });
                                var rentalCartData = [];
                                cartItemsStore.each(function(record) {
                                    var rentalDate = new Date(record.get('rentalDate'));
                                    var returnDate = new Date(record.get('returnDate'));
                                    rentalCartData.push({
                                        rentalId: 0,
                                        customerId: customer,
                                        movieId: record.get('movieId'), 
                                        rentalDate: rentalDate.toISOString(),
                                        returnDate: returnDate.toISOString(),
                                        rentalCost: record.get('rentalPrice'),
                                        overdueCost: 0,
                                        originId: 2,
                                        rentStatus: false
                                    });
                                });
                                var rentalsStore = Ext.getStore('rentals');
                                rentalsStore.add(rentalCartData);
                                rentalsStore.sync({
                                    success: function(batch, options) {
                                        var cartItemsStore = Ext.create('RentalApp.store.CartItems');
                                        cartItemsStore.load({
                                            callback: function(records, operation, success) {
                                                if (success && cartItemsStore.getCount() > 0) {
                                                    cartItemsStore.each(function(record) {
                                                        var trueid = record.get('cartId');
                                                        record.set('id', trueid);
                                                    });
                                                    cartItemsStore.removeAll();
                                                    cartItemsStore.sync();
                                                    me.getViewModel().set('cartItems', cartItemsStore);
                                                    Ext.toast('Rental Cart submitted successfully', 'Success');
                                                    me.close();
                                                } else {
                                                    Ext.toast('Failed to remove cart items: no records found', 'Error');
                                                }
                                            }
                                        });
                                    },
                                    failure: function(batch, options) {
                                        var error = batch.getOperations()[0].getError();
                                        console.log('Error:', error);
                                        Ext.toast('Failed to submit rental cart: ' + error.statusText, 'Error');
                                    }
                                });
                            } else {
                                Ext.toast('Failed to load Cart Items', 'Failed');
                            }
                        }
                    });
                }
            }, {
                xtype: 'button',
                text: 'Cancel',
                handler: function() {
                    this.up('window').close();
                }
            }]
        }]
    }],

    listeners: {
        afterrender: function() {
            var me = this;
            var cartItemsStore = Ext.create('RentalApp.store.CartItems');
            cartItemsStore.load({
                callback: function(records, operation, success) {
                    if (success) {
                        me.getViewModel().set('cartItems', cartItemsStore);
                    } else {
                        Ext.toast('Failed to load Cart Items', 'Failed ');
                    }
                }
            });
            console.log("TEST", cartItemsStore);
        },
        
    },

    viewModel: {
        data: {
            totalRentalPrice: '₱0.00'
        }
    }
});