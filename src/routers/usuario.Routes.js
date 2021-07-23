
const express = require('express');
const user = express.Router();
const authtoken = require('../auth/authtoken');
const authlogin = require('../auth/authlogin');
const authRecoveryPassStep2 = require('../auth/authRecoveryPassStep2'); 
const UserController = require('../controllers/usuario.Controller')





// insert------------------------------------------------------
user.post('/insert', UserController.insert);


// GET-----------------------------------------------------------
user.get('/get', authtoken, async(req, res) => {

	const result = await db
	.select('*')
	.from('usuarios')
	.where('ID', req.ID_usuario);

	res.json({status:true, data:result})
});


// UPDATE-------------------------------------------------------------------------------------------
 user.post('/update',authtoken, async(req, res) => {
	const recibido = req.body;

	// validacion campos obligatorios API con helper
	const array_json_validator = helper.require_data(['nombre', 'pass', 'email', 'token'],recibido);
	if(array_json_validator == false){
		res.status(401).json({status: false, data:'Faltan datos obligatorios'});
		return;
	}

	// creamos array vacia donde insertaremos los datos que recibe la API para poder actualizarlos 
	// todos de una vez en la query, para una mayor optimización y comodidad.
	const toUpdate={};

	if(recibido.hasOwnProperty('nombre')){toUpdate.nombre = recibido.nombre;}
	if(recibido.hasOwnProperty('pass')){toUpdate.pass = recibido.pass}
	if(recibido.hasOwnProperty('email')){toUpdate.email = recibido.email}
	
	// realizamos Query
	const result = await db('usuarios')
	.update(toUpdate)
	.where('ID',req.ID_usuario)

	res.json({status:true})
 })


// DELETE-----------------------------------------------------------------------------------------
user.post('/delete',authtoken, async(req, res) => {
	const recibido = req.body;

	// validacion campos obligatorios API con helper
	const array_json_validator = helper.require_data(['token'],recibido);
	if(array_json_validator == false){
		res.status(401).json({status: false, data:'Faltan datos obligatorios'});
		return;
	}

	// realizamos la Query
	const result = await db('usuarios')
	.where('ID', req.ID_usuario)
	.delete();

	res.json({status:true, data:'el usuario ha sido eliminado correctamente'});
});


// LOGIN--------------------------------------------------------------------
user.post('/login',authlogin, async(req,res)=>{
	const recibido = req.body;

	// validamos campos obligatorios en la API
	const array_json_validator = helper.require_data(['mail', 'pass'],recibido);
	if(array_json_validator == false){
		res.status(401).json({status: false, data:'Faltan datos obligatorios'});
		return;
	}

	// Recibimos el email y la contraseña Se encarga authlogin

	// Comprobamos que sea correcto, sino devuelve un error de autentificación  "comprueba en authlogin"

		// OPCIONAL
			// 1º Generamos un sha1 aleatorio
	 			const token = sha1('flash'+ Math.round(Math.random()*(99999999 - 1)+1));
				
			// 2º Lo guardamos en la base de datos, modificando el anterior
	 						 		
				const result = await db('usuarios').update('token',token).where('ID', req.user[0].ID);

			// 3º Lo devolvemos al navegador
	 			res.json({status:true, data:token});

	// SI NO ES CORRECTO: return res.status(401).json("Error en auth"); 'responde en authtoken'
	 		
	// SI ES CORRECTO res.json({status:true, data:result})'responde en authtoken'

});


// Recovery password
user.post('/recoveryPassword', async(req, res) => {
	const email = req.body.email;

	// validamos dayos obligatorios API
	const array_json_validator = helper.require_data(['email'],req.body);
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
});


// Recovery password Step 2
user.post('/recoveryPasswordStep2',authRecoveryPassStep2, async(req, res) => {
	const recibido = req.body; 
	// introducimos el nuevo pass 2 veces para compararlos
	
	// comparamos los 2 pass
	if(recibido.pass1 == recibido.pass2){
		const result = await db('usuarios')
		 					.update('pass',recibido.pass1)
							.where('email',req.email);//req.email viene de authrecoveryPass2
							
		 		return res.json({status:true, data: result, message: 'El password se ha actualizado'});		
		}else{
			return res.json({stauts: false, data:'Los password no coinciden'});
		}
});

// Comprobar que tiene token, y no esta caducado, por ejemplo en la presentación de la página  ------------
user.get('/me', authtoken, async(req, res) => {
	//req.query   
	const result = await db
	.select('*')
	.from('usuarios')
	.where('token', req.token);
	
    
	res.json({status:true, data:result})
}); 




 module.exports = user;
 