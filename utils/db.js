const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URL, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true
}).then(() => 
console.log('Conectado a MongoDB'))
.catch((err) => console.log('Error al conectar'))