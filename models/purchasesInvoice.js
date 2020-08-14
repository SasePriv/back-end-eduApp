const {model, Schema} = require('mongoose');

const PurchasesInvoiceSchema = new Schema({
    walletId: {type: String, required: true},
    user_Id: {type: String, required: true},
    productId: {type: String, required: true},
    orderId: {type: String, required: true},
    transactionId: {type: String, required: true},
},{
    timestamps:true
})

module.exports = model('PurchasesInvoice', PurchasesInvoiceSchema)