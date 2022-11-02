const express = require("express");
const {
    getAllProducts,
    registerView,
    registerProduct,
    getProductById,
    getProductByName,
    updateView,
    updateProduct,
    deleteProduct
} = require ("../controllers/productController");

const router = express.Router();
//middleware function
function checkAuthenticated (req,res,next) {
    if(req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

router.route("/").get(checkAuthenticated,getAllProducts).post(checkAuthenticated,getProductByName);
router.route("/register").get(checkAuthenticated,registerView).post(checkAuthenticated,registerProduct);
router.route("/:id").get(checkAuthenticated,getProductById).put(checkAuthenticated,updateProduct).delete(checkAuthenticated,deleteProduct).post(checkAuthenticated,updateView);

module.exports = router;