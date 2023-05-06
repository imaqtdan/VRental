Ext.define('RentalApp.view.main.RentalCart', {
    extend: 'Ext.window.Window',
    xtype: 'rentalcart',

    title: 'Rental Cart',
    modal: true,
    width: 900,
    layout: 'fit',
    closable: true,
    resizable: false,
    autoShow: true,

    items: [{
        xtype: 'grid',
        reference: 'cartGrid',
        bind: {
            store: '{cartItems}'
        },
        columns: [{
            text: 'Title',
            dataIndex: 'title',
            flex: 1
        }, {
            text: 'Rental Price',
            dataIndex: 'rentalPrice',
            flex: 1,
            xtype: 'numbercolumn',
            format: '₱0.00'
        }]
    }],


    
    listeners: {
        show: function() {
            var cartItemsStore = Ext.getStore('cartItems');
            // console.log('cartItems count:', cartItemsStore.getCount());
            // cartItemsStore.each(function(record) {
            //     console.log(record.getData());
            // });
            this.down('grid').setStore(cartItemsStore);
        }
    }
});
