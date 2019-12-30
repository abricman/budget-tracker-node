const Category = require('../models/category.model')

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
        res.send(categories);
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
}

exports.insertCategory = async (req, res) => {
    try {
        const createdCategory = await Category.create(req.body);
        res.send(createdCategory);
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body);
        res.send(updatedCategory);
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.send();
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
}