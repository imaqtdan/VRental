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
        //{ text: 'ID',  dataIndex: 'customerId', flex: 1 },
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
                    var selectedRecord = grid.getStore().getAt(rowIndex);
                    var form = Ext.create('RentalApp.view.main.EditCustomerModal', {
                        customer: selectedRecord,
                        viewModel: {
                            data: {
                                customer: selectedRecord
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
                    var idnum = record.get('customerId');
                    var fname = record.get('firstName');
                    var lname = record.get('lastName');
                    Ext.Msg.confirm('Delete Customer', 'Are you sure you want to delete customer: ' + idnum + ' (' + fname + ' ' + lname + ')?', function(btn) {
                        if (btn === 'yes') {
                            var trueid = record.get('customerId');
                            record.set('id', trueid);
                            stores.remove(record);
                            stores.sync({
                                success: function(){
                                    Ext.toast('Customer Deleted.', 'Success');
                                    console.log('Delete Operation Success');
                                },
                                failure: function(){
                                    Ext.toast('Failed to Delete Customer', 'Failed ');
                                    console.log('Delete Operation Failed');
                                }
                            });
                        }
                    });
                }
            }]
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
            text: 'Add Customer',
            handler: function() {
                Ext.create('RentalApp.view.main.AddCustomerModal');
        }
        }],

        bbar: {
            xtype: 'pagingtoolbar',
            bind: {
                store: '{customers}'
            },
            displayInfo: true
        },

        listeners: {
            afterrender: function() {
                var me = this;
                var customersStore = Ext.create('RentalApp.store.Customers'); // create a new store instance
                customersStore.load({
                    callback: function(records, operation, success) {
                        if (success) {
                            me.getViewModel().set('customers', customersStore); // set the store to the view model
                        } else {
                            Ext.toast('Failed to load customers', 'Failed ');
                        }
                    }
                });
            }
        },
        
        controller: 'customerslist'
});