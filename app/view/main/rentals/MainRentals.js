Ext.define('RentalApp.view.main.RentalsList', {
    extend: 'Ext.grid.Panel',
    xtype: 'rentalslist',

    requires: [
        'RentalApp.view.main.MainModel'
    ],

    viewModel: 'main',

    bind: {
        store: '{rentals}'
    },

    title: {
        bind: {
            text: '{rentalspage}'
        },
    },
    width:'100%',
    height: 700,
    columnLines:true,
    columns: [
        { text: 'Transaction ID', dataIndex: 'originId', flex: 1 },
        { text: 'Customer ID', dataIndex: 'customerId', flex: 1 },
        { text: 'Movie ID', dataIndex: 'movieId', flex: 1 },
        { text: 'Rental Date', dataIndex: 'rentalDate', flex: 1, xtype: 'datecolumn', format: 'Y-m-d' },
        { text: 'Return Date', dataIndex: 'returnDate', flex: 1, xtype: 'datecolumn', format: 'Y-m-d' },
        { text: 'Rental Cost', dataIndex: 'rentalCost', flex: 1, xtype: 'numbercolumn', format: '₱ 0.00' },
        { text: 'Overdue Cost', dataIndex: 'overdueCost', flex: 1, xtype: 'numbercolumn', format: '₱ 0.00' },
        { text: 'Rent Status', dataIndex: 'rentStatus', flex: 1, xtype: 'booleancolumn', trueText: 'Returned', falseText: 'On Rent' },
        { xtype: 'actioncolumn', text: 'Action', flex: 1,
            layout: {
                type: 'hbox',
                pack: 'center',
                align: 'stretch'
            },
            items: [{
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit',
                handler: function(grid, rowIndex, colIndex) {
                    var selectedRecord = grid.getStore().getAt(rowIndex);
                    var form = Ext.create('RentalApp.view.main.EditCustomerModal', {
                        customer: selectedRecord,
                        viewModel: {
                            data: {
                                customer: selectedRecord
                            }
                        }
                    });
                    form.grid = grid;
                    form.show();
                }
            }, {
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex, item, e, record) {
                    var stores = grid.getStore();
                    var idnum = record.get('rentalId');
                    Ext.Msg.confirm('Delete Customer', 'Are you sure you want to delete customer: ' + idnum + '?', function(btn) {
                        if (btn === 'yes') {
                            var trueid = record.get('rentalId');
                            record.set('id', trueid);
                            stores.remove(record);
                            stores.sync({
                                success: function(){
                                    Ext.toast('Rental Date Deleted.', 'Success');
                                    console.log('Delete Operation Success');
                                    var grid = Ext.ComponentQuery.query('rentalslist')[0];
                                    grid.getStore().reload();
                                },
                                failure: function(){
                                    Ext.toast('Failed to Delete Rental Data', 'Failed ');
                                    console.log('Delete Operation Failed');
                                    var grid = Ext.ComponentQuery.query('rentalslist')[0];
                                    grid.getStore().reload();
                                }
                            });
                        }
                    });
                }
            }]
        }],

        dockedItems: [{
            xtype: 'pagingtoolbar',
            bind: {
                store: '{rentals}'
            },
            dock: 'bottom',
            displayInfo: true
        }],

        tbar: [{
            xtype: 'textfield',
            emptyText: 'Search...',
            reference: 'searchField',
            width: 250,
            listeners: {
                change: 'onSearchFieldChange'
            }
        }, {
            xtype: 'button',
            text: 'Search',
            handler: 'onSearchButtonClick'
        }],

        listeners: {
            afterrender: function() {
                var me = this;
                var rentalsStore = Ext.create('RentalApp.store.Rentals'); // create a new store instance
                rentalsStore.load({
                    callback: function(records, operation, success) {
                        if (success) {
                            me.getViewModel().set('rentals', rentalsStore); // set the store to the view model
                        } else {
                            Ext.toast('Failed to load rentals', 'Failed ');
                        }
                    }
                });
            }
        },
        
        //controller: 'rentalslist'
});