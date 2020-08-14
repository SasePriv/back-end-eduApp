const {model, Schema} = require('mongoose');

const WalletSchema = new Schema({
    user_Id: {type: String, required: true},
    coins: {type: Number, default: 0},
},{
    timestamps:true
})

module.exports = model('Wallet', WalletSchema)