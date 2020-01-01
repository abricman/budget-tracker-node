const mongoose = require('mongoose')
const Schema = mongoose.Schema

const walletSchema = new mongoose.Schema({
    userId: {
        type: Schema.ObjectId
    },
    currency: {
        type: Schema.ObjectId,
        ref: "Currency"
    },
    name: {
        type: String
    }
}, {
    timestamps: true,
    bufferCommands: false
})


const Wallet = mongoose.model('Wallet', walletSchema)

module.exports = Wallet