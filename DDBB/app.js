const express = 				require('express');
const users = 					require('./routers/usuarioModel');
const userCarpeta = 			require('./routers/usuario_carpetaModel');
const userMazos =				require('./routers/usuarios_mazosModel');
const userTarjetas =  			require('./routers/usuarios _tarjetasModel');
const categorias =				require('./routers/categoriasModels');
const mazosPredefinidos = 		require('./routers/mazosPredefinidosModel');
const tarjetasPredefinidas =	require('./routers/tarjetasPredefinidas');
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

// creamos servidor
app.listen(3003, ()=>{
	console.log('el servidor esta escuchando flashcard');
})



