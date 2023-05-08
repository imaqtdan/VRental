Ext.define('RentalApp.view.main.TransactionsList', {
    extend: 'Ext.grid.Panel',
    xtype: 'transactionslist',

    requires: [
        'RentalApp.view.main.MainModel'
    ],

    viewModel: 'main',

    bind: {
        store: '{transactions}'
    },

    title: {
        bind: {
            text: '{transactionspage}'
        },
    },
    width:'100%',
    height: 700,
    columnLines:true,
    columns: [
        { text: 'Transaction ID', dataIndex: 'transactionId', flex: 1 },
        { text: 'Customer ID', dataIndex: 'customerId', flex: 1 },
        { text: 'Transaction Date', dataIndex: 'transactionDate', flex: 1, xtype: 'datecolumn', format: 'Y-m-d' },
        { text: 'Transaction Amount', dataIndex: 'transactionAmount', flex: 1, xtype: 'numbercolumn', format: '₱ 0.00' },
        { xtype: 'actioncolumn', text: 'Action', flex: 1,
            layout: {
                type: 'hbox',
                pack: 'center',
                align: 'stretch'
            },
            items: [{
                iconCls: 'x-fa fa-view',
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
                store: '{transactions}'
            },
            dock: 'bottom',
            displayInfo: true
        }],

        listeners: {
            afterrender: function() {
                var me = this;
                var transactionsStore = Ext.create('RentalApp.store.Transactions'); // create a new store instance
                transactionsStore.load({
                    callback: function(records, operation, success) {
                        if (success) {
                            me.getViewModel().set('transactions', transactionsStore); // set the store to the view model
                        } else {
                            Ext.toast('Failed to load Transaction List', 'Failed ');
                        }
                    }
                });
            }
        },
        
        //controller: 'rentalslist'
});