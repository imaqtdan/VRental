Ext.define('MyApp.view.main.DeleteMovieWindow', {
    extend: 'Ext.window.Window',
    xtype: 'deletemoviewindow',

    title: 'Delete Movie',
    width: 400,
    layout: 'fit',
    modal: true,

    config: {
        movieId: null
    },

    items: [{
        xtype: 'form',
        defaultType: 'displayfield',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'label',
            text: 'Are you sure you want to delete this movie?',
            flex: 3
        }, {
            xtype: 'displayfield',
            name: 'confirmMessage',
            flex: 1
        }]
    }],

    buttons: [{
        text: 'Yes',
        handler: function(button) {
            var movieId = button.up('window').getMovieId();
            var url = 'http://localhost:5283/api/Movies/Delete/' + movieId;
            var options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            fetch(url, options)
                .then(function(response) {
                    if (response.ok) {
                        Ext.toast('Movie deleted successfully', 'Success');
                        moviesStore.load();  // loads the store data and triggers the load event
                        button.up('window').close();
                    } else {
                        Ext.toast('Failed to delete movie', 'Error');
                    }
                })
                .catch(function(error) {
                    console.error('Error:', error);
                    Ext.toast('Failed to delete movie', 'Error');
                });
        }
    }, {
        text: 'No',
        handler: function(button) {
            button.up('window').close();
        }
    }]
});