Ext.define('RentalApp.view.main.RentalCart', {
    extend: 'Ext.window.Window',
    xtype: 'rentalcart',

    title: 'Rental Cart',
    modal: true,
    width: 900,
    layout: 'fit',
    closable: true,
    resizable: false,
    autoShow: true,

    items: [{
        xtype: 'grid',
        reference: 'cartGrid',
        bind: {
            store: '{cartItems}'
        },
        columns: [{
            text: 'Title',
            dataIndex: 'title',
            flex: 1
        }, {
            text: 'Rental Price',
            dataIndex: 'rentalPrice',
            flex: 1,
            xtype: 'numbercolumn',
            format: '₱0.00'
        }, {
            text: 'Release Date',
            dataIndex: 'releaseDate',
            flex: 1,
            xtype: 'datecolumn',
            format: 'Y-m-d'
        }, {
            xtype: 'actioncolumn',
            width: 30,
            sortable: false,
            menuDisabled: true,
            items: [{
                iconCls: 'x-fa fa-trash',
                tooltip: 'Remove',

            }]
        }],
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: ['->', {
                xtype: 'textfield',
                fieldLabel: 'Total Rental Price',
                labelWidth: 120,
                readOnly: true,
                bind: {
                    value: '{totalRentalPrice}'
                },
                width: 250
            }]
        }],
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
