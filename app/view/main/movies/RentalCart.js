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
        displayField: 'firstName',
        valueField: 'firstName',
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
                    // Handle Proceed button click
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
