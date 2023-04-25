Ext.define('RentalApp.view.main.MoviesList', {
    extend: 'Ext.grid.Panel',
    xtype: 'movieslist',

    requires: [
        'RentalApp.view.main.MainModel'
    ],

    viewModel: 'main',

    bind: {
        store: '{movies}'
    },

    title: {
        bind: {
            text: '{moiviespage}'
        },
        flex: 0
    },

    columns: [
        { text: 'ID',  dataIndex: 'movieId', flex: 1 },
        { text: 'Title', dataIndex: 'title', flex: 1 },
        { text: 'Description', dataIndex: 'description', flex: 1 },
        { text: 'Genre', dataIndex: 'genre', flex: 1 },
        { text: 'Release Date', dataIndex: 'releaseDate', flex: 1 },
        { text: 'Rental Price', dataIndex: 'rentalPrice', flex: 1 },
        { text: 'Stock', dataIndex: 'stock', flex: 1 },
        { 
            text: 'Availability',
            dataIndex: 'isActive',
            flex: 1,
            renderer: function(value) {
                return value ? 'Available' : 'Unavailable';
            }
        },
        {
            xtype: 'actioncolumn',
            text: 'Action',
            flex: 1,
            layout: {
                type: 'hbox',
                pack: 'center',
                align: 'stretch'
            },
            items: [{
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit',
                handler: function(grid, rowIndex, colIndex) {
                var record = grid.getStore().getAt(rowIndex);
                var movieId = record.get('movieId');
                var window = Ext.create({
                    xtype: 'editmoviewindow',
                    movieId: movieId
                });
    
                // Load the record data into the form fields
                var form = window.down('form');
                form.loadRecord(record);
    
                // Get the "releaseDate" field in the form
                var releaseDateField = form.getForm().findField('releaseDate');
    
                // Get the date value from the record
                var releaseDateValue = record.get('releaseDate');
                
                // Check if the releaseDateValue is not null or undefined
                if (releaseDateValue) {
                    // Format the date value to the 'Y-m-d' format
                    var formattedDate = Ext.Date.format(new Date(releaseDateValue), 'Y-m-d');
    
                    // Set the value of the datefield to the formatted date value
                    releaseDateField.setValue(formattedDate);
                }
    
                window.show();
                }
            }, {
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                    var record = grid.getStore().getAt(rowIndex);
                    var movieId = record.get('movieId');
                    var window = Ext.create({
                        xtype: 'deletemoviewindow',
                        movieId: movieId
                    });
                    window.show();
                }
            }]
        }],
    
        buttons: [{
            text: 'Add Movies',
            handler: function() {
                var window = Ext.create('MyApp.view.main.AddMovieWindow');
                window.show();
            }
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

        bbar: {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            items: [
                '-',
                {
                    text: 'Refresh',
                    handler: function() {
                        this.up('grid').getStore().reload();
                    }
                }
            ]
        },

         listeners: {
             afterrender: function() {
                 var customersStore = this.getViewModel().getStore('movies'); // get the store
                 customersStore.load(); // load the store
             }
         },
        
        controller: 'movieslist'
});