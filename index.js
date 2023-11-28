const express = require("express");
const Player = require("./models/players.model.js");
const Liga =  require("./models/ligas.model.js");
const PORT = 3000;
const server = express();
const router = express.Router();
const cors = require('cors');

require('./utils/db.js')

const playerRoutes = require('./routes/players.routes.js')
const ligasRoutes = require('./routes/ligas.routes.js')

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: false}))
server.use('/players', playerRoutes)
server.use('/ligas', ligasRoutes)
//añadir para el CORS pero no funciona

server.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || 'Error inesperado');
  })

server.listen(PORT, () => {
    console.log(`Se ha levantado el servidor en el puerto ${PORT}`)
})