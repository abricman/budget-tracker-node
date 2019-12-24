const Transaction = require('../models/transaction.model')
const utils = require('../utils/transaction.utils')
const moment = require('moment')

exports.getMonthlyTransactions = async (req, res) => {
    try {
        // Get and check params validity
        const year = parseInt(req.params.year)
        const month = parseInt(req.params.month)
        // Set transactions time frame
        const startDate = moment({ year, month, day: 1})
        const endDate = moment({ year, month, day: 1}).add(1, 'M')
        // Get users transactions for the specified timeframe
        let query = {
            userId: req.user.id, 
            date: { $gte: startDate.toDate(), $lt: endDate.toDate() }
        }
        let projection = { date: 1, amount: 1 }
        const transactions = await Transaction.
        find(query, projection).
        sort({ date: 1 }).
        populate('wallet').
        populate('category').
        exec()
        // Get the model with tabs and all transactions info
        const monthTransactionsModel = utils.getMonthTransactionsModel(transactions, year, month);
        return res.status(200).send(monthTransactionsModel)
    } catch (e) {
        console.log(e)
        res.status(400).send(e.message)
    }
}

exports.getTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({
            id: req.params.id,
            userId: req.user.id
        })
        res.send(transaction);
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
}

exports.insertTransaction = async (req, res) => {
    try {
        const createdTransaction = await Transaction.create(req.body);
        res.send(createdTransaction);
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
}

exports.updateTransaction = async (req, res) => {
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body);
        res.send(updatedTransaction);
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
}

exports.deleteTransaction = async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.send();
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
}