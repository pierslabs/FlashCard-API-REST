const express = require('express');
const authToken = require('../auth/authtoken');
const tarjetasPredefinidas = express.Router();
const tarjetasPredefinidasController = require('../controllers/tarjetasPredefinidas.Controller');


// INSERT
tarjetasPredefinidas.post('/insert', authToken, tarjetasPredefinidasController.insertTarjeta);

// GET
tarjetasPredefinidas.get('/get', authToken, tarjetasPredefinidasController.getTarjeta);

// GETLIST
tarjetasPredefinidas.get('/getlist', authToken, tarjetasPredefinidasController.getListTarjetas);


// UPDATE
tarjetasPredefinidas.post('/update', authToken, tarjetasPredefinidasController.updateTarjeta);


// DELETE
tarjetasPredefinidas.post('/delete',authToken, tarjetasPredefinidasController.deleteTarjeta);


module.exports = tarjetasPredefinidas;