const EmployeeService = require('../services/employeeService');
const bcrypt = require('bcrypt');
const passport = require('passport');
//Handlers

//login post
exports.loginEmployee = passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
    failureFlash: true
});

//retrieves all employees from database, prints the result in the console, renders the employees view
exports.getAllEmployees = async (req,res) => {
    try {
        const employees = await EmployeeService.getAllEmployees();
        console.log({ data: employees, status: "success"});
        res.render('employees/employees.ejs', {employees, user:req.user} );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//renders the employee registration form
exports.registerView = async (req,res) => {
    try {
        res.render('employees/register.ejs')
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
}

//captures req.body to store inside a model and then sends the model to the database, at success, gets redirected to /employees
exports.registerEmployee = async (req, res) => {
    try {
        const employee = await EmployeeService.registerEmployee(
            {
                position:req.body.position,
                name:req.body.name,
                //password gets hashed by bcrypt
                password: await bcrypt.hash(req.body.password, 10),
                phoneNumber:req.body.phoneNumber,
                age:req.body.age,
            }
        );
        res.redirect("/employees");
        console.log({ data:employee, status:"success" })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await EmployeeService.getEmployeeById(req.params.id);
        res.render('employees.ejs', {employees:employee, user:req.user} );
        console.log({ data: employee, status: "success"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getEmployeeByName = async (req, res) => {
    try {
        const employee = await EmployeeService.getEmployeeByName(req.body.nameS);
        res.render('employees/employees.ejs', {employees:employee, user:req.user} );
        console.log({ data: employee, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
//update view
exports.updateView = async (req, res) => {
    try {
        const employee = await EmployeeService.getEmployeeById(req.params.id)
        res.render('employees/update.ejs',{employees:employee});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateEmployee = async (req,res) => {
    try {
        const employee = await EmployeeService.updateEmployee(req.params.id, {
            position:req.body.position,
            name:req.body.name,
            //password gets hashed by bcrypt
            phoneNumber:req.body.phoneNumber,
            age:req.body.age
        });
        res.redirect("/employees")
        console.log({ data: employee, status: "success"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await EmployeeService.deleteEmployee(req.params.id);
        console.log({ data: employee, status: "success"});
        res.redirect('/employees')
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};