const express = 				require('express');
const users = 					require('./src/routers/usuario.Routes');
const userCarpeta = 			require('./src/routers/usuarioCarpeta.Routes');
const userMazos =				require('./src/routers/usuariosMazos.Routes');
const userTarjetas =  			require('./src/routers/usuariosTarjeta.Routes');
const categorias =				require('./src/routers/categorias.Routes');
const mazosPredefinidos = 		require('./src/routers/mazosPredefinidos.Routes');
const tarjetasPredefinidas =	require('./src/routers/tarjetasPredefinidas.Routes');
const db = 						require('./src/config/db');
const cors = 					require('cors');



const app = express();

app.use(cors());

// admite JSON
app.use(express.json());

//   LISTADO DE MODELOS
	app.use('/user',users);
	app.use('/userCarpetas',userCarpeta);	
	app.use('/mazosUsuario', userMazos);
	app.use('/tarjetasUsuario',userTarjetas);
	app.use('/categorias', categorias);
	app.use('/mazosPredefinidos', mazosPredefinidos);
	app.use('/tarjetasPredefinidas', tarjetasPredefinidas);
	app.use('/db', db);


// configuramos servidor
app.set('port', process.env.PORT || 3000);


// creamos servidor
app.listen(app.get('port'), ()=>{
	console.log('el servidor Flashcards esta ecuchando en el puerto:', app.get('port'));
})



