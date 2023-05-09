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
                                        originId: 0,
                                        rentStatus: false
                                    });
                                });
                                var rentalsStore = Ext.getStore('rentals');
                                rentalsStore.add(rentalCartData);
                                rentalsStore.sync({
                                    success: function(batch, options) {
                                        var transactionsStore = Ext.create('RentalApp.store.Transactions');
                                        var transactionDate = new Date().toISOString();
                                        var transactionData = {
                                            transactionId: 0,
                                            customerId: customer,
                                            transactionDate: transactionDate,
                                            transactionAmount: rentalsStore.sum('rentalCost')
                                        };
                                        console.log("Transaction Data",transactionData);
                                        transactionsStore.add(transactionData);
                                        transactionsStore.sync();
                                        transactionsStore.load({
                                            callback: function(records, operation, success) {
                                                if (success && transactionsStore.getCount() > 0) {
                                                    // Get the latest transaction record
                                                    var latestTransaction = transactionsStore.last();
                                                    // Get the ID of the latest transaction
                                                    var transactionId = latestTransaction.get('transactionId');

                                                    // Set the originId of each rental item in rentalCartData to the transactionId
                                                    for (var i = 0; i < rentalCartData.length; i++) {
                                                        rentalCartData[i].originId = transactionId;
                                                    }

                                                    var grid = Ext.ComponentQuery.query('transactionslist')[0];
                                                    grid.getStore().reload();

                                                } else {
                                                    // Failure handler for loading transaction store
                                                }
                                            }
                                        });
                                        // Get the count of the rentalCartData array
                                        var rentalCartCount = rentalCartData.length;
                                        console.log("Count of Array",rentalCartCount);
                                        setTimeout(function() {
                                        // Get the last rentalId in rentalsStore2
                                        var rentalsStore2 = Ext.create('RentalApp.store.Rentals');
                                        rentalsStore2.load({
                                            callback: function(records, operation, success) {
                                                var lastRentalId = rentalsStore2.getAt(rentalsStore2.getCount() - 1).get('rentalId');
                                                var rentalCartCount = rentalCartData.length;
                                                for (var i = rentalCartCount - 1; i >= 0; i--) {
                                                    rentalCartData[i].rentalId = lastRentalId - (rentalCartCount - 1 - i);
                                                    rentalCartData[i].Id = rentalCartData[i].rentalId; // Add a trueId property
                                                    var rentalRecord = rentalsStore2.findRecord('rentalId', rentalCartData[i].rentalId);
                                                    if (rentalRecord) {
                                                        rentalCartData[i].Id = rentalRecord.get('rentalId'); // Set the trueId property
                                                    }
                                                }

                                                console.log('Load success?', success);
                                                if (success) {
                                                    // Loop through the rentalCartData and update the corresponding rental records
                                                    for (var i = 0; i < rentalCartData.length; i++) {
                                                        var rentalRecord = rentalsStore2.findRecord('rentalId', rentalCartData[i].Id); // Use the trueId property
                                                        if (rentalRecord) {
                                                            rentalRecord.set(rentalCartData[i]);
                                                            rentalRecord.set('id', rentalCartData[i].rentalId); // Set the id property to rentalId
                                                        } else {
                                                            console.log('Could not find rental record with trueId', rentalCartData[i].Id);
                                                        }
                                                    }
                                                                                            
                                                    console.log("PAYLOAD BEFORE SYNC",rentalCartData);
                                                    
                                                    
                                                        rentalsStore2.sync({
                                                            success: function(batch, options) {
                                                                console.log('Sync success');
                                                            },
                                                            failure: function(batch, options) {
                                                                console.log('Sync error');
                                                                var error = batch.exceptions[0].getError(); // Get the error message
                                                                console.log(error);
                                                            }
                                                        });
                                                } else {
                                                    console.log('Load error');
                                                }
                                            }
                                        });
                                        }, 2000);

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
                                                    // var grid = Ext.ComponentQuery.query('rentalslist')[0];
                                                    // grid.getStore().reload();
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
        },
        
    },

    viewModel: {
        formulas: {
            totalRentalPrice: function(get) {
                var cartItems = get('cartItems');
                var total = 0;
                cartItems.each(function(item) {
                    total += item.get('rentalPrice');
                });
                return '₱' + total.toFixed(2);
            }
        }
    }
});