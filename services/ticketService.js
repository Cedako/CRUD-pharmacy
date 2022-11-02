const TicketModel = require('../models/Tickets');

//CRUD operations
exports.getAllTickets = async () => {
    return await TicketModel.find();
}

exports.generateTicket = async (ticket) => {
    return await TicketModel.create(ticket)
}

exports.getTicketById = async (id) => {
    return await TicketModel.findById(id);
}

exports.getTicketByEmployee = async (employee) => {
    return await TicketModel.find({ employee: employee });
}

exports.deleteTicket = async (id) => {
    return await TicketModel.findByIdAndDelete(id);
}