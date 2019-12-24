const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const validator = require('validator')

const categorySchema = new mongoose.Schema({
    userId: {
        type: Schema.ObjectId
    },
    name: {
        type: String
    },
    type: {
        type: String
    }/* ,
    avatar: {
        type: Schema.String
    } */
}, {
    timestamps: true,
    bufferCommands: false
})


const Category = mongoose.model('Category', categorySchema)

module.exports = Category