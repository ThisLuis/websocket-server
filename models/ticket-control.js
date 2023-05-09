const path = require('path');
const fs   = require('fs');

class Ticket {
    constructor( number, desk ) {
        this.number = number;
        this.desk   = desk;
    }
}

class TicketControl {
    constructor() {
        this.last        = 0;
        this.today       = new Date().getDate();
        this.tickets = [];
        this.lastFour    = [];

        this.init();
    }

    // Cuando llamemos este metodo va a generar un objeto
    get toJson() {
        return {
            last:        this.last,
            today:       this.today,
            tickets:     this.tickets,
            lastFour:    this.lastFour
        }
    }

    init() {
        const { last, today, tickets, lastFour} = require('../db/data.json');
        // Si estamos en el mismo dia de hoy, mantenemos los datos
        if( today === this.today ) {
            this.tickets  = tickets;
            this.last     = last;
            this.lastFour = lastFour;
        } else {
            this.saveDB();
        }
    }

    saveDB() {
        // Creamos el path de donde se encuentra nuestra data
        const dbPath = path.join( __dirname, '../db/data.json');
        fs.writeFileSync( dbPath, JSON.stringify( this.toJson ));
    }

    next() {
         this.last += 1;
         // El desk lo mandamos como null porque aun no esta siendo atendido
         const ticket = new Ticket(this.last, null);
         // this.tickets,push( new Ticket(this.last, null) );
         this.tickets.push( ticket );

         this.saveDB();
         return 'Ticket ' + ticket.number;
    }

    // Atendera un ticket respectivo
    // Este metodo puede retornar 2 cosas, la primera es un null en caso de que los tickets esten vacios
    // O puede retornar el ticket que este desk tiene que atender
    attendTicket( desk ) {
        // No tenemos tickets
        if( this.tickets.length === 0 ) {
            return null;
        }

        // Obtenemos el primer ticket que nos retorna shift, el cual es eliminado del arreglo, el primero
        // Ahora ticket es una instancia de una nueva constante, ya no esta en el arreglo de tickets
        const ticket = this.tickets.shift(); // this.tickets[0];
        ticket.desk = desk;

        // Añadimos al principio el ticket al arreglo de ultimos4
        this.lastFour.unshift( ticket );

        // Verificamos que lastFour sean solo 4, de lo contrario borramos el ultimo
        if( this.lastFour.length > 0 ) {
            this.lastFour.splice(-1, 1);
        }

        this.saveDB();
        return ticket;
    }
}

module.exports = TicketControl;