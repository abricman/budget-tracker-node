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

/* transactionSchema.virtual('wallet_record', {
    ref: 'Wallet',
    localField: 'wallet',
    foreignField: 'userId',
    justOne: true
})

transactionSchema.virtual('category_record', {
    ref: 'Category',
    localField: 'category',
    foreignField: 'userId',
    justOne: true
})

transactionSchema.set('toObject', { virtuals: true });
transactionSchema.set('toJSON', { virtuals: true }); */

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