const TicketService = require("../services/ticketService");
const ProductService = require("../services/productService")
//Handlers
exports.getAllTickets = async (req,res) => {
    try {
        const tickets = await TicketService.getAllTickets();
        res.render('tickets/shoppingcart', {tickets, user: req.user})
        console.log({data: tickets, status:"success"});
        //render
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}
const cart = []
exports.renderTicket = async (req,res) => {
    try{
        const products = await ProductService.getAllProducts();
        console.log({data: cart, status:"success"});
        res.render('tickets/shoppingcart', {products, ticket:cart, user:req.user} )
    } catch(err){
        res.status(500).json({error: err.message})
    }
}
exports.addProduct = async (req,res) => {
    try {
        const products = await ProductService.getAllProducts();
        cart.push({productName: req.body.productName, quantity: req.body.quantity, cost:req.body.cost})
        console.log({data: cart, status:"success"});
        res.redirect('/buy')
        //res.render('tickets/shoppingcart', {products, cart, user:req.user} )
    } catch(err){
        res.status(500).json({error: err.message})
    }
    

}

exports.generateTicket = async (req,res) => {
    try{
        const ticket = await TicketService.generateTicket({
            employee:req.user,
            purchase:cart,
            totalCost:req.body.total
        });
        cart.splice(0,cart.length);
        console.log({ data: ticket, status:"success"});
        res.render('tickets/ticket', {ticket, user:req.user})
    }catch (err){
        res.status(500).json({error: err.message});
    }
}

exports.getTicketById = async (req,res) => {
    try{
        const ticket = await TicketService.getTicketById(req.params.id);
        console.log({ data: ticket, status: "success" })
    }catch (err){
        res.status(500).json({error: err.message});
    }
}

exports.getTicketByEmployee = async (req,res) => {
    try{
        const ticket = await TicketService.getTicketByEmployee(req.body.employee);
        console.log({ data: ticket, status: "success" })
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

exports.deleteTicket = async (req,res) => {
    try{
        const ticket = await TicketService.deleteTicket(req.params.id);
        console.log({deleted: ticket, status: "success"})
    } catch (err){
        res.status(500).json({error: err.message});
    }
}