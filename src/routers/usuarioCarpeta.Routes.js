const express = require ('express');
const userCarpeta = express.Router();

const carpetaUsuario = require('../controllers/usuarioCarpeta.Controller');
const authToken = require('../auth/authtoken');

//insert
userCarpeta.post('/insert',authToken, carpetaUsuario.insertCarpetaUsuario);


//get
userCarpeta.get('/get', authToken, carpetaUsuario.getCarpetaUsuario);


// get_list          
userCarpeta.get('/get_list',authToken, carpetaUsuario.getListCarpetaUsuario);



//update
userCarpeta.post('/update', authToken, carpetaUsuario.updateCarpetaUsuario);



//delete
userCarpeta.post('/delete', authToken, carpetaUsuario.deleteCarpetaUsuario);

module.exports = userCarpeta;