const express = require ('express');
const userCarpeta = express.Router();
const db = require('../config/db');
const authToken = require('../auth/authtoken');
const helper = require('../helper/helpers');

//insert
userCarpeta.post('/insert',authToken, async(req, res) => {
	const recibido = req.body;
	
	// validamos que existen los datos necesarios en la API
	const array_json_validator = helper.require_data(['nombre'],recibido);

	if(array_json_validator == false){
		res.status(401).json('Faltan datos obligatorios');
		return;
	}
	
	// realizamos la Query
	const result = await db('usuarios_carpetas')
	.insert({
		nombre: recibido.nombre,
		ID_usuarios: req.ID_usuario
	})
	
	res.json({status:true, data: result});
})


//get
userCarpeta.get('/get', authToken, async(req, res) => {
	const recibido = req.body;
	
	// validamos que existen los datos necesarios en la API
	const array_json_validator = helper.require_data(['ID'],recibido);

	if(array_json_validator == false){
		res.status(401).json('Faltan datos obligatorios');
		return;
	}

	// realizamos Query
	const result = await db
	.select('*')
	.from('usuarios_carpetas')
	.where("ID", recibido.ID)
	.where('ID_usuarios', req.ID_usuario);

	res.json({status:true, data:result})
	
});


// get_list          
userCarpeta.get('/get_list',authToken, async(req, res) => {

	const result = await db
	.select('*')
	.from('usuarios_carpetas')
	.where('ID_usuarios', req.ID_usuario)

	res.json({status:true, data: result});
})



//update
userCarpeta.post('/update', authToken, async(req, res) => {
	const recibido = req.body;

	// validamos que existen los datos necesarios en la API
	const array_json_validator = helper.require_data(['nombre', 'ID'],recibido);
	if(array_json_validator == false){
		res.status(401).json('Faltan datos obligatorios');
		return;
	}

	// realizamos Query
	const result = await db('usuarios_carpetas')
						.update('nombre',recibido.nombre)
						.where ('ID',recibido.ID)
						.where('ID_usuarios', req.ID_usuario)

	res.json({status:true});
});



//delete
userCarpeta.post('/delete',authToken, async(req, res) => {
	const recibido = req.body;

	// validamos que existen los datos necesarios en la API
	const array_json_validator = helper.require_data(['ID'],recibido);
	if(array_json_validator == false){
		res.status(401).json('Faltan datos obligatorios');
		return;
	}

	// realizamos Query
	const result = await db('usuarios_carpetas')
						.where('ID', recibido.ID)
						.where('ID_usuarios', req.ID_usuario)
						.delete();

	res.json({status: true});
})

module.exports = userCarpeta;