const ProductService = require('../services/productService');

//Handlers
exports.getAllProducts = async (req,res) => {
    try {
        const products = await ProductService.getAllProducts();
        console.log({ data: products, status: "success"});
        res.render('products/products.ejs', {products} ); //change to render views
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.registerView = async (req,res) => {
    try {
        res.render('products/register.ejs')
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
}

exports.registerProduct = async (req, res) => {
    try {
        const product = await ProductService.registerProduct({
            productName: req.body.productName,
            type: req.body.type,
            quantity: req.body.quantity,
            cost: req.body.cost,
            recipe: Boolean(req.body.recipe)
        });
        res.redirect("/products")
        console.log({ data: product, status: "success"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await ProductService.getProductById(req.params.id);
        res.json({ data: product, status: "success"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProductByName = async (req, res) => {
    try {
        const product = await ProductService.getProductByName(req.body.nameS);
        res.render("products/products", {products:product, user:req.user})
        console.log({ data: product, satus: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateView = async (req, res) => {
    try {
        const product = await ProductService.getProductById(req.params.id)
        res.render('products/update.ejs',{products:product});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateProduct = async (req,res) => {
    try {
        const product = await ProductService.updateProduct(req.params.id, {
            productName: req.body.productName,
            type: req.body.type,
            quantity: req.body.quantity,
            cost: req.body.cost,
            recipe: Boolean(req.body.recipe)
        });
        res.redirect("/products")
        console.log({ data: product, status: "success"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await ProductService.deleteProduct(req.params.id);
        res.redirect("/products")
        console.log({ data: product, status: "success"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};