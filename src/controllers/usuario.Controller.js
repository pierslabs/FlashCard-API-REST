const db = require('../config/db');
const sha1 = require('js-sha1');

const helper = require('../helper/helpers');

exports.insert = async (req, res) => {
    const dataSend = req.body;
	
	// validamos que todos los campos que recibe la API  sean los correctos
	const array_json_validator = helper.require_data(['nombre', 'pass', 'email'],dataSend );

	if(array_json_validator === false){
		res.status(401).json({status:false, data:'Falatan datos obligatorios'});
		return;
	}
    
    // buscamos en la base de datos que no exista un usuario con ese email
    const userCheck = await db.select('*').from('usuarios').where("email", req.body.email);
    if( userCheck.length > 0){
        return res.json({status:false, data:"EL usuario ya existe"});
    }

    //Realizamos la Query <
	const result = await db('usuarios').insert({
		nombre: req.body.nombre,
		pass:	req.body.pass,
		email: 	req.body.email,
	});

	res.send({status:true,data: result[0]});
}