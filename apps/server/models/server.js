const express = require("express");
const cors = require("cors");
const { createServer } = require("http");

const { dbConnection } = require("../database/config");
const { socketController } = require("../sockets/controller");

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.server = createServer( this.app );
        this.io     = require('socket.io')(this.server, {
            cors: {
                origin: "http://localhost:5173",
                methods: ["GET", "POST", 'PATCH', "PUT", "DELETE"],
                credentials: true
            }
        });

        this.paths = {
            auth:       '/api/auth',
            search:     '/api/search',
            categories: '/api/categories',
            products:  '/api/products',
            users:   '/api/users',
            chat: '/api/chat',
            uploads:    '/api/uploads',
        }


        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use( cors({
            origin: "http://localhost:5173",
            methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
            credentials: true
        }) );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.users, require('../routes/users'));
        this.app.use( this.paths.chat, require('../routes/chat'));
        // this.app.use( this.paths.search, require('../routes/search'));
        // this.app.use( this.paths.categories, require('../routes/categories'));
        // this.app.use( this.paths.products, require('../routes/products'));
        // this.app.use( this.paths.uploads, require('../routes/uploads'));
    }

    sockets() {
        this.io.on('connection', ( socket ) => socketController(socket, this.io ) )
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }
}

module.exports = Server;