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
        { text: 'Available', dataIndex: 'isActive', flex: 1, xtype: 'booleancolumn', trueText: 'Available', falseText: 'Unavailable' },
        { xtype: 'actioncolumn', text: 'Action', flex: .5, layout: { type: 'hbox', pack: 'center', align: 'stretch' },
            items: [{
                iconCls: 'fa fa-plus-square',
                tooltip: 'Add to Cart',
                handler: function(grid, rowIndex, colIndex) {
                    var selectedRecord = grid.getStore().getAt(rowIndex);
                    var cartStore = Ext.create('RentalApp.store.CartItems');
                    cartStore.load({
                        callback: function(records, operation, success) {
                            if (success) {
                                var recordIndex = cartStore.findExact('movieId', selectedRecord.get('movieId'));
                                if (recordIndex > -1) {
                                    Ext.toast('Movie is already in cart', 'Warning');
                                } else if (selectedRecord.get('isActive')) {
                                    var rentalDate = new Date();
                                    var returnDate = new Date(rentalDate.getTime() + (3 * 24 * 60 * 60 * 1000)); // add 3 days to rental date
                                    var payload = {
                                        movieId: selectedRecord.get('movieId'),
                                        title: selectedRecord.get('title'),
                                        rentalPrice: selectedRecord.get('rentalPrice'),
                                        rentalDate: rentalDate,
                                        returnDate: returnDate
                                    };
                                    console.log(payload);
                                    cartStore.add(payload);
                                    cartStore.sync({
                                        success: function(){
                                            console.log('Add Operation Success');
                                            var grid = Ext.ComponentQuery.query('cartlist')[0];
                                            grid.getStore().reload();
                                        },
                                        failure: function(){
                                            console.log('Add Operation Failed');
                                            var grid = Ext.ComponentQuery.query('cartlist')[0];
                                            grid.getStore().reload();
                                        }
                                    });
                                    Ext.toast('Movie added to cart', 'Success');
                                } else {
                                    Ext.toast('Movie is unavailable and cannot be added to cart', 'Error');
                                }
                                console.log(recordIndex);
                            } else {
                                console.log('Loading cartStore failed');
                            }
                        }
                    });
                }                               
            }, {
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit',
                handler: function(grid, rowIndex, colIndex) {
                    var selectedRecord = grid.getStore().getAt(rowIndex);
                    var form = Ext.create('RentalApp.view.main.EditMovieModal', {
                        movie: selectedRecord,
                        viewModel: {
                            data: {
                                movie: selectedRecord,
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
                var cartStore = Ext.create('RentalApp.store.CartItems');
                cartStore.load({
                    callback: function(records, operation, success) {
                        if (success) {
                            if (cartStore.getCount() === 0) {
                                Ext.toast('Cart is empty', 'Warning');
                            } else {
                                var rentMovieModal = Ext.create('RentalApp.view.main.RentalCart');
                                rentMovieModal.show();
                            }
                        } else {
                            Ext.toast('Failed to load Cart Items', 'Failed ');
                        }
                    }
                });
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