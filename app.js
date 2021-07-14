const express = 				require('express');
const users = 					require('./routers/usuarioRoutes');
const userCarpeta = 			require('./routers/usuarioCarpetaRoutes');
const userMazos =				require('./routers/usuariosMazosRoutes');
const userTarjetas =  			require('./routers/usuariosTarjetaRoutes');
const categorias =				require('./routers/categoriasRoutes');
const mazosPredefinidos = 		require('./routers/mazosPredefinidosRoutes');
const tarjetasPredefinidas =	require('./routers/tarjetasPredefinidasRoutes');
const db = 						require('./config/db');
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



