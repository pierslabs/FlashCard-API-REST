const db = require('../config/db');

const log = async (req, res, next)=>{
// validamos que lleguen bien los campos mail y pass
	const formMail = req.body.hasOwnProperty('email')?req.body.email:false;
	const formPass = req.body.hasOwnProperty('pass')?req.body.pass:false;

	
// verificamos que existe el mail y el pass introducido
	const result = await db.select('*').from('usuarios').where('email',formMail).where('pass',formPass);
	// console.log(result);


//  verificamos que el formMail y el formPass coinciden con un usuario y recogemos los datos del usuario
//   sino devuelve un error de autentificación
	if(result.length > 0){
		 req.user = result;
				 next();
	}else{
		return res.status(401).json({status: false, data:'El email o el pass es incorrecto'});
	}

};

module.exports= log;