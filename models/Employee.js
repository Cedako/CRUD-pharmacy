const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

//Schema for Employees
const employeeSchema = new Schema({
    position: {type: String, default: "Pharmacist"},
    name: {type: String, required: true},
    password: {type: String, required: true},
    phoneNumber: {type: Number, required: true},
    age: {type: Number, required: true},
    workingSince: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Employee", employeeSchema);