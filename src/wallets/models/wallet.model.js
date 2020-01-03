const mongoose = require('mongoose')
const Schema = mongoose.Schema

const walletSchema = new mongoose.Schema({
    userId: {
        type: Schema.ObjectId
    },
    name: {
        type: String
    },
    currency: {
        type: Schema.ObjectId,
        ref: "Currency"
    },
    balance: {
        type: Number
    }
}, {
    timestamps: true,
    bufferCommands: false
})

walletSchema.methods.toJSON = function () {
    const { _id, name, currency, balance} = this.toObject()
    return { _id, name, currency, balance}
}

const Wallet = mongoose.model('Wallet', walletSchema)

module.exports = Wallet