Ext.define('RentalApp.view.main.TransactionModal', {
    extend: 'Ext.window.Window',
    xtype: 'transactionmodal',

    title: 'Transaction',
    modal: true,
    width: 900,
    closable: true,
    resizable: false,
    autoShow: true,

    config: {
        transactionId: null
    },

    viewModel: {
        data: {
            rentals: null
        }
    },

    items: [{
        xtype: 'rentalslist',
        reference: 'rentalslist',
        bind: {
            store: '{rentals}'
        }
    }, {

        dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom',

        }]
    }],

    listeners: {
    afterrender: function() {
        var me = this;
        var rentalsStore = Ext.create('RentalApp.store.Rentals'); // create a new store instance
        rentalsStore.load({
            callback: function(records, operation, success) {
                if (success) {
                    var rentalsList = me.down('rentalslist'); // get a reference to the RentalsList component
                    rentalsList.setStore(rentalsStore); // set the store directly to the RentalsList
                    rentalsStore.filterBy(function(record) {
                        return record.get('originId') === me.config.transactionId;
                    });
                } else {
                    Ext.toast('Failed to load Rental List', 'Failed ');
                }
            }
        });
    }
},

});
