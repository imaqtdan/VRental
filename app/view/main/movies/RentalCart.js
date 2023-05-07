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
        listeners: {
            select: function(combo, record, eOpts) {
                // Handle customer selection
            }
        }
    }, {
        xtype: 'component',
        html: '<center><h2>Movies You Will Rent</h2></center>'
    }, {
        xtype: 'grid',
        reference: 'cartGrid',
        bind: {
            store: '{cartItems}'
        },
        columns: [{
            sortable: false,
            menuDisabled: true,
            text: 'Title',
            dataIndex: 'title',
            flex: 3
        }, {
            sortable: false,
            menuDisabled: true,
            text: 'Rental Price',
            dataIndex: 'rentalPrice',
            flex: 1,
            xtype: 'numbercolumn',
            format: '₱0.00'
        }, {
            sortable: false,
            menuDisabled: true,
            text: 'Rental Date',
            dataIndex: 'rentalDate',
            flex: 1,
            xtype: 'datecolumn',
            format: 'Y-m-d',
        }, {
            sortable: false,
            menuDisabled: true,
            text: 'Return Date',
            dataIndex: 'returnDate',
            flex: 1,
            xtype: 'datecolumn',
            format: 'Y-m-d',
        }],

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
                    var customerCombo = this.up('window').down('combo[reference=customerCombo]');
                    var customer = customerCombo.getValue();
                  
                    var cartItemsStore = Ext.getStore('cartItems');
                  
                    cartItemsStore.each(function(record) {
                      record.set('customer', customer);
                    });
                  
                    var rentalCartData = [];
                    cartItemsStore.each(function(record) {
                      rentalCartData.push({
                        rentalId: 0,
                        customerId: customer,
                        movieId: record.get('movieId'), 
                        rentalDate: record.get('rentalDate'),
                        returnDate: record.get('returnDate'),
                        rentalCost: record.get('rentalPrice'),
                        overdueCost: 0,
                        originId: 2,
                        rentStatus: false
                      });
                    });
                  
                    console.log(rentalCartData);
                  
                    var options = {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(rentalCartData)
                    };
                  
                    fetch('http://localhost:5283/api/Rentals/New', options)
                      .then(function(response) {
                        if (response.ok) {
                          Ext.toast('Rental cart submitted successfully', 'Success');
                          cartItemsStore.removeAll();
                          this.up('window').close();
                        } else {
                          Ext.toast('Failed to submit rental cart', 'Error');
                        }
                        return response.json(); // add this line to parse the response body as JSON
                      }.bind(this))
                      .then(function(data) {
                        console.log(data); // console log the parsed JSON response
                      })
                      .catch(function(error) {
                        console.error('Error:', error);
                        Ext.toast('Failed to submit rental cart', 'Error');
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
        show: function() {
            var cartItemsStore = Ext.getStore('cartItems');
            var sum = 0;
            cartItemsStore.each(function(record) {
                sum += record.get('rentalPrice');
            });
            this.getViewModel().set('totalRentalPrice', '₱' + sum.toFixed(2));
            this.down('grid').setStore(cartItemsStore);
        }
    },

    viewModel: {
        data: {
            totalRentalPrice: '₱0.00'
        }
    }
});
