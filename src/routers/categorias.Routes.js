const express = require('express');
const authToken = require('../auth/authtoken');
const categorias = express.Router();
const db = require('../config/db');
const helper = require('../helper/helpers');



// GET_list
categorias.get('/get_list',async(req,res) => {
	const recibido = req.body;
	const result = await db
						.select('*')
						.from('categorias')

	res.json({status: true, data: result})
	
});


// GET
categorias.get('/get', async(req,res) => {
	const recibido = req.query;

	// validamos que todos los campos que recibe la API  sean los correctos
	const array_json_validator = helper.require_data(['ID'],recibido );

	if(array_json_validator == false){
		res.status(401).json({status:false, data:'Faltan datos obligatorios'});
		return;
	}

	const result = await db
						.select('*')
						.from('categorias')
						.where("ID" , recibido.ID)

	res.json({status: true, data: result})
	
});

module.exports = categorias;