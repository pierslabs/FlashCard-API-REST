const { where } = require('../config/db');
const db = require('../config/db');
const helper = require('../helper/helpers');


exports.insertTarjeta = async(req, res) => {
	const recibido = req.body;
	
	// validamos que todos los campos que recibe la API  sean los correctos
	const array_json_validator = helper.require_data(
    [
      'ID_categorias',
			'ID_mazos_predefinidos',
			'pregunta',
			'respuesta'
    ],recibido );

	if(array_json_validator === false){
		res.status(401).json({status:false, data:'Falatan datos obligatorios'});
		return;
	}
	 
	// comprobamos que solo el admin puede crear una tarjeta
	if(reqUser.rol != 'admin'){
		res.status(401).json({status: false, data: 'No eres admin'});
	}

	// realizamos la Query
	const result =  await db('mazos_predefinidos_tarjeta').insert(
    {
			ID_categorias: recibido.ID_categorias, 
			ID_mazos_predefinidos: recibido.ID_mazos_predefinidos, 
			pregunta: recibido.pregunta, 
			respuesta: recibido.respuesta
		}
  );	

	res.json({status: true, data: result});	
	
}

exports.getTarjeta = async(req, res)=> {
  const recibido = req.body;
  const array_json_validator = helper.require_data(['ID'], recibido);

  if(array_json_validator === false){
    res.json({status:false, data:" datos obligatorios"});
  }
  
  if(reqUser.rol !==  "admin"){
    res.json({status:false, data:"no eres admin"});
  }

  
  const result = await db
		.select('*')
		.from('mazos_predefinidos_tarjeta')
		.where('ID', recibido);

	res.json({status:true, data:result})
}

exports.getListTarjetas =async(req, res)=> {
  const recibido = req.body;
  const array_json_validator = helper.require_data(['ID'], recibido);

  if(array_json_validator === false){
    res.json({status:false, data:" datos obligatorios"});
  }
  
  if(reqUser.rol !==  "admin"){
    res.json({status:false, data:"no eres admin"});
  }
  
  const result = await db
		.select('*')
		.from('mazos_predefinidos_tarjeta')
		
	res.json({status:true, data:result})
} 

exports.updateTarjeta =  async(req,res) => {
	const recibido = req.body;

	// validamos que todos los campos que recibe la API  sean los correctos
	const array_json_validator = helper.require_data(['pregunta','respuesta','ID'], recibido);
	
	if(array_json_validator == false){
	res.status(401).json({status:false, data:'Falatan datos obligatorios'});
	return;
	}

	// comprobamos que solo el admin puede actulizar los datos de la carta
	if(reqUser.rol != 'admin'){
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
}

exports.deleteTarjeta =  async(req,res) => {
	const recibido = req.body;

	// validamos que todos los campos que recibe la API  sean los correctos
	const array_json_validator = helper.require_data(['ID'], recibido);

	if(array_json_validator == false){
	res.status(401).json({status:false, data:'Falatan datos obligatorios'});
	return;
	}

	// comprobamos que unicamente el admin puede borrar una carta
	if(reqUser.rol != 'admin'){
		res.status(401).json({status: false, data:'No eres admin' });
		return;
	}

	// realizamos la consulta
	const result = await db('mazos_predefinidos_tarjeta')
		.where('ID',recibido.ID)
		.delete();

	res.json({staus:true, data: result});
}



