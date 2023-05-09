const lblNewTicket = document.querySelector('#lblNewTicket');
const btnNewTicket = document.querySelector('#btnNewTicket');
const btnTest = document.querySelector('#btnTest');

const socket = io();

// Server online
socket.on('connect', () => {
    btnNewTicket.disable = false;
});

// Server Offline
socket.on('disconnect', () => {
    btnNewTicket.disable = true;
});

//Escuchar
socket.on('last-ticket', ( last ) => {
    lblNewTicket.innerText = 'Ticket ' + last;
});

// Emitir mensaje al hacer clic
btnNewTicket.addEventListener('click', () => {
    socket.emit('next-ticket', null, ( ticket ) => {
        lblNewTicket.innerText = ticket;
    });
});