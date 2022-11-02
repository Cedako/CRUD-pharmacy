const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema for Product
const productSchema = new Schema({
    productName: {type: String, required: true},
    type: {type: String, required: true}, //Tipo de medicina: Sublingual, oral, pastillas, capsulas, unguentos, supositorios, inyectables
    quantity: {type: Number, required: true}, //cantidad en cajas o individuales
    cost: {type: Number, required: true}, //costo de medicina 
    recipe: {type: Boolean, required: true}, // Necesita receta o no
    registeredAt: {type: Date, default: Date.now},
    lastSupplied: {type: Date, default: Date.now}
    
});

module.exports = mongoose.model("Product", productSchema);