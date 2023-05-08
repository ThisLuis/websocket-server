const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend    = document.querySelector('#btnSend');

// Este es el socket del cliente que esta usando la app
// El io() es el que importamos en el html
// socket mantiene el estado de la conexion con el servidor
// .on - escuchar
// .emit - emitir evento
const socket = io();

// Listeners
socket.on('connect', () => {
    console.log('Conectado');
    lblOnline.style.display = ''
    lblOffline.style.display = 'none';
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
    lblOnline.style.display = 'none'
    lblOffline.style.display = '';
});

socket.on('send-message', payload => {
    console.log(payload);
});

btnSend.addEventListener('click', () => {
    const message = txtMessage.value;
    const payload = {
        message,
        id: '123ABC',
        date: new Date().getTime()
    };
    // emitir mensaje al servidor, el server tiene que escucharlo
    socket.emit('send-message', payload );
})