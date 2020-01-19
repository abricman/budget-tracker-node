const mongoose = require('mongoose')
const Schema = mongoose.Schema
const generalHelpers = require('../../common/utils/generalHelpers')

const categorySchema = new mongoose.Schema({
    userId: {
        type: Schema.ObjectId
    },
    name: {
        type: String
    },
    type: {
        type: String
    },
    faIcon: {
        type: Object
    }
}, {
    timestamps: true,
    bufferCommands: false
})

categorySchema.methods.toJSON = function() {
    return generalHelpers.deleteSystemFields(this.toObject())
}

const Category = mongoose.model('Category', categorySchema)

module.exports = Category