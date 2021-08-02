const express = require('express');
const usuariosTarjetas = express.Router();
const authToken = require('../auth/authtoken');
const usuarioTarjetaController = require('../controllers/usuariosTarjeta.Controller');

// INSERT
usuariosTarjetas.post('/insert',authToken, usuarioTarjetaController.insertTarjetaUsuario);


// GET
usuariosTarjetas.get('/get', authToken,usuarioTarjetaController.getTarjetaUsuario);


// GET_all_cards
usuariosTarjetas.get('/all_cards', authToken, usuarioTarjetaController.getAllCardsUsuario);


// UPDATE
usuariosTarjetas.post('/update', authToken, usuarioTarjetaController.updateTarjetaUsuario);


// DELETE
usuariosTarjetas.post('/delete', authToken,usuarioTarjetaController.deleteTarjetaUsuario );


// PUNTUA CARTA
usuariosTarjetas.get('/puntuaCarta', authToken, usuarioTarjetaController.puntuaCarta );

module.exports = usuariosTarjetas;