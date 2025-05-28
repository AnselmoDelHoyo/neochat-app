class Mensaje {
    constructor( uid, name, message ) {
        this.uid     = uid;
        this.name  = name;
        this.message = message;
    }
}

class ChatMensajes {

    constructor() {
        this.mensajes = [
            {
                uid: "23r98fj0aj2j3rajohqo4tipur",
                name: "Luis Del Hoyo",
                message: "Saludos a todos los integrantes del chat"
            },
            {
                uid: "23r98fj0aj2j3rajohqo4tipur",
                name: "Luis Del Hoyo",
                message: "Saludos a todos los integrantes del chat"
            },
            {
                uid: "23r98fj0aj2j3rajohqo4tipur",
                name: "Luis Del Hoyo",
                message: "Saludos a todos los integrantes del chat"
            },
            {
                uid: "23r98fj0aj2j3rajohqo4tipur",
                name: "Luis Del Hoyo",
                message: "Saludos a todos los integrantes del chat"
            },
            {
                uid: "23r98fj0aj2j3rajohqo4tipur",
                name: "Luis Del Hoyo",
                message: "Saludos a todos los integrantes del chat"
            },
            {
                uid: "23r98fj0aj2j3rajohqo4tipur",
                name: "Luis Del Hoyo",
                message: "Saludos a todos los integrantes del chat"
            },
            {
                uid: "23r98fj0aj2j3rajohqo4tipur",
                name: "Luis Del Hoyo",
                message: "Saludos a todos los integrantes del chat"
            },
            {
                uid: "23r98fj0aj2j3rajohqo4tipur",
                name: "Luis Del Hoyo",
                message: "Saludos a todos los integrantes del chat"
            },
            {
                uid: "23r98fj0aj2j3rajohqo4tipur",
                name: "Luis Del Hoyo",
                message: "Saludos a todos los integrantes del chat"
            },
            {
                uid: "23r98fj0aj2j3rajohqo4tipur",
                name: "Luis Del Hoyo",
                message: "Saludos a todos los integrantes del chat"
            },
            {
                uid: "23r98fj0aj2j3rajohqo4tipur",
                name: "Luis Del Hoyo",
                message: "Saludos a todos los integrantes del chat"
            },
            {
                uid: "23r98fj0aj2j3rajohqo4tipur",
                name: "Luis Del Hoyo",
                message: "Saludos a todos los integrantes del chat"
            },
        ];
        this.usuarios = {};
    }

    get ultimos10() {
        this.mensajes = this.mensajes.splice(0,10);
        return this.mensajes;
    }

    get usuariosArr() {
        return Object.values( this.usuarios ); // [ {}, {}, {}]
    }

    enviarMensaje( uid, name, message ) {
        this.mensajes.unshift(
            new Mensaje(uid, name, message)
        );
    }

    conectarUsuario( usuario ) {
        this.usuarios[usuario.id] = usuario
    }

    desconectarUsuario( id ) {
        delete this.usuarios[id];
    }

}

module.exports = ChatMensajes;