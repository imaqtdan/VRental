Ext.define('RentalApp.view.main.MoviesListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.movieslist',

    onSearchFieldChange: function(field, newValue) {
        var grid = this.getView();
        var store = grid.getStore();
    
        if (store) { // Check if store is not null
            if (newValue) {
                store.clearFilter();
                store.filterBy(function(record) {
                    var regex = new RegExp(newValue, 'i');
                    return regex.test(record.get('movieId')) ||
                        regex.test(record.get('title')) ||
                        regex.test(record.get('description')) ||
                        regex.test(record.get('genre')) ||
                        regex.test(record.get('releaseDate'));
                });
            } else {
                store.clearFilter();
            }
        }
    },

    onSearchButtonClick: function(button) {
        var searchField = this.lookupReference('searchField');
        var searchValue = searchField.getValue();
        this.onSearchFieldChange(searchField, searchValue);
    }
});