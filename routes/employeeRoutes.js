const express = require("express");
const {
    loginEmployee,
    getAllEmployees,
    registerView,
    registerEmployee,
    updateView,
    getEmployeeById,
    getEmployeeByName,
    updateEmployee,
    deleteEmployee
} = require ("../controllers/EmployeeController");

const router = express.Router();
//middleware function
function checkAuthenticated (req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}
function checkNotAuthenticated (req,res,next) {
    if(req.isAuthenticated()) {
        return res.redirect('/');
    }

    return next();
}

//index
router.route("/").get(checkAuthenticated,(req,res) => res.render('index', {user:req.user}));
//log in
router.route("/login").get(checkNotAuthenticated,(req,res)=>res.render('login')).post(checkNotAuthenticated,loginEmployee);
//log out
router.route("/logout").delete((req,res) => {
    req.logOut((err) => {
        if (err) return next(err);
        res.redirect('/login');
    })
})
//gets all the employees registered in the database
router.route("/employees").get(checkAuthenticated,getAllEmployees).post(checkAuthenticated,getEmployeeByName);
//gets formulary to register a new employee, posts the new employee
router.route("/employees/register").get(checkAuthenticated,registerView).post(registerEmployee);
//using id; gets the specified employee, updates the employee or deletes the employee
router.route("/employees/:id").get(checkAuthenticated,getEmployeeById).put(checkAuthenticated,updateEmployee).delete(checkAuthenticated,deleteEmployee).post(checkAuthenticated,updateView);

module.exports = router;