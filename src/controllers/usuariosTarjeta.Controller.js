const helper = require('../helper/helpers');
const db = require('../config/db');


exports.insertTarjetaUsuario =  async(req, res) => {
	const recibido = req.body;
	
	// validamos que existen los datos necesarios en la API
	const array_json_validator = helper.require_data(['ID_usuarios_mazo', 'pregunta','respuesta'],recibido);
	
	if(array_json_validator === false){
		res.status(401).json('Faltan datos obligatorios');
		return;
	}
  
	// Realizamos Query
	const consult =  await db('usuarios_mazo_tarjetas')
	.insert({
		ID_usuarios: reqUser.ID, 
		ID_usuarios_mazo: recibido.ID_usuarios_mazo, 
		pregunta: recibido.pregunta, 
		respuesta: recibido.respuesta, 
	});
	
	res.json({status: true, data:consult});
}

exports.getTarjetaUsuario = async(req, res) => {
	const recibido = req.body;
	
	// validamos que existen los datos necesarios en la API
	const array_json_validator = helper.require_data(['ID'],recibido);
	
	if(array_json_validator === false){
		res.status(401).json('Faltan datos obligatorios');
		return;
	}

	// Realizamos la Query
	const result = await db
		.select('*')
		.from('usuarios_mazo_tarjetas')
		.where('ID', recibido.ID)
		.where('ID_usuarios', reqUser.ID);

	res.json({ status: true, data: result});
}

exports.getAllCardsUsuario = async(req, res) => {
	const recibido = req.query; // for js get -> jsPure only send data in get method in headers "no body"/ for curl etc... req.body / 

	// validamos que existen los datos necesarios en la API
	const array_json_validator = helper.require_data(['ID_usuarios_mazo'],recibido);

	if(array_json_validator === false){
		res.status(401).json('Faltan datos obligatorios');
		return;
	}

	//Realizamos Query 
	const result = await db
		.select('*')
		.from('usuarios_mazo_tarjetas')
		.where('ID_usuarios_mazo', recibido.ID_usuarios_mazo)
		.where('ID_usuarios', reqUser.ID);
	
	res.json({ status: true, data: result});
}

exports.updateTarjetaUsuario = async(req, res) => {
	const recibido = req.body;

	// validamos que existen los datos necesarios en la API
	const array_json_validator = helper.require_data(['pregunta','respuesta','ID'],recibido);

	if(array_json_validator === false){
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
	.where('ID_usuarios', reqUser.ID);

	res.json({staus: true, data: consult});
}

exports.deleteTarjetaUsuario = async(req,res) => {
	const recibido = req.body;

	// validamos que existen los datos necesarios en la API
	const array_json_validator = helper.require_data(['ID'],recibido);

	if(array_json_validator === false){
		res.status(401).json('Faltan datos obligatorios');
		return;
	}	

	// realizamos consulta
	const consult = await db('usuarios_mazo_tarjetas')
		.where("ID",recibido.ID)
		.where("ID_usuarios", reqUser.ID)
		.delete();
	
	res.json({staus:true , data: consult});
}

exports.puntuaCarta = async(req,res) => {
	const recibido = req.body;

	// validamos campos obligatorios
	const array_json_validator = helper.require_data(['ID'], recibido);
	if(array_json_validator === false){
		res.status(401).json({staus:false, data:'Falta algun dato obligatorio'});
	}

	// realizamos la query
	const result = await db.select('puntos')
							.from('usuarios_mazo_tarjetas')
							.where('ID',recibido.ID)
							.where('ID_usuarios', reqUser.ID);

     res.json({status: true, data: result});
}