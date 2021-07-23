	CREATE TABLE usuarios(
		ID			INT		(10)	NOT NULL PRIMARY KEY AUTO_INCREMENT,
		nombre		VARCHAR	(100)	NOT NULL,
		pass		CHAR 	(40), -- SHA1
		email 		VARCHAR	(100)	NOT NULL,
		token		CHAR 	(40), -- SHA1
		rol			ENUM	('admin' ,'user'),
	 	creado		TIMESTAMP
	);


	CREATE TABLE usuarios_carpetas(
		ID					INT		(10)			NOT NULL PRIMARY KEY AUTO_INCREMENT,
		ID_usuarios 		INT		(10)			NOT NULL,
		nombre				VARCHAR	(100),
		CONSTRAINT FOREIGN KEY (ID_usuarios) 	REFERENCES usuarios(ID) ON DELETE CASCADE  ON UPDATE CASCADE
	);


	CREATE TABLE categorias(
		ID					INT			(10) 	NOT NULL PRIMARY KEY AUTO_INCREMENT,
		nombre				VARCHAR		(100)	NOT NULL,
		DDC					INT			(3)	
	);


	CREATE TABLE mazos_predefinidos(
		ID 					INT			(10)	NOT NULL PRIMARY KEY AUTO_INCREMENT,
		ID_categorias		INT			(10)	NOT NULL,
		nombre				VARCHAR		(100)	NOT NULL,	
		CONSTRAINT FOREIGN KEY 	(ID_categorias) 	REFERENCES categorias(ID)
	 );


	CREATE TABLE mazos_predefinidos_tarjeta(
		ID						INT			(10)	NOT NULL PRIMARY KEY AUTO_INCREMENT,
		ID_categorias 			INT			(10)	NOT NULL,
		ID_mazos_predefinidos	INT			(10)	NOT NULL,
		pregunta				VARCHAR		(100)	NOT NULL,
		respuesta				VARCHAR		(100)	NOT NULL,
		veces_mostrado			INT			(5),
		veces_acertado			INT			(5),
		ultima_vez_mostrado		INT			(5),
		ultima_vez_acertado		INT			(5),
		puntos					INT			(100),
		CONSTRAINT FOREIGN KEY (ID_categorias) 			REFERENCES categorias(ID) 		ON DELETE CASCADE ON UPDATE CASCADE,
		CONSTRAINT FOREIGN KEY (ID_mazos_predefinidos) 	REFERENCES mazos_predefinidos(ID) ON DELETE CASCADE ON UPDATE CASCADE
	);	 


	CREATE TABLE usuarios_mazo (
		ID 						INT			(10)	NOT NULL PRIMARY KEY AUTO_INCREMENT,
		ID_usuarios 			INT			(10)	NOT NULL,
		ID_usuarios_carpetas	INT			(10)	NOT NULL,
		ID_categorias			INT			(10)	NOT NULL,
		nombre					VARCHAR		(100)	NOT NULL,
		importancia				INT			(2)		NOT NULL, 
		CONSTRAINT FOREIGN KEY 	(ID_usuarios) 			REFERENCES usuarios(ID) 			ON DELETE CASCADE ON UPDATE CASCADE,
		CONSTRAINT FOREIGN KEY 	(ID_usuarios_carpetas) 	REFERENCES usuarios_carpetas(ID) 	ON DELETE CASCADE ON UPDATE CASCADE,
		CONSTRAINT FOREIGN KEY 	(ID_categorias) 		REFERENCES categorias(ID) 			ON DELETE CASCADE ON UPDATE CASCADE

	);


	CREATE TABLE usuarios_mazo_tarjetas(
		ID						INT			(10)	NOT NULL PRIMARY KEY AUTO_INCREMENT,
		ID_usuarios 			INT			(10)	NOT NULL,
		ID_usuarios_mazo		INT			(10)	NOT NULL,
		pregunta				VARCHAR	    (100)	NOT NULL,
		respuesta				VARCHAR	    (100)	NOT NULL,
		veces_mostrado			INT			(5),
		veces_acertado			INT			(5),
		ultima_vez_mostrado		INT			(5),
		ultima_vez_acertado		INT			(5),
		puntos					INT			(100),
		CONSTRAINT FOREIGN KEY (ID_usuarios) 		REFERENCES usuarios(ID) ON DELETE CASCADE ON UPDATE CASCADE,
		CONSTRAINT FOREIGN KEY (ID_usuarios_mazo) 	REFERENCES usuarios_mazo(ID) 	ON DELETE CASCADE ON UPDATE CASCADE

	);




