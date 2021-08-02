const express = require('express');
const mazosUsuario = express.Router();
const authtoken = require ('../auth/authtoken'); 	
const mazoUsuario = require('../controllers/usuariosMazos.Controller');


// INSERT
mazosUsuario.post('/insert', authtoken, mazoUsuario.insertMazoUsuario);

// GET
mazosUsuario.get('/get' , authtoken, mazoUsuario.getMazoUsuario);

// GET_list
mazosUsuario.get('/get_list' ,authtoken , mazoUsuario.getListMazoUsuario);

// UPDATE
mazosUsuario.post('/update' ,authtoken, mazoUsuario.updateMazoUsuario);

// DELETE
mazosUsuario.post('/delete' , authtoken, mazoUsuario.deleteMazoUsuario);


module.exports = mazosUsuario;