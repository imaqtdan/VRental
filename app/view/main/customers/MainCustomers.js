Ext.define('RentalApp.view.main.CustomersList', {
    extend: 'Ext.grid.Panel',
    xtype: 'customerslist',

    requires: [
        'RentalApp.view.main.MainModel'
    ],

    viewModel: 'main',

    bind: {
        store: '{customers}'
    },

    title: {
        bind: {
            text: '{customerspage}'
        },
        flex: 0
    },

    columns: [
        { text: 'ID',  dataIndex: 'customerId', flex: 1 },
        { text: 'First Name', dataIndex: 'firstName', flex: 1 },
        { text: 'Last Name', dataIndex: 'lastName', flex: 1 },
        { text: 'Email Address', dataIndex: 'emailAddress', flex: 1 },
        { text: 'Phone Number', dataIndex: 'phoneNumber', flex: 1 },
        { text: 'Address', dataIndex: 'address', flex: 1 },
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
                    var customerId = record.get('customerId');
                    var window = Ext.create({
                        xtype: 'editcustomerwindow',
                        customerId: customerId
                    });
            
                    // Load the record data into the form fields
                    var form = window.down('form');
                    form.loadRecord(record);
            
                    window.show();
                }
            }, {
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                    var record = grid.getStore().getAt(rowIndex);
                    var customerId = record.get('customerId');
                    var window = Ext.create({
                        xtype: 'deletecustomerwindow',
                        customerId: customerId
                    });
                    window.show();
                }
            }]
        }],

        buttons: [{
            text: 'Add Customer',
            handler: function() {
                var window = Ext.create('RentalApp.view.main.AddCustomerWindow');
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
                 var customersStore = this.getViewModel().getStore('customers'); // get the store
                 customersStore.load(); // load the store
             }
         },
        
        controller: 'customerslist'
});