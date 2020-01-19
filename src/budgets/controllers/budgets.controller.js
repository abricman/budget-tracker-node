const Budget = require('../models/budget.model')
const Wallet = require('../../wallets/models/wallet.model')
const Transaction = require('../../transactions/models/transaction.model')
const utils = require('../utils/budget.utils')
const transactionUtils = require('../../transactions/utils/transaction.utils')

exports.getBudgetsOverviewModel = async (req, res) => {
    try {
        const wallets = await Wallet.find({userId: req.user.id}).select('_id').lean().exec()
        const walletIds = wallets.map((wallet) => wallet._id)
        const budgets = await Budget.find({wallet: { $in: walletIds}}).populate('wallet', 'name').lean()
        const transactions = await Transaction.find({wallet: { $in: walletIds}}).select('wallet amount').lean()
        const overviewModel = utils.getBudgetsOverviewModel(budgets, transactions)
        return res.send(overviewModel)
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
}

exports.getBudgets = async (req, res) => {
    try {
        const wallets = await Wallet.find({userId: req.user._id}).select('_id').exec().lean()
        const walletIds = wallets.map((wallet) => wallet._id)
        const budgets = await Budget.find({wallet: {$in: walletIds}}).lean()
        return res.send(budgets)
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
}

exports.getBudgetTransactions = async (req, res) => {
    try {
        const budgetId = req.params.id
        const budget = await Budget.findById(budgetId)
        let transactions = await transactionUtils.getTransactionsByTimeFrame(req.user._id, budget.startDate, budget.endDate)
        return res.send(transactions)
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
}

exports.insertBudget = async (req, res) => {
    try {
        const createdBudget = await Budget.create(req.body)
        res.send(createdBudget)
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
}

exports.updateBudget = async (req, res) => {
    try {
        const updatedBudget = await Budget.findOneAndUpdate({_id: req.params.id, "wallet.userId": req.user._id}, req.body)
        res.send(updatedBudget)
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
}

exports.deleteBudget = async (req, res) => {
    try {
        await Budget.findOneAndDelete({_id: req.params.id, "wallet.userId": req.user._id})
        res.send()
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
}