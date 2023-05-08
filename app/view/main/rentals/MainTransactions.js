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
                iconCls: 'x-fa fa-eye',
                tooltip: 'View',
                handler: function(grid, rowIndex, colIndex) {
                    var selectedRecord = grid.getStore().getAt(rowIndex);
                    var transactionId = selectedRecord.get('transactionId'); // Get the transaction ID from the selected record
                    console.log(transactionId);
                    var rentMovieModal = Ext.create('RentalApp.view.main.TransactionModal', {
                         transactionId: transactionId // Pass the transactionId to the modal as a config property
                     });
                    rentMovieModal.show();
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