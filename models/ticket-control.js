const path = require('path');
const fs   = require('fs');

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
}

module.exports = TicketControl;