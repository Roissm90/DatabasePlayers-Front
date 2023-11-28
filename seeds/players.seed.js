const mongoose = require('mongoose');
const Player = require('../models/players.model')
require('dotenv').config()

const playersSeed = [
  {
    nombre: "Lionel Messi",
    edad: 34,
    nacionalidad: "Argentina",
    posicion: "Delantero",
    retirado: false,
    liga: "LaLiga",
  },
  {
    nombre: "Cristiano Ronaldo",
    edad: 36,
    nacionalidad: "Portugal",
    posicion: "Delantero",
    retirado: false,
    liga: "LaLiga",
  },
  {
    nombre: "Zinedine Zidane",
    edad: 48,
    nacionalidad: "Francia",
    posicion: "Mediocampista",
    retirado: true,
    liga: "Serie A",
  },
  {
    nombre: "Ronaldinho",
    edad: 40,
    nacionalidad: "Brasil",
    posicion: "Mediocampista",
    retirado: true,
    liga: "LaLiga",
  },
  {
    nombre: "David Beckham",
    edad: 45,
    nacionalidad: "Inglaterra",
    posicion: "Mediocampista",
    retirado: true,
    liga: "Premier League",
  },
  {
    nombre: "Paolo Maldini",
    edad: 52,
    nacionalidad: "Italia",
    posicion: "Defensor",
    retirado: true,
    liga: "Serie A",
  },
  {
    nombre: "Andrés Iniesta",
    edad: 36,
    nacionalidad: "España",
    posicion: "Mediocampista",
    retirado: false,
    liga: "LaLiga",
  },
  {
    nombre: "Thierry Henry",
    edad: 43,
    nacionalidad: "Francia",
    posicion: "Delantero",
    retirado: true,
    liga: "Premier League",
  },
  {
    nombre: "Steven Gerrard",
    edad: 40,
    nacionalidad: "Inglaterra",
    posicion: "Mediocampista",
    retirado: true,
    liga: "Premier League",
  },
  {
    nombre: "Francesco Totti",
    edad: 44,
    nacionalidad: "Italia",
    posicion: "Delantero",
    retirado: true,
    liga: "Serie A",
  },
  {
    nombre: "Xavi Hernández",
    edad: 41,
    nacionalidad: "España",
    posicion: "Mediocampista",
    retirado: false,
    liga: "LaLiga",
  },
];

const playerDocuments = playersSeed.map(player => new Player(player));

mongoose.connect(process.env.MONGODB_URL, {

})
.then(async () => {
  console.log('Conectado a MongoDB');
  const allPlayers = await Player.find();
  if(allPlayers.length) {
    await Player.collection.drop();
  }
})
.catch(err => console.log('Error al borrar jugadores', err))
.then(async () => {
  await Player.insertMany(playerDocuments);
})
.catch((err) => console.log(`Error al crear los jugadores: ${err}`))
.finally(() => 
  mongoose
    .disconnect()
    .then(() => console.log('Desconectado con éxito'))
);