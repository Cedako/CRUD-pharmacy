const EmployeeModel = require("../models/Employee");

//CRUD operations
//find() request to the database, returns all Employees
exports.getAllEmployees = async () => {
    return await EmployeeModel.find();
}
//create() request to the database, returns the Employee created
exports.registerEmployee = async (employee) => {
    return await EmployeeModel.create(employee);
};
//findById() request to the database, returns the Employee which ID matches the one provided
exports.getEmployeeById = async (id) => {
    return await EmployeeModel.findById(id);
};
//find() request to the database, returns all Employees which name matches the name provided
exports.getEmployeeByName = async (name) => {
    return await EmployeeModel.find({ name: name });
}
//findByIdAndUpdate() request to the database, returns the Employee which Id matches and updates its data by passing a model with the data we want to update
exports.updateEmployee = async (id, employee) => {
    return await EmployeeModel.findByIdAndUpdate(id, employee);
};
//findByIdAndDelete() request to the database, returns the Employee which Id matches, then deletes it from the database
exports.deleteEmployee = async (id) => {
    return await EmployeeModel.findByIdAndDelete(id);
};