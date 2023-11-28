const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema (
    {
        nombre: {type: String, required: true},
        edad: {type: Number},
        nacionalidad: {type: String},
        posicion: {type: String},
        retirado: {type: Boolean},
        liga: {type: String},
        ligaInfo: { type: mongoose.Types.ObjectId, ref: 'Liga' }
    },
    {
        timestamps: true
    }  
);

const Player = mongoose.model('PLayer', playerSchema);

module.exports = Player;