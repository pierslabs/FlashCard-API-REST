-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-08-2021 a las 17:01:44
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
  `ID` int(10) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `DDC` int(3) DEFAULT NULL,
  `token_admin` char(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `ID` int(10) NOT NULL,
  `ID_categorias` int(10) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mazos_predefinidos_tarjeta`
--

CREATE TABLE `mazos_predefinidos_tarjeta` (
  `ID` int(10) NOT NULL,
  `ID_categorias` int(10) NOT NULL,
  `ID_mazos_predefinidos` int(10) NOT NULL,
  `pregunta` varchar(100) NOT NULL,
  `respuesta` varchar(100) NOT NULL,
  `veces_mostrado` int(5) DEFAULT NULL,
  `veces_acertado` int(5) DEFAULT NULL,
  `ultima_vez_mostrado` int(5) DEFAULT NULL,
  `ultima_vez_acertado` int(5) DEFAULT NULL,
  `puntos` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `ID` int(10) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `pass` varchar(40) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `token` varchar(100) DEFAULT NULL,
  `rol` enum('user','admin') NOT NULL,
  `creado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_carpetas`
--

CREATE TABLE `usuarios_carpetas` (
  `ID` int(10) NOT NULL,
  `ID_usuarios` int(10) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_mazo`
--

CREATE TABLE `usuarios_mazo` (
  `ID` int(10) NOT NULL,
  `ID_usuarios` int(10) NOT NULL,
  `ID_usuarios_carpetas` int(10) NOT NULL,
  `ID_categorias` int(10) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `importancia` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_mazo_tarjetas`
--

CREATE TABLE `usuarios_mazo_tarjetas` (
  `ID` int(10) NOT NULL,
  `ID_usuarios` int(10) NOT NULL,
  `ID_usuarios_mazo` int(10) NOT NULL,
  `pregunta` varchar(100) NOT NULL,
  `respuesta` varchar(100) NOT NULL,
  `veces_mostrado` int(5) DEFAULT NULL,
  `veces_acertado` int(5) DEFAULT NULL,
  `ultima_vez_mostrado` int(5) DEFAULT NULL,
  `ultima_vez_acertado` int(5) DEFAULT NULL,
  `puntos` int(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `mazos_predefinidos`
--
ALTER TABLE `mazos_predefinidos`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `mazos_predefinidos_tarjeta`
--
ALTER TABLE `mazos_predefinidos_tarjeta`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=260;

--
-- AUTO_INCREMENT de la tabla `usuarios_carpetas`
--
ALTER TABLE `usuarios_carpetas`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2710;

--
-- AUTO_INCREMENT de la tabla `usuarios_mazo`
--
ALTER TABLE `usuarios_mazo`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=966;

--
-- AUTO_INCREMENT de la tabla `usuarios_mazo_tarjetas`
--
ALTER TABLE `usuarios_mazo_tarjetas`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=494;

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
