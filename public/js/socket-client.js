const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

// Este es el socket del cliente que esta usando la app
// El io() es el que importamos en el html
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
