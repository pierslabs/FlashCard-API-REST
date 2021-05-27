-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 27-05-2021 a las 11:20:37
-- Versión del servidor: 8.0.25-0ubuntu0.20.04.1
-- Versión de PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `flashcards`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `ID` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `DDC` int DEFAULT NULL,
  `token_admin` char(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`ID`, `nombre`, `DDC`, `token_admin`) VALUES
(1, 'Ciencias de la computación', 0, '1'),
(2, 'Filosofía y Psicología', 100, '1'),
(3, 'Teología y religión', 200, '1'),
(4, 'Ciencias Sociales', 300, '1'),
(5, 'Lenguas', 400, '1'),
(6, 'Ciencias Básicas', 500, '1'),
(7, 'Tecnologia y Ciencias Aplicadas', 600, '1'),
(8, 'Artes', 700, '1'),
(9, 'Literatura', 800, '1'),
(10, 'Historia y Geografía', 900, '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mazos_predefinidos`
--

CREATE TABLE `mazos_predefinidos` (
  `ID` int NOT NULL,
  `ID_categorias` int NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `mazos_predefinidos`
--

INSERT INTO `mazos_predefinidos` (`ID`, `ID_categorias`, `nombre`) VALUES
(1, 1, 'Naturales'),
(2, 1, 'Sociales'),
(4, 1, 'lenguas'),
(5, 1, 'Quimica'),
(8, 1, 'lenguaje');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mazos_predefinidos_tarjeta`
--

CREATE TABLE `mazos_predefinidos_tarjeta` (
  `ID` int NOT NULL,
  `ID_categorias` int NOT NULL,
  `ID_mazos_predefinidos` int NOT NULL,
  `pregunta` varchar(100) NOT NULL,
  `respuesta` varchar(100) NOT NULL,
  `veces_mostrado` int DEFAULT NULL,
  `veces_acertado` int DEFAULT NULL,
  `ultima_vez_mostrado` int DEFAULT NULL,
  `ultima_vez_acertado` int DEFAULT NULL,
  `puntos` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `mazos_predefinidos_tarjeta`
--

INSERT INTO `mazos_predefinidos_tarjeta` (`ID`, `ID_categorias`, `ID_mazos_predefinidos`, `pregunta`, `respuesta`, `veces_mostrado`, `veces_acertado`, `ultima_vez_mostrado`, `ultima_vez_acertado`, `puntos`) VALUES
(2, 1, 1, '¿Que es la ley de gravitación universal?', 'Es una ley física  que describe la interacción gravitatoria entre distintos cuerpos con masa', NULL, NULL, NULL, NULL, NULL),
(3, 1, 2, '¿que fué la guerra de la independencia?', 'fué una guerra estadounidense bla bla bla n¡bala', NULL, NULL, NULL, NULL, NULL),
(4, 1, 5, '¿ Cual es la composición del agua?', 'H2O', NULL, NULL, NULL, NULL, NULL),
(5, 1, 1, '¿a que distacia está la tierra de la luna?', '384.000 Km', NULL, NULL, NULL, NULL, NULL),
(6, 1, 1, '¿ Cual es la formula de la ley gravitacion universal ?', 'F=(G*m1*m2)/d^2', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `ID` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `pass` varchar(40) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `token` varchar(100) DEFAULT NULL,
  `rol` enum('user','admin') NOT NULL,
  `creado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`ID`, `nombre`, `pass`, `email`, `token`, `rol`) VALUES
(5, 'pedro', '123456', 'pedro@yes.com', '006686f9099f4d6a9aa9128ba98c2e46b5b3a1c2', 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_carpetas`
--

CREATE TABLE `usuarios_carpetas` (
  `ID` int NOT NULL,
  `ID_usuarios` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios_carpetas`
--

INSERT INTO `usuarios_carpetas` (`ID`, `ID_usuarios`, `nombre`) VALUES
(2672, 5, 'mates'),
(2673, 5, 'Naturales'),
(2674, 5, 'historia'),
(2675, 5, 'fbdbdffd'),
(2676, 5, 'dfbbdf'),
(2677, 5, 'bffbdd'),
(2678, 5, 'ghfhgffgh'),
(2679, 5, 'gghfg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_mazo`
--

CREATE TABLE `usuarios_mazo` (
  `ID` int NOT NULL,
  `ID_usuarios` int NOT NULL,
  `ID_usuarios_carpetas` int NOT NULL,
  `ID_categorias` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `importancia` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios_mazo`
--

INSERT INTO `usuarios_mazo` (`ID`, `ID_usuarios`, `ID_usuarios_carpetas`, `ID_categorias`, `nombre`, `importancia`) VALUES
(832, 5, 2672, 3, 'ley garvitacion', 5),
(833, 5, 2673, 3, 'Los ecosistemas', 5),
(834, 5, 2674, 3, 'el antiguo egipto', 5),
(835, 5, 2673, 3, 'hgghff', 5),
(836, 5, 2676, 3, 'gfhhfghgf', 5),
(837, 5, 2675, 3, 'bvcbvcvb', 5),
(838, 5, 2675, 3, 'bvcbvcvb', 5),
(839, 5, 2675, 3, 'bvcbvcvb', 5),
(840, 5, 2675, 3, 'bvcbvcvb', 5),
(841, 5, 2675, 3, 'bvcbvcvb', 5),
(842, 5, 2675, 3, 'bvcbvcvb', 5),
(843, 5, 2675, 3, 'bvcbvcvb', 5),
(844, 5, 2675, 3, 'bvcbvcvb', 5),
(845, 5, 2675, 3, 'bvcbvcvb', 5),
(847, 5, 2672, 3, 'retetr', 5),
(848, 5, 2672, 3, 'retetr', 5),
(849, 5, 2672, 3, 'retetr', 5),
(850, 5, 2672, 3, 'retetr', 5),
(851, 5, 2672, 3, 'retetr', 5),
(852, 5, 2672, 3, 'retetr', 5),
(853, 5, 2672, 3, 'retetr', 5),
(854, 5, 2672, 3, 'retetr', 5),
(855, 5, 2672, 3, 'retetr', 5),
(856, 5, 2672, 3, 'retetr', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_mazo_tarjetas`
--

CREATE TABLE `usuarios_mazo_tarjetas` (
  `ID` int NOT NULL,
  `ID_usuarios` int NOT NULL,
  `ID_usuarios_mazo` int NOT NULL,
  `pregunta` varchar(100) NOT NULL,
  `respuesta` varchar(100) NOT NULL,
  `veces_mostrado` int DEFAULT NULL,
  `veces_acertado` int DEFAULT NULL,
  `ultima_vez_mostrado` int DEFAULT NULL,
  `ultima_vez_acertado` int DEFAULT NULL,
  `puntos` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios_mazo_tarjetas`
--

INSERT INTO `usuarios_mazo_tarjetas` (`ID`, `ID_usuarios`, `ID_usuarios_mazo`, `pregunta`, `respuesta`, `veces_mostrado`, `veces_acertado`, `ultima_vez_mostrado`, `ultima_vez_acertado`, `puntos`) VALUES
(485, 5, 832, 'dbfbbdf', 'bdfbdf', NULL, NULL, NULL, NULL, NULL),
(486, 5, 832, 'rteretre', 'tertertr', NULL, NULL, NULL, NULL, NULL),
(490, 5, 838, 'bccbvcbv', 'cbvbcv', NULL, NULL, NULL, NULL, NULL),
(491, 5, 838, 'vbcbcvvbc', 'bvcbvc', NULL, NULL, NULL, NULL, NULL),
(492, 5, 838, 'bcvcvb', 'bvccbvvb', NULL, NULL, NULL, NULL, NULL),
(493, 5, 838, 'vbcbccvb', 'bvccvbbcv', NULL, NULL, NULL, NULL, NULL),
(494, 5, 836, 'ewfewfw', 'feefw', NULL, NULL, NULL, NULL, NULL),
(495, 5, 836, 'effew', 'eefw', NULL, NULL, NULL, NULL, NULL),
(496, 5, 836, 'effewfew', 'fefew', NULL, NULL, NULL, NULL, NULL),
(497, 5, 836, 'efwfewe', 'effew', NULL, NULL, NULL, NULL, NULL),
(498, 5, 836, 'efefwwef', 'effewewf', NULL, NULL, NULL, NULL, NULL),
(499, 5, 836, 'efwewfewf', 'effew', NULL, NULL, NULL, NULL, NULL),
(500, 5, 836, 'effewf', 'wfewfeef', NULL, NULL, NULL, NULL, NULL),
(501, 5, 836, 'wwfewfe', 'ewfefwwef', NULL, NULL, NULL, NULL, NULL),
(502, 5, 836, 'efefwwef', 'fewfew', NULL, NULL, NULL, NULL, NULL),
(503, 5, 832, 'ertetr', 'ertetr', NULL, NULL, NULL, NULL, NULL),
(504, 5, 832, 'rettreter', 'erttreter', NULL, NULL, NULL, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `mazos_predefinidos`
--
ALTER TABLE `mazos_predefinidos`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_categorias` (`ID_categorias`);

--
-- Indices de la tabla `mazos_predefinidos_tarjeta`
--
ALTER TABLE `mazos_predefinidos_tarjeta`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_categorias` (`ID_categorias`),
  ADD KEY `ID_mazos_predefinidos` (`ID_mazos_predefinidos`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `usuarios_carpetas`
--
ALTER TABLE `usuarios_carpetas`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_usuarios` (`ID_usuarios`);

--
-- Indices de la tabla `usuarios_mazo`
--
ALTER TABLE `usuarios_mazo`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_usuarios` (`ID_usuarios`),
  ADD KEY `ID_usuarios_carpetas` (`ID_usuarios_carpetas`),
  ADD KEY `ID_categorias` (`ID_categorias`);

--
-- Indices de la tabla `usuarios_mazo_tarjetas`
--
ALTER TABLE `usuarios_mazo_tarjetas`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_usuarios` (`ID_usuarios`),
  ADD KEY `ID_usuarios_mazo` (`ID_usuarios_mazo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `mazos_predefinidos`
--
ALTER TABLE `mazos_predefinidos`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `mazos_predefinidos_tarjeta`
--
ALTER TABLE `mazos_predefinidos_tarjeta`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=220;

--
-- AUTO_INCREMENT de la tabla `usuarios_carpetas`
--
ALTER TABLE `usuarios_carpetas`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2680;

--
-- AUTO_INCREMENT de la tabla `usuarios_mazo`
--
ALTER TABLE `usuarios_mazo`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=857;

--
-- AUTO_INCREMENT de la tabla `usuarios_mazo_tarjetas`
--
ALTER TABLE `usuarios_mazo_tarjetas`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=505;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mazos_predefinidos`
--
ALTER TABLE `mazos_predefinidos`
  ADD CONSTRAINT `mazos_predefinidos_ibfk_1` FOREIGN KEY (`ID_categorias`) REFERENCES `categorias` (`ID`);

--
-- Filtros para la tabla `mazos_predefinidos_tarjeta`
--
ALTER TABLE `mazos_predefinidos_tarjeta`
  ADD CONSTRAINT `mazos_predefinidos_tarjeta_ibfk_1` FOREIGN KEY (`ID_categorias`) REFERENCES `categorias` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `mazos_predefinidos_tarjeta_ibfk_2` FOREIGN KEY (`ID_mazos_predefinidos`) REFERENCES `mazos_predefinidos` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios_carpetas`
--
ALTER TABLE `usuarios_carpetas`
  ADD CONSTRAINT `usuarios_carpetas_ibfk_1` FOREIGN KEY (`ID_usuarios`) REFERENCES `usuarios` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios_mazo`
--
ALTER TABLE `usuarios_mazo`
  ADD CONSTRAINT `usuarios_mazo_ibfk_1` FOREIGN KEY (`ID_usuarios`) REFERENCES `usuarios` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarios_mazo_ibfk_2` FOREIGN KEY (`ID_usuarios_carpetas`) REFERENCES `usuarios_carpetas` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarios_mazo_ibfk_3` FOREIGN KEY (`ID_categorias`) REFERENCES `categorias` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios_mazo_tarjetas`
--
ALTER TABLE `usuarios_mazo_tarjetas`
  ADD CONSTRAINT `usuarios_mazo_tarjetas_ibfk_1` FOREIGN KEY (`ID_usuarios`) REFERENCES `usuarios` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarios_mazo_tarjetas_ibfk_2` FOREIGN KEY (`ID_usuarios_mazo`) REFERENCES `usuarios_mazo` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
