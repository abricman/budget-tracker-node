const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const validator = require('validator')

const walletSchema = new mongoose.Schema({
    userId: {
        type: Schema.ObjectId
    },
    name: {
        type: String
    }/* ,
    avatar: {
        type: Schema.String
    } */
}, {
    timestamps: true,
    bufferCommands: false
})


const Wallet = mongoose.model('Wallet', walletSchema)

module.exports = Wallet