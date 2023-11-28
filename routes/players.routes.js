const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Player = require('../models/players.model');

router.get('/', async(req, res, next) => {
    try {
        const players = await Player.find().populate('ligaInfo');
        return res.status(200).json(players)
    }
    catch (err) {
        next(err)
    }
})

router.get('/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        const playerFound = await Player.findById(id);
        return res.status(200).json(playerFound)
    }
    catch (err) {
        next(err)
    }
})

router.post('/add-new', async (req, res, next) => {
    try {
        console.log(req.body)
        const newPlayer = new Player({
            nombre: req.body.nombre,
            edad: req.body.edad,
            nacionalidad: req.body.nacionalidad,
            posicion: req.body.posicion,
            retirado: req.body.retirado,
            liga: req.body.liga,
        });
        const createdPlayer = await newPlayer.save();

        console.log(newPlayer);
        res.status(201).json(createdPlayer)
    }
    catch (err) {
        next(err)
    }
})

router.put('/updateById/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        const playerToModify = new Player(req.body);
        playerToModify._id = id;
        const playerUpdated = await Player.findByIdAndUpdate(id, playerToModify);
        if (!playerUpdated) {
            let error = new Error('Jugador no encontrado');
            error.status = 404;
            throw error;
        } else {
            //res.status(200).json(characterUpdate);//envia version antigua
            res.status(200).json(playerUpdated);//envia version modificada
            console.log(playerUpdated);
        }
    } 
    catch (err) {
        next(err)
    }
})

router.put('/add-league-to-player', async (req, res, next) => {
    try {
        const playerId = req.body.playerId; 
        const ligaId = req.body.ligaId;
        const updatedPlayer = await Player.findByIdAndUpdate(playerId, {
            $push: { ligaInfo: ligaId } 
        });
        if (!updatedPlayer) {
            return res.status(404).json({ error: 'Jugador no encontrado' });
        }
        return res.status(200).json(updatedPlayer);
    } 
    catch (err) {
        return next(err);
    }
});

module.exports = router;