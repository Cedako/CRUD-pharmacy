const express = require('express');
const {
    getAllTickets,
    generateTicket,
    getTicketById,
    getTicketByEmployee,
    deleteTicket,
    renderTicket,
    addProduct
} = require('../controllers/ticketController');

const router = express.Router();
//middleware function
function checkAuthenticated (req,res,next) {
    if(req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

//routes
router.route('/').get(checkAuthenticated,renderTicket)
router.route('/add').post(checkAuthenticated,addProduct)
router.route('/print').post(checkAuthenticated,generateTicket)

module.exports = router;