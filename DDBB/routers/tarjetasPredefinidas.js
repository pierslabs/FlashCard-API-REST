const express = require('express');
const db = require('../config/db');
const authToken = require('../auth/authtoken');
const helper = require('../helper/helpers');
const tarjetasPredefinidas = express.Router();


// INSERT
tarjetasPredefinidas.post('/insert', authToken, async(req, res) => {
	const recibido = req.body;
	
	// validamos que todos los campos que recibe la API  sean los correctos
	const array_json_validator = helper.require_data(['ID_categorias',
													  'ID_mazos_predefinidos',
													  'pregunta',
													  'respuesta'],recibido );

	if(array_json_validator == false){
		res.status(401).json({status:false, data:'Falatan datos obligatorios'});
		return;
	}
	 
	// comprobamos que solo el admin puede crear una tarjeta
	if(req.rol != 'admin'){
		res.status(401).json({status: false, data: 'No eres admin'});
	}

	// realizamos la Query
	const result =  await db('mazos_predefinidos_tarjeta')
							.insert({
								ID_categorias: recibido.ID_categorias, 
								ID_mazos_predefinidos: recibido.ID_mazos_predefinidos, 
								pregunta: recibido.pregunta, 
								respuesta: recibido.respuesta
								});	

	res.json({status: true, data: result});	
	
});



// UPDATE
tarjetasPredefinidas.post('/update', authToken, async(req,res) => {
	const recibido = req.body;

	// validamos que todos los campos que recibe la API  sean los correctos
	const array_json_validator = helper.require_data(['pregunta','respuesta','ID'], recibido);
	
	if(array_json_validator == false){
	res.status(401).json({status:false, data:'Falatan datos obligatorios'});
	return;
	}

	// comprobamos que solo el admin puede actulizar los datos de la carta
	if(req.rol != 'admin'){
		res.status(401).json('No eres admin');
		return;
	}
	
	// creamos un array para introducir los datos recibidos por la API y poder actualizar todos a la vez 
	const toUpdate = {};
	if(recibido.hasOwnProperty('pregunta')){toUpdate.pregunta = recibido.pregunta};
	if(recibido.hasOwnProperty('respuesta')){toUpdate.respuesta = recibido.respuesta};

	// realizamos la consulta
	const consult = await db('mazos_predefinidos_tarjeta')
							.update(toUpdate)
							.where("ID",recibido.ID);

	res.json({staus: true, data: consult});
})


// DELETE
tarjetasPredefinidas.post('/delete',authToken, async(req,res) => {
	const recibido = req.body;

	// validamos que todos los campos que recibe la API  sean los correctos
	const array_json_validator = helper.require_data(['ID'], recibido);

	if(array_json_validator == false){
	res.status(401).json({status:false, data:'Falatan datos obligatorios'});
	return;
	}

	// comprobamos que unicamente el admin puede borrar una carta
	if(req.rol != 'admin'){
		res.status(401).json({status: false, data:'No eres admin' });
		return;
	}

	// realizamos la consulta
	const result = await db('mazos_predefinidos_tarjeta')
						.where('ID',recibido.ID)
						.delete();

	res.json({staus:true, data: result});
});


module.exports = tarjetasPredefinidas;