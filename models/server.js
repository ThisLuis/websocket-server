const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        // Manejamos server como propiedad de la clase, - En createServer mandamos nuestra app de express
        this.server = require('http').createServer( this.app );
        // Propiedad io le mandamos el server que creamos arriba - io es toda la info de nuestros sockets conectados
        this.io     = require('socket.io')( this.server );

        this.paths = {};

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Configuracion de sockets
        this.sockets();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {

        // this.app.use( this.paths.productos, require('../routes/productos'));

    }

    sockets() {
        this.io.on('connection', socket => {
            console.log('Cliente conectado', socket.id);

            socket.on('disconnect', () => {
                console.log('Cliente desconectado', socket.id);
            });
            // EL payload es lo que recibimos del cliente
            socket.on('send-message', ( payload ) => {
                console.log(payload);
            })
        });
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;