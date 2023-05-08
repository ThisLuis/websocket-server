const TicketControl = require('../models/ticket-control');
// Esta instancia es unica cada vez que se reinicialice el backend**
const ticketControl = new TicketControl();

const socketController = (socket) => {

    // ** Estos no se ejecutan debido a que son observables, van a estar pendientes en esta parte del servver
    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });

    // EL payload es lo que recibimos del cliente
    socket.on('send-message', ( payload, callback ) => {
        const id = 123123;
        callback( id );
        // Emitir mensaje a los clientes, aqui lo mandamos, en el cliente debemos de escucharlo
        socket.broadcast.emit('send-message', payload );
    });
};

module.exports = {
    socketController,
}