Ext.define('RentalApp.view.main.CartList', {
    extend: 'Ext.grid.Panel',
    xtype: 'cartlist',

    requires: [
        'RentalApp.view.main.MainModel'
    ],

    viewModel: 'main',

    bind: {
        store: '{cartItems}'
    },

    title: {
        bind: {
            text: '{rentalmovielist}'
        },
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
    }, {
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        items: [{
            iconCls: 'x-fa fa-trash',
            tooltip: 'Delete',
            handler: function(grid, rowIndex, colIndex, item, e, record) {
                var stores = grid.getStore();
                var idnum = record.get('cartId');
                Ext.Msg.confirm('Warning!', 'Are you sure you want to remove this movie: ' + idnum + '?', function(btn) {
                    if (btn === 'yes') {
                        var trueid = record.get('cartId');
                        record.set('id', trueid);
                        stores.remove(record);
                        stores.sync({
                            success: function(){
                                Ext.toast('Movie Successfuly Removed.', 'Success');
                                console.log('Delete Operation Success');
                                var grid = Ext.ComponentQuery.query('cartlist')[0];
                                grid.getStore().reload();
                            },
                            failure: function(){
                                Ext.toast('Failed to Remove Movie', 'Failed ');
                                console.log('Delete Operation Failed');
                                var grid = Ext.ComponentQuery.query('cartlist')[0];
                                grid.getStore().reload();
                            }
                        });
                    }
                });
            }
        }]
    }],

    listeners: {
        afterrender: function() {
            var me = this;
            var cartItemsStore = Ext.create('RentalApp.store.CartItems'); // create a new store instance
            cartItemsStore.load({
                callback: function(records, operation, success) {
                    if (success) {
                        me.getViewModel().set('cartItems', cartItemsStore); // set the store to the view model
                    } else {
                        Ext.toast('Failed to load Cart Items', 'Failed ');
                    }
                }
            });
        }
    },
        
        //controller: 'rentalslist'
});