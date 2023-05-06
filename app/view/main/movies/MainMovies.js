Ext.define('RentalApp.view.main.MoviesList', {
    extend: 'Ext.grid.Panel',
    xtype: 'movieslist',

    requires: [
        'RentalApp.view.main.MainModel'
    ],

    viewModel: 'main',

    bind: {
        store: '{movies}',
    },

    title: {
        bind: {
            text: '{moviespage}'
        },
        flex: 0
    },

    columns: [
        { text: 'Title', dataIndex: 'title', flex: 1 },
        { text: 'Description', dataIndex: 'description', flex: 1     },
        { text: 'Genre', dataIndex: 'genre', flex: 1 },
        { text: 'Release Date', dataIndex: 'releaseDate', flex: 1, xtype: 'datecolumn', format: 'Y-m-d' },
        { text: 'Rental Price', dataIndex: 'rentalPrice', flex: 1, xtype: 'numbercolumn', format: '₱ 0.00' },
        { text: 'Stock', dataIndex: 'stock', flex: 1 },
        { text: 'Available', dataIndex: 'isActive', flex: 1, xtype: 'booleancolumn', trueText: 'Available', falseText: 'Unavailable' },
        { xtype: 'actioncolumn', text: 'Action', flex: 1, layout: { type: 'hbox', pack: 'center', align: 'stretch' },
            items: [{
                iconCls: 'fa fa-plus-square',
                tooltip: 'Add to Cart',
                handler: function(grid, rowIndex, colIndex) {
                    var selectedRecord = grid.getStore().getAt(rowIndex);
                    if (selectedRecord.get('isActive')) {
                        var cartStore = Ext.getStore('cartItems');
                        cartStore.add(selectedRecord);
                        Ext.toast('Movie added to cart', 'Success');
                        var cartItemsStore = Ext.getStore('cartItems');
                    } else {
                        Ext.toast('Movie is unavailable and cannot be added to cart', 'Error');
                    }
                }
            }, {
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit',
                handler: function(grid, rowIndex, colIndex) {
                    var selectedRecord = grid.getStore().getAt(rowIndex);
                    
                    // Format the releaseDate value to 'Y-m-d' format
                    var formattedDate = selectedRecord.get('releaseDate') ? Ext.Date.format(new Date(selectedRecord.get('releaseDate')), 'Y-m-d') : null;
                    
                    var form = Ext.create('RentalApp.view.main.EditMovieModal', {
                        movie: selectedRecord,
                        viewModel: {
                            data: {
                                movie: selectedRecord,
                                releaseDate: formattedDate
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
                    var idnum = record.get('movieId');
                    var title = record.get('title');
                    Ext.Msg.confirm('Delete Movie', 'Are you sure you want to delete movie: ' + idnum + ' (' + title + ') ?', function(btn) {
                        if (btn === 'yes') {
                            var trueid = record.get('movieId');
                            record.set('id', trueid);
                            stores.remove(record);
                            stores.sync({
                                success: function(){
                                    Ext.toast('Movie Deleted.', 'Success');
                                    console.log('Delete Operation Success');
                                    var grid = Ext.ComponentQuery.query('movieslist')[0];
                                    grid.getStore().reload();
                                },
                                failure: function(){
                                    Ext.toast('Failed to Delete Movie', 'Failed ');
                                    console.log('Delete Operation Failed');
                                    var grid = Ext.ComponentQuery.query('movieslist')[0];
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
                store: '{movies}'
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
        }, '->', {
            xtype: 'button',
            iconCls: 'x-fa fa-plus',
            text: 'Add Movie',
            handler: function() {
                Ext.create('RentalApp.view.main.AddMovieModal');
        }, 
        }, {
            xtype: 'button',
            iconCls: 'fa fa-shopping-cart',
            text: 'View Cart',
            handler: function() {
                var rentMovieModal = Ext.create('RentalApp.view.main.RentalCart');
                rentMovieModal.show();
            }
        }],

        listeners: {
            afterrender: function() {
                var me = this;
                var moviesStore = Ext.create('RentalApp.store.Movies'); // create a new store instance
                moviesStore.load({
                    callback: function(records, operation, success) {
                        if (success) {
                            me.getViewModel().set('movies', moviesStore); // set the store to the view model
                        } else {
                            Ext.toast('Failed to load movies', 'Failed ');
                        }
                    }
                });
            }
        },
        
        controller: 'movieslist'
});