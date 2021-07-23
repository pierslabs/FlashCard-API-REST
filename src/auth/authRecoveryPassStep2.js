const db = require('../config/db');

const authRecoveryPass = async (req, res, next)=>{

	// validar que los campos pass1 pass2 y mail esten correctamente 
	const pass1 = req.body.hasOwnProperty('pass1')?req.body.pass1:false;
	const pass2 = req.body.hasOwnProperty('pass2')?req.body.pass2:false;
	const email = req.body.hasOwnProperty('email')?req.body.email:false;
	 
	if((pass1 && pass2 && email) == false){
		return res.status(401).json({status: false, data:'las claves  pass1, pass2 o email son incorrectas'})
	}

	// validar que existe un email 
	const result = await db.select('email').from('usuarios').where('email', req.body.email);
	if(result.length > 0){
		  req.email = result[0].email;
		  next();
	}else{
		return res.status(401).json({status:false, data:'Email erroneo'});
	}
	

};


module.exports = authRecoveryPass;