const Currency = require('../models/currency.model')

exports.getCurrencies = async (req, res) => {
    try {
        const currencies = await Currency.find({})
        return res.send(currencies)
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
}

exports.insertCurrency = async (req, res) => {
    try {
        const createdCurrency = await Currency.create(req.body)
        res.send(createdCurrency)
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
}