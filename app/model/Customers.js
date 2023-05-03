Ext.define('RentalApp.model.Customers', {
    extend: 'RentalApp.model.Base',

    fields: [
        { name: 'customerId', type: 'int', useNull: true },
        { name: 'firstName', type: 'string' },
        { name: 'lastName', type: 'string' },
        { name: 'emailAddress', type: 'string' },
        { name: 'phoneNumber', type: 'string' },
        { name: 'address', type: 'string' }
    ]
});