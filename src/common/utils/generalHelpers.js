const deleteSystemFields = (model) => {
    delete model.createdAt
    delete model.updatedAt
    delete model.__v
    return model
}

module.exports = {
    deleteSystemFields
}