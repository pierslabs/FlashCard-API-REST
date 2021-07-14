const express = require('express');
const mazosUsuario = express.Router();
const db = require('../config/db');					//OK
const authtoken = require ('../auth/authtoken'); 	//OK
const helper = require('../helper/helpers');		



// INSERT
mazosUsuario.post('/insert', authtoken, async(req, res) => {
	const recibido = req.body;
	
	// validamos que existen los datos necesarios en la API
	const array_json_validator = helper.require_data([
								'ID_usuarios_carpetas',
								'ID_categorias',
								'nombre',
								'importancia'], recibido);
									

		if(array_json_validator == false){
			res.status(401).json('Faltan datos obligatorios');
			return;
		}

	
	// realizamos consulta 
	const result = await db('usuarios_mazo')
	.insert({
		ID_usuarios: req.ID_usuario, // Viene de authToken documentación en authtoken.js
		ID_usuarios_carpetas: recibido.ID_usuarios_carpetas,
		ID_categorias: recibido.ID_categorias,
		nombre: recibido.nombre,
		importancia: recibido.importancia,

	});
	
	res.json({status:true, data: result});

})


// GET
mazosUsuario.get('/get' , authtoken, async(req, res) => {
	const recibido = req.body;     // for js get ->  jsPure only send data in get method in headers "no body"/ for curl etc... req.body / 

		// validamos que existen los datos necesarios en la API
		const array_json_validator = helper.require_data(['ID'],recibido);

		if(array_json_validator == false){
			res.status(401).json('Faltan datos obligatorios');
			return;
		}
	
	const result = await db
	.select('*')
	.from('usuarios_mazo')
	.where ("ID", recibido.ID)
	.where ("ID_usuarios", req.ID_usuario);

	res.json({status: true, data: result });
})


// GET_list
mazosUsuario.get('/get_list' ,authtoken, async(req, res) => {

	const enviado =req.query;	 // for js get -> jsPure only send data in get method in headers "no body"/ for curl etc... req.body / 

	const array_json_validator = helper.require_data(['ID_usuarios_carpetas'],enviado );

	if(array_json_validator == false){
		return res.status(401).json({status:false, data:'Faltan datos obligatorios'});
		
	}



	const result = await db
	.select('*')
	.from('usuarios_mazo')
	.where('ID_usuarios_carpetas', enviado.ID_usuarios_carpetas);

	res.json({status: true, data: result });
})


// UPDATE
mazosUsuario.post('/update' ,authtoken, async(req, res) => {
	const recibido = req.body;

	// validamos que existen los datos necesarios en la API
	const array_json_validator = helper.require_data(['ID','nombre','importancia'],recibido);

	if(array_json_validator == false){
		res.status(401).json('Faltan datos obligatorios');
		return;
	}

	// creamos una array vacia para insertar datos de la API y poder actualizarlos todos a la vez.
	const toUpdate = {};
	
	if(recibido.hasOwnProperty('ID')){toUpdate.ID = recibido.ID;}
	if(recibido.hasOwnProperty('nombre')){toUpdate.nombre = recibido.nombre;}
	if(recibido.hasOwnProperty('importancia')){toUpdate.importancia = recibido.importancia;}
	
	const consult = await db('usuarios_mazo')
	.update(toUpdate)
	.where("ID",recibido.ID)
	.where("ID_usuarios",req.ID_usuario);

	res.json({status: true, data: consult});
})


// DELETE

mazosUsuario.post('/delete' , authtoken, async(req, res) => {
	const recibido = req.body;

	// validamos que existen los datos necesarios en la API
	const array_json_validator = helper.require_data(['ID'],recibido);

	if(array_json_validator == false){
		res.status(401).json('Faltan datos obligatorios');
		return;
	}

	const result = await db('usuarios_mazo')
	.where ("ID" ,recibido.ID)
	.where ("ID_usuarios", req.ID_usuario)
	.delete();

	res.json({status: true});
});


module.exports = mazosUsuario;