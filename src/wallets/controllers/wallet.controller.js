const Wallet = require('../models/wallet.model')

exports.getWallets = async (req, res) => {
    try {
        const wallets = await Wallet.find({userId: req.user._id})
        return res.send(wallets)
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
}

exports.insertWallet = async (req, res) => {
    try {
        const createdWallet = await Wallet.create(req.body)
        res.send(createdWallet)
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
}

exports.updateWallet = async (req, res) => {
    try {
        const updatedWallet = await Wallet.findOneAndUpdate({_id: req.params.id, userId: req.user._id}, req.body)
        res.send(updatedWallet)
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
}

exports.deleteWallet = async (req, res) => {
    try {
        await Wallet.findOneAndDelete({_id: req.params.id, userId: req.user._id})
        res.send()
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
}