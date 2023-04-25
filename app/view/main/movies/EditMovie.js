Ext.define('MyApp.view.main.EditMovieWindow', {
    extend: 'Ext.window.Window',
    xtype: 'editmoviewindow',

    title: 'Edit Movie',
    width: 400,
    layout: 'fit',
    modal: true,

    // Pass the movieId to the window as a parameter
    config: {
        movieId: null
    },

    items: [{
        xtype: 'form',
        bodyPadding: 10,
        defaultType: 'textfield',
        items: [{
            fieldLabel: 'ID',
            name: 'movieId',
            allowBlank: false,
            hidden: true
        }, {
            fieldLabel: 'Title',
            name: 'title',
            allowBlank: false
        }, {
            fieldLabel: 'Description',
            name: 'description',
            allowBlank: false
        }, {
            fieldLabel: 'Genre',
            name: 'genre',
            allowBlank: false,
        }, {
            xtype: 'datefield',
            fieldLabel: 'Release Date',
            name: 'releaseDate',
            allowBlank: false,
            format: 'Y-m-d', // set date format to YYYY-MM-DD
        }, {
            fieldLabel: 'Rental Price',
            name: 'rentalPrice',
            allowBlank: false,
            maskRe: /[0-9]/,
        }, {
            fieldLabel: 'Stock Count',
            name: 'stock',
            allowBlank: false,
            maskRe: /[0-9]/,
        }, {
            xtype: 'checkboxfield',
            fieldLabel: 'Availability',
            name: 'isActive',
            boxLabel: 'Available',
            inputValue: true,
            uncheckedValue: false,
            allowBlank: false
        },]
    }],

    buttons: [{
        text: 'Save',
        handler: function(button) {
            var form = button.up('window').down('form');
            if (form.isValid()) {
                var values = form.getValues();
                var movieId = button.up('editmoviewindow').getMovieId();
                var url = 'http://localhost:5283/api/Movies/Edit/' + movieId;
                var options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                };

                fetch(url, options)
                    .then(function(response) {
                        if (response.ok) {
                            Ext.toast('Movie updated successfully', 'Success');
                            moviesStore.load();  // loads the store data and triggers the load event
                            button.up('window').close();
                        } else {
                            Ext.toast('Failed to update movie', 'Error');
                        }
                    })
                    .catch(function(error) {
                        console.error('Error:', error);
                        Ext.toast('Failed to update movie', 'Error');
                    });
            }
        }
    }, {
        text: 'Cancel',
        handler: function(button) {
            button.up('window').close();
        }
    }]
});