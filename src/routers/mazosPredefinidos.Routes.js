const express = require('express');
const authToken = require('../auth/authtoken');
const mazosPredefinidos = express.Router();
const db = require('../config/db');
const helper = require('../helper/helpers');
const mazosPredefinidosController = require('../controllers/mazosPredefinidos.Controller');


// INSERT
mazosPredefinidos.post('/insert_buk', authToken, mazosPredefinidosController.insertMazoPredefinido);


// GET
mazosPredefinidos.get('/get',authToken, mazosPredefinidosController.getMazosPredefinidos);


// GET_list
mazosPredefinidos.get('/getList',authToken, mazosPredefinidosController.getListMazosPredefinidos );


// UPDATE
mazosPredefinidos.post('/update', authToken, mazosPredefinidosController.updateMazosPredefinidos );


// DELETE
mazosPredefinidos.post('/delete', authToken, mazosPredefinidosController.deleteMazosPredefinidos);

module.exports = mazosPredefinidos;