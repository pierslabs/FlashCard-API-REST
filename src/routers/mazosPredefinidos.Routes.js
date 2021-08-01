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
mazosPredefinidos.post('/update', authToken,  );


// DELETE
mazosPredefinidos.post('/delete', authToken, async(req, res) => {
	const recibido = req.body;

	// validamos que todos los campos que recibe la API  sean los correctos
	const array_json_validator = helper.require_data(['ID'],recibido );

	if(array_json_validator == false){
		res.status(401).json({status:false, data:'Falatan datos obligatorios'});
		return;
	}

	// comprobamos que solo el admin puede borrar una carta
	if(req.rol != 'admin'){
		res.status(401).json('No eres admin');
		return;
	}
	
	const result = await db('mazos_predefinidos')
	.where('ID', recibido.ID)
	.delete();
	
	res.json({status: true, data: result});
});

module.exports = mazosPredefinidos;