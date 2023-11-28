const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Liga = require('../models/ligas.model');

router.get('/', async (req, res, next) => {
    try {
        const ligas = await Liga.find(); // dar todos los elementos a la costante creada
        return res.status(200).json(ligas)
    }
    catch(err) {
        next(err)
    }
});

router.post('/add-new', async (req, res, next) => {
    try {
        console.log(req.body)
        const newLiga = new Liga({
            nombre: req.body.nombre,
            pais: req.body.pais,
            nivel: req.body.nivel,
            numeroEquipos: req.body.numeroEquipos,
            fundacion: req.body.fundacion
        });
        const createdLiga = await newLiga.save();

        console.log(newLiga);
        res.status(201).json(createdLiga)
    }
    catch (err) {
        next(err)
    }
})

module.exports = router