const mongoose = require('mongoose')
const Schema = mongoose.Schema;
//const validator = require('validator')

const transactionSchema = new mongoose.Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'User'
        //required: true
    },
    wallet: {
        type: Schema.ObjectId,
        ref: 'Wallet'
        //required: true
    },
    category: {
        type: Schema.ObjectId,
        ref: 'Category'
        //required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    note: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
    bufferCommands: false
})

transactionSchema.statics.findMonthlyTransactions = async (year, month, sort) => {
    const transactions = await Transaction.find({ date: { $year: year, $month: month} })
    return transactions
}

transactionSchema.statics.getTransactionsSummary = async (transactions) => {
    let summary = {}
    return summary
}

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction