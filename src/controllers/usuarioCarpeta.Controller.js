const db = require('../config/db');
const helper = require('../helper/helpers');


exports.insertCarpetaUsuario = async(req, res) => {
	const recibido = req.body;
	
	// validamos que existen los datos necesarios en la API
	const array_json_validator = helper.require_data(['nombre'],recibido);

	if(array_json_validator === false){
		res.status(401).json('Faltan datos obligatorios');
		return;
	}
	
	// realizamos la Query
	const result = await db('usuarios_carpetas')
	.insert({
		nombre: recibido.nombre,
		ID_usuarios: reqUser.ID
	})

	res.json({status:true, data: result});
};

exports.getCarpetaUsuario = async(req, res) => {
	const recibido = req.query;  // for js get -> jsPure only send data in get method in headers "no body"/ for curl etc... req.body / 
	
	// validamos que existen los datos necesarios en la API
	const array_json_validator = helper.require_data(['ID'],recibido);

	if(array_json_validator === false){
		res.status(401).json('Faltan datos obligatorios');
		return;
	}

	// realizamos Query
	const result = await db
	.select('*')
	.from('usuarios_carpetas')
	.where("ID", recibido.ID)
	

	res.json({status:true, data:result})
	
};

exports.getListCarpetaUsuario = async(req, res) => {

	const result = await db
	.select('*')
	.from('usuarios_carpetas')
	.where('ID_usuarios', reqUser.ID)

	res.json({status:true, data: result});
};
exports.updateCarpetaUsuario =  async(req, res) => {
	const recibido = req.body;

	// validamos que existen los datos necesarios en la API
	const array_json_validator = helper.require_data(['nombre', 'ID'],recibido);
	if(array_json_validator === false){
		res.status(401).json('Faltan datos obligatorios');
		return;
	}

	// realizamos Query
	const result = await db('usuarios_carpetas')
						.update('nombre',recibido.nombre)
						.where ('ID',recibido.ID)
						.where('ID_usuarios', reqUser.ID);

	res.json({status:true, data:result});
};

exports.deleteCarpetaUsuario = async(req, res) => {
	const recibido = req.body;

	// validamos que existen los datos necesarios en la API
	const array_json_validator = helper.require_data(['ID'],recibido);
	if(array_json_validator === false){
		res.status(401).json('Faltan datos obligatorios');
		return;
	}

	// realizamos Query
	const result = await db('usuarios_carpetas')
						.where('ID', recibido.ID)
						.where('ID_usuarios', reqUser.ID)
						.delete();

	res.json({status: true});
};

