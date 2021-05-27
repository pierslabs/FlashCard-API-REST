const express = require('express');
const usuariosTarjetas = express.Router();
const db = require('../config/db');
const authToken = require('../auth/authtoken');
const helper = require('../helper/helpers');

// INSERT
usuariosTarjetas.post('/insert',authToken, async(req, res) => {
	const recibido = req.body;
	
	// validamos que existen los datos necesarios en la API
	const array_json_validator = helper.require_data(['ID_usuarios_mazo', 'pregunta','respuesta'],recibido);
	
	if(array_json_validator == false){
		res.status(401).json('Faltan datos obligatorios');
		return;
	}
  

	// Realizamos Query
	const consult =  await db('usuarios_mazo_tarjetas')
	.insert({
		ID_usuarios: req.ID_usuario, 
		ID_usuarios_mazo: recibido.ID_usuarios_mazo, 
		pregunta: recibido.pregunta, 
		respuesta: recibido.respuesta, 
	});
	
	res.json({status: true, data:consult});
});


// GET
usuariosTarjetas.get('/get', authToken, async(req, res) => {
	const recibido = req.body;
	
	// validamos que existen los datos necesarios en la API
	const array_json_validator = helper.require_data(['ID'],recibido);
	
	if(array_json_validator == false){
		res.status(401).json('Faltan datos obligatorios');
		return;
	}

	// Realizamos la Query
	const result = await db
	.select('*')
	.from('usuarios_mazo_tarjetas')
	.where('ID', recibido.ID)
	.where('ID_usuarios', req.ID_usuario);

	res.json({ status: true, data: result});
});


// GET_all_cards
usuariosTarjetas.get('/all_cards', authToken, async(req, res) => {
	const recibido = req.query; // for js get -> jsPure only send data in get method in headers "no body"/ for curl etc... req.body / 

	// validamos que existen los datos necesarios en la API
	const array_json_validator = helper.require_data(['ID_usuarios_mazo'],recibido);

	if(array_json_validator == false){
		res.status(401).json('Faltan datos obligatorios');
		return;
	}

	//Realizamos Query 
	const result = await db
	.select('*')
	.from('usuarios_mazo_tarjetas')
	.where('ID_usuarios_mazo', recibido.ID_usuarios_mazo)
	.where('ID_usuarios', req.ID_usuario);
	
	res.json({ status: true, data: result});
});




// UPDATE
usuariosTarjetas.post('/update', authToken, async(req, res) => {
	const recibido = req.body;

	// validamos que existen los datos necesarios en la API
	const array_json_validator = helper.require_data(['pregunta','respuesta','ID'],recibido);

	if(array_json_validator == false){
		res.status(401).json('Faltan datos obligatorios');
		return;
	}

	// creamos un array vacia para insertar datos de la API y poder actualizarlos todos a la vez.
	const toUpdate = {};
	if(recibido.hasOwnProperty('pregunta')){toUpdate.pregunta = recibido.pregunta; }
	if(recibido.hasOwnProperty('respuesta')){toUpdate.respuesta = recibido.respuesta; }
	
	// Realizamos Query
	const consult = await db('usuarios_mazo_tarjetas')
	.update(toUpdate)
	.where('ID', recibido.ID)
	.where('ID_usuarios', req.ID_usuario);

	res.json({staus: true, data: consult});
});


// DELETE
usuariosTarjetas.post('/delete', authToken, async(req,res) => {
	const recibido = req.body;

	// validamos que existen los datos necesarios en la API
	const array_json_validator = helper.require_data(['ID'],recibido);

	if(array_json_validator == false){
		res.status(401).json('Faltan datos obligatorios');
		return;
	}	

	// realizamos consulta
	const consult = await db('usuarios_mazo_tarjetas')
	.where("ID",recibido.ID)
	.where("ID_usuarios", req.ID_usuario)
	.delete();
	
	res.json({staus:true , data: consult});
});


// PUNTUA CARTA
usuariosTarjetas.get('/puntuaCarta', authToken, async(req,res) => {
	const recibido = req.body;

	// validamos campos obligatorios
	const array_json_validator = helper.require_data(['ID'], recibido);
	if(array_json_validator == false){
		res.status(401).json({staus:false, data:'Falta algun dato obligatorio'});
	}

	// realizamos la query
	const result = await db.select('puntos')
							.from('usuarios_mazo_tarjetas')
							.where('ID',recibido.ID)
							.where('ID_usuarios', req.ID_usuario);

     res.json({status: true, data: result});
});

module.exports = usuariosTarjetas;