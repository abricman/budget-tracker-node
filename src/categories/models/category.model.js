const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const validator = require('validator')

const CategorySchema = new mongoose.Schema({
    userId: {
        type: Schema.ObjectId
    },
    name: {
        type: String
    },
    type: {
        type: String
    },
    iconName: {
        type: String
    }
}, {
    timestamps: true,
    bufferCommands: false
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category