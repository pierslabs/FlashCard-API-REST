const db = require('../config/db');
const sha1 = require('js-sha1');
const helper = require('../helper/helpers');


// Insert
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

// Get user for ID
exports.getUsusario = async(req, res) => {

	const result = await db
		.select('*')
		.from('usuarios')
		.where('ID', reqUser.ID);

	res.json({status:true, data:result})
}

// Update Users
exports.updateUser = async(req, res) => {
	const recibido = req.body;

	// validacion campos obligatorios API con helper
	const array_json_validator = helper.require_data(['nombre', 'pass', 'email', 'token'],recibido);
	if(array_json_validator == false){
		res.status(401).json({status: false, data:'Faltan datos obligatorios'});
		return;
	}

	const toUpdate = [];
	/* creamos array vacia donde insertaremos los datos que recibe la API para poder actualizarlos 
	 todos de una vez en la query, para una mayor optimización y comodidad.
	const toUpdate={};*/
	
	if(recibido.hasOwnProperty('nombre')){toUpdate.nombre = recibido.nombre;}
	if(recibido.hasOwnProperty('pass')){toUpdate.pass = recibido.pass}
	if(recibido.hasOwnProperty('email')){toUpdate.email = recibido.email}
	
	// realizamos Query
	const result = await db('usuarios')
	.update(toUpdate)
	.where('ID',reqUser.ID)

	res.json({status:true, data:`el usuario ${reqUser.nombre} ha sido actualizado`})
 }

// Login
exports.loginUser = async(req,res)=>{
	const recibido = req.body;

	// validamos campos obligatorios en la API
	const array_json_validator = helper.require_data(['email', 'pass'],recibido);
	if(array_json_validator == false){
		res.status(401).json({status: false, data:'Faltan datos obligatorios'});
		return;
	}

	/*authlogin
	 1-Recibimos el email y la contraseña 
	 2-Comprobamos que sea correcto, sino devuelve un error de autentificación 
	*/
		
			// 1º Generamos un sha1 aleatorio
	 			const token = sha1('flash'+ Math.round(Math.random()*(99999999 - 1)+1));
				
			// 2º Lo guardamos en la base de datos, modificando el anterior
	 						 		
				const result = await db('usuarios').update('token',token).where('ID', req.user[0].ID);

			// 3º Lo devolvemos al navegador
	 			res.json({status:true, data:token});
}

// Delete
exports.deleteUser =  async(req, res) => {
	const recibido = req.body;

	// validacion campos obligatorios API con helper
	const array_json_validator = helper.require_data(['token'],recibido);
	if(array_json_validator == false){
		res.status(401).json({status: false, data:'Faltan datos obligatorios'});
		return;
	}

	// realizamos la Query
	const result = await db('usuarios')
	.where('ID', reqUser.ID)
	.delete();
	
	res.json({status:true, data:`el usuario ${reqUser.nombre}, con email ${reqUser.email} a sido eliminado`});
}

// Recovery password
exports.recoveryPassword = async(req, res) => {
	const email = req.body.email;

	// validamos dayos obligatorios API
	const array_json_validator = helper.require_data(['email'], req.body);
	if(array_json_validator == false){
		res.status(401).json({status: false, data:'Faltan datos obligatorios'});
		return;
	}

	// consulta  que exista el mail introducido en la bbdd
	const result = await db
	.select('email')
	.from("usuarios")
	.where('email',email);
	
	// si existe mail a la base de datos, mandaremos  redireccion para cambiar el pass  al email confirmado 
	if(result.length > 0){
		res.json({status: true, message:'Mandamos mail a la dirección de correo', data: result});
		
	}else{
		res.json({status:false, data:'No existe este Email en la base de datos' });
		return;
	}
}

// Recovery password step2"

exports.recoveryPasswordStep2 = async(req, res) => {
	const recibido = req.body; 
	
	/* introducimos el nuevo pass 2 veces para compararlos, comparamos los 2 pass*/
	if(recibido.pass1 === recibido.pass2){
		const result = await db('usuarios')
		 					.update('pass',recibido.pass1)
							.where('email',req.email);//req.email viene de authrecoveryPass2
							
		 		return res.json({status:true, data: result, message: 'El password se ha actualizado'});		
		}else{
			return res.json({stauts: false, data:'Los password no coinciden'});
		}
}

// UserMe
exports.userMe =  async(req, res) => {

	const result = await db
		.select('*')
		.from('usuarios')
		.where('token', reqUser.token);
	    
	res.json({status:true, data:result})
}