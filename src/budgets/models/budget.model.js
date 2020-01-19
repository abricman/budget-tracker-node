const mongoose = require('mongoose')
const Schema = mongoose.Schema
const generalHelpers = require('../../common/utils/generalHelpers')

const budgetSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    wallet: {
        type: Schema.ObjectId,
        required:true,
        ref: 'Wallet'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Category'
    }
}, {
    timestamps: true,
    bufferCommands: false
})

budgetSchema.methods.toJSON = function() {
    return generalHelpers.deleteSystemFields(this.toObject())
}

const Budget = mongoose.model('Budget', budgetSchema)

module.exports = Budget