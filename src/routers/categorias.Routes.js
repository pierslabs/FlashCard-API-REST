const express = require('express');
const authToken = require('../auth/authtoken');
const categorias = express.Router();
const categoriasController = require('../controllers/categorias.Controller');



// GET_list
categorias.get('/get_list', categoriasController.getListCategorias);


// GET
categorias.get('/get', categoriasController.getCategorias);



module.exports = categorias;