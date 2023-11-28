const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ligaSchema = new Schema (
    {
        nombre: {type: String, required: true},
        pais: {type: String, required: true},
        nivel: {type: String, required: true},
        numeroEquipos: {type: Number, required: true},
        fundacion: {type: Number, required: true}
    },
    {
        timestamps: true
    }  
);

const Liga = mongoose.model('Liga', ligaSchema);

module.exports = Liga;