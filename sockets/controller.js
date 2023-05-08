
const socketController = (socket) => {

    console.log('Cliente conectado', socket.id);

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