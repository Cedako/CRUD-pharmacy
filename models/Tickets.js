const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema for Tickets
const ticketSchema = new Schema({
//posibles nombre de empleado, fecha de compra, medicinas compradas, costo individual, costo total
    employee: {name: String, phoneNumber: Number},
    purchase:[{productName: String, quantity: Number, cost: Number}],
    totalCost: {type: Number, default: 0},
    purchaseDate: {type: Date, default: Date.now},

});

module.exports = mongoose.model("Ticket", ticketSchema);

//En base a la cantidad del producto y su costo se saca el costo total de ese producto y ya al final solo sumammos
//los costos totales de los productos