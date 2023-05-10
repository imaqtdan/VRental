Ext.define('RentalApp.view.main.RentalsList', {
    extend: 'Ext.grid.Panel',
    xtype: 'rentalslist',

    requires: [
        'RentalApp.view.main.MainModel',
    ],

    viewModel: 'main',

    bind: {
        store: '{rentals}',
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
        { text: 'Movie ID', dataIndex: 'movieId', flex: .3 },
        { text: 'Rental Date', dataIndex: 'rentalDate', flex: 1, xtype: 'datecolumn', format: 'Y-m-d' },
        { text: 'Expected Return Date', dataIndex: 'returnDate', flex: 1, xtype: 'datecolumn', format: 'Y-m-d' },
        { text: 'Rental Cost', dataIndex: 'rentalCost', flex: .5, xtype: 'numbercolumn', format: '₱ 0.00' },
        { text: 'Rent Status', dataIndex: 'rentStatus', flex: .3, xtype: 'booleancolumn', trueText: 'Returned', falseText: 'On Rent' },
        { xtype: 'actioncolumn', text: 'Action', flex: .3,
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
                    var form = Ext.create('RentalApp.view.main.EditRentals', {
                        rental: selectedRecord,
                        viewModel: {
                            data: {
                                rental: selectedRecord,
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
                    Ext.Msg.confirm('Delete Data', 'Are you sure you want to delete rental id: ' + idnum + '?', function(btn) {
                        if (btn === 'yes') {
                            var trueid = record.get('rentalId');
                            record.set('id', trueid);
                            stores.remove(record);
                            stores.sync({
                                success: function(){
                                    Ext.toast('Rental Data Deleted.', 'Success');
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
        }]
});