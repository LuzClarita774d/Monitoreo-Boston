// Estructura esperada en tu archivo de sockets:
module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(` Nuevo dispositivo conectado al canal de sockets: ${socket.id}`);
        
       
    });
};