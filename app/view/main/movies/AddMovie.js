Ext.define('RentalApp.view.main.AddMovieModal', {
    extend: 'Ext.window.Window',
    xtype: 'addmoviemodal',
    
    title: 'Add Movie',
    modal: true,
    width: 400,
    layout: 'fit',
    closable: true,
    resizable: false,
    autoShow: true,
    
    items: [{
        xtype: 'form',
        reference: 'addMovieForm',
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
            bind: '{movie.releaseDate}',
            allowBlank: false,
            format: 'Y-m-d',
        }, {
            xtype: 'textfield',
            fieldLabel: 'Rental Price',
            name: 'rentalPrice',
            bind: '{movie.rentalPrice}',
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
            var values = form.getValues();
            var grid = Ext.ComponentQuery.query('movieslist')[0];
            var store = grid.getStore();
            var newMovie = Ext.create('RentalApp.model.Movies', values);
            store.add(newMovie);
            store.sync({
                success: function(){
                    Ext.toast('Movie Added.', 'Success');
                    console.log('Add Operation Success');
                    grid.getStore().reload();
                },
                failure: function(){
                    Ext.toast('Failed to Add Movie', 'Failed ');
                    console.log('Add Operation Failed');
                    grid.getStore().reload();
                }
            });
            me.up('window').close();
        }
    }, {
        text: 'Cancel',
        handler: function() {
            this.up('window').close();
        }
    }]
});