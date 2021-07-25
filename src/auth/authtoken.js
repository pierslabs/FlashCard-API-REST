const db = require('../config/db');

const authToken = async (req, res, next)=>{
	// comprobamos que existe token con ternario si existe lo muestra si no devuelve false
	const token = req.headers.hasOwnProperty('token')?req.headers.token:false;
	 

	// condicion para que nos muestre un mensaje si el token no existe o es erroneo,
	//   si es erroneo acabara de ejecutarse el authToken con un return,
	// el cual  nos mostrará el error del cliente en status y un mensaje, si el token existe omitira la condición y proseguira

	if(token == false){
		return res.status(401).json({status: false, data:'Falta token '});
	}

	// pasando estos filtros hacemos consulta para recibir los campos del usuario con  el token  recibido

		const result = await db.select('*').from('usuarios').where('token', token);

	//  verificamos que exista un usuario que su token coincida  con el token recibido si e así recogemos los datos
	// que necesitemos en este caso solo recogeremos ID_usuarios que podremos utilizar en otro documento y finalmente la función next() para seguir con el
	// codigo de donde lo llamemos
	
	if(result.length > 0){
		// req.ID_usuario lo podremos llamar en otro documento cuando hagamos otra petición
		reqUser = result[0];
 		
		next();
	}else{
		return res.status(401).json({status:false, data:'Error en el token no hay coincidencias o el token ha caducado'})
	}



};

module.exports = authToken;