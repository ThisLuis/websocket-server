const TicketControl = require('../models/ticket-control');
// Esta instancia es unica cada vez que se reinicialice el backend**
const ticketControl = new TicketControl();

const socketController = (socket) => {

    // Emitir mensaje a quien se conecte por primera vez
    socket.emit('last-ticket', ticketControl.last);
    
    
    // 
    socket.on('next-ticket', ( payload, callback ) => {
        const next = ticketControl.next();
        callback( next );

        // TODO: Notificar que hay un nuevo ticket pendiente de asignar
    });
    // // ** Estos no se ejecutan debido a que son observables, van a estar pendientes en esta parte del servver
    // socket.on('disconnect', () => {
    //     console.log('Cliente desconectado', socket.id);
    // });

    // // EL payload es lo que recibimos del cliente
    // socket.on('send-message', ( payload, callback ) => {
    //     const id = 123123;
    //     callback( id );
    //     // Emitir mensaje a los clientes, aqui lo mandamos, en el cliente debemos de escucharlo
    //     socket.broadcast.emit('send-message', payload );
    // });

    socket.on('atender-ticket', ( { escritorio }, callback ) => {
        if( !escritorio ) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.attendTicket( escritorio );

        // TODO: Notificar cambio en los ultimos 4

        if( !ticket ) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        } else {
            callback({
                ok: true,
                ticket
            })
        }
    });

};

module.exports = {
    socketController,
}