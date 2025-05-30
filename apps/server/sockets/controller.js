const { Socket } = require('socket.io');
const { comprobarJWT } = require('../helpers');
const { ChatMensajes } = require('../models');
const Chat = require('../models/chat');

const chatMensajes = new ChatMensajes();

const socketController = async( socket = new Socket(), io ) => {

    const user = await comprobarJWT(socket.handshake.headers['x-token']);

    if ( !user ) {
        return socket.disconnect();
    }

    let { messages } = await Chat.findById("67d98e8e58dabf3d42284ce1");

    // Agregar al usuario conectado
    chatMensajes.conectarUsuario( user );
    io.emit('usuarios-activos', chatMensajes.usuariosArr );
    socket.emit('recibir-mensajes', messages);

    // Conectarlo a una sala especial
    socket.join( user.id ); // global, socket.id, usuario.id

    // Limpiar cuando alguien se desconecta
    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario( user.id );
        io.emit('usuarios-activos', chatMensajes.usuariosArr );
    })

    socket.on('enviar-mensaje', async ({ uid, message }) => {
        if ( uid ) {
            // Mensaje privado
            socket.to( uid ).emit( 'mensaje-privado', { of: user.name, message });
        } else {
            let { messages } = await Chat.findById("67d98e8e58dabf3d42284ce1");

            io.emit('recibir-mensajes', messages );
        }
    })
}

module.exports = {
    socketController
}