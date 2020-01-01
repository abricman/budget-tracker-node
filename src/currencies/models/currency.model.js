const mongoose = require('mongoose')
const Schema = mongoose.Schema

const currencySchema = new mongoose.Schema({
    userId: {
        type: Schema.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    isoCode: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    bufferCommands: false
})


const Currency = mongoose.model('Currency', currencySchema)

module.exports = Currency