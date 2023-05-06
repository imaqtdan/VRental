    Ext.define('RentalApp.view.main.EditMovieModal', {
        extend: 'Ext.window.Window',
        xtype: 'editmoviemodal',
        
        title: 'Edit Movie',
        modal: true,
        width: 400,
        layout: 'fit',
        closable: true,
        resizable: false,
        autoShow: true,
        
        config: {
            movie: null,
            releaseDate: null
        },

        items: [{
            xtype: 'form',
            reference: 'editMovieForm',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            bodyPadding: 10,
            fieldDefaults: {
                labelAlign: 'top',
                msgTarget: 'side',
                anchor: '100%'
            },
            items: [{
                xtype: 'hiddenfield',
                name: 'id',
                bind: '{movie.movieId}',
                allowBlank: false,
            }, {
                xtype: 'textfield',
                fieldLabel: 'Title',
                name: 'title',
                bind: '{movie.title}',
                allowBlank: false
            }, {
                xtype: 'textarea',
                fieldLabel: 'Description',
                name: 'description',
                bind: '{movie.description}',
                allowBlank: false
            }, {
                xtype: 'textfield',
                fieldLabel: 'Genre',
                name: 'genre',
                bind: '{movie.genre}',
                allowBlank: false
            }, {
                xtype: 'datefield',
                fieldLabel: 'Release Date',
                name: 'releaseDate',
                bind: '{releaseDate}',
                allowBlank: false,
                format: 'Y-m-d'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Rental Price',
                name: 'rentalPrice',
                bind: '{movie.rentalPrice}',
                allowBlank: false,
                vtype: 'customDecimal',
                regex: /^\d+(\.\d{1,2})?$/, // regular expression to allow decimals with up to two decimal places
            }, {
                xtype: 'textfield',
                fieldLabel: 'Stock',
                name: 'stock',
                bind: '{movie.stock}',
                allowBlank: false,
                maskRe: /[0-9]/,
            }, {
                xtype: 'checkboxfield',
                fieldLabel: 'Availability',
                name: 'isActive',
                bind: '{movie.isActive}',
                boxLabel: 'Available',
                inputValue: true,
                uncheckedValue: false,
                allowBlank: false
            },]
        }],
        
        buttons: [{
            text: 'Save',
            formBind: true,
            disabled: true,
            listeners: {
                beforerender: function(button) {
                    var form = button.up('window').down('form');
                    form.on('validitychange', function(form, valid) {
                        button.setDisabled(!valid);
                    });
                }
            },
            handler: function() {
                var me = this;
                var form = me.up('window').down('form');
                var movie = me.up('window').getMovie();
                form.updateRecord(movie);
                var store = me.up('window').grid.getStore();
                store.sync({
                    success: function(){
                        Ext.toast('Movie Updated.', 'Success');
                        console.log('Update Operation Success');
                    },
                    failure: function(){
                        Ext.toast('Failed to Update Movie', 'Failed');
                        var grid = Ext.ComponentQuery.query('movieslist')[0];
                        grid.getStore().reload();
                        console.log('Update Operation Failed');
                    }
                });
                me.up('window').close();
            }
        }, {
            text: 'Cancel',
            handler: function() {
                var me = this;
                var grid = Ext.ComponentQuery.query('movieslist')[0];
                grid.getStore().reload();
                me.up('window').close();
            }
        }]
    });

    Ext.define('CustomVtypes', {
        override: 'Ext.form.field.VTypes',

        customDecimal: function(value) {
            return /^\d+(\.\d{1,2})?$/.test(value);
        },
        customDecimalText: 'Please enter a valid decimal number with up to two decimal places.'
    });
