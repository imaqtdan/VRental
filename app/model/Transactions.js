Ext.define('RentalApp.model.Transactions', {
    extend: 'RentalApp.model.Base',

    fields: [
        { name: 'transactionId', type: 'int', useNull: true },
        { name: 'customerId', type: 'int' },
        { name: 'transactionDate', type: 'date' },
        { name: 'transactionAmount', type: 'float' }
    ]
});
