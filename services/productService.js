const ProductModel = require('../models/Products');

//CRUD operations
exports.getAllProducts = async () => {
    return await ProductModel.find();
}

exports.registerProduct = async (product) => {
    return await ProductModel.create(product);
}

exports.getProductById = async (id) => {
    return await ProductModel.findById(id);
}

exports.getProductByName = async (name) => {
    return await ProductModel.find({productName: name})
}

exports.updateProduct = async (id, product) => {
    return await ProductModel.findByIdAndUpdate(id,product);
}

exports.deleteProduct = async (id) => {
    return await ProductModel.findByIdAndDelete(id);
}