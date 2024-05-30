-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-05-2024 a las 23:34:40
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_data`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `requests`
--

CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `descripcion_https` varchar(100) NOT NULL,
  `cod_acceso` varchar(100) NOT NULL,
  `descripcion_SSL` varchar(100) NOT NULL,
  `descripcion_url` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `requests`
--

INSERT INTO `requests` (`id`, `descripcion_https`, `cod_acceso`, `descripcion_SSL`, `descripcion_url`) VALUES
(1, 'La URL no utiliza HTTPS, lo cual puede ser inseguro.', 'La URL está accesible y devuelve un código 200 OK.', '', 'http://www.infodasa.com/web/newsDetails.php?id_section=115&id=158'),
(2, 'La URL utiliza HTTPS, lo cual es seguro.', 'La URL está accesible y devuelve un código 200 OK.', 'El sitio tiene un certificado SSL, pero puede ser inválido o caducado.', 'https://auditoria.gov.co'),
(3, 'La URL utiliza HTTPS, lo cual es seguro.', 'La URL está accesible y devuelve un código 200 OK.', 'El sitio tiene un certificado SSL, pero puede ser inválido o caducado.', 'https://www.minvivienda.gov.co'),
(4, 'La URL utiliza HTTPS, lo cual es seguro.', 'La URL está accesible y devuelve un código 200 OK.', 'El sitio tiene un certificado SSL, pero puede ser inválido o caducado.', 'https://www.minvivienda.gov.co'),
(5, 'La URL utiliza HTTPS, lo cual es seguro.', 'La URL está accesible y devuelve un código 200 OK.', 'El sitio tiene un certificado SSL, pero puede ser inválido o caducado.', 'https://www.minvivienda.gov.co'),
(6, 'La URL utiliza HTTPS, lo cual es seguro.', 'La URL está accesible y devuelve un código 200 OK.', 'El sitio tiene un certificado SSL, pero puede ser inválido o caducado.', 'https://www.minvivienda.gov.co'),
(7, 'La URL utiliza HTTPS, lo cual es seguro.', 'La URL está accesible y devuelve un código 200 OK.', 'El sitio tiene un certificado SSL, pero puede ser inválido o caducado.', 'https://www.minvivienda.gov.co'),
(8, 'URL utiliza HTTPS, lo cual es seguro.', 'URL está accesible y devuelve un código 200 OK.', 'El sitio tiene un certificado SSL, pero puede ser inválido o caducado.', 'https://oferta.senasofiaplus.edu.co/sofia-oferta/'),
(9, 'URL utiliza HTTPS, lo cual es seguro.', 'URL está accesible y devuelve un código 200 OK.', 'El sitio tiene un certificado SSL, pero puede ser inválido o caducado.', 'https://oferta.senasofiaplus.edu.co/sofia-oferta/'),
(10, 'URL utiliza HTTPS, lo cual es seguro.', 'URL está accesible y devuelve un código 200 OK.', 'El sitio tiene un certificado SSL, pero puede ser inválido o caducado.', 'https://oferta.senasofiaplus.edu.co/sofia-oferta/'),
(11, 'URL utiliza HTTPS, lo cual es seguro.', 'URL está accesible y devuelve un código 200 OK.', 'El sitio tiene un certificado SSL, pero puede ser inválido o caducado.', 'https://oferta.senasofiaplus.edu.co/sofia-oferta/'),
(12, 'URL utiliza HTTPS, lo cual es seguro.', 'URL está accesible y devuelve un código 200 OK.', 'El sitio tiene un certificado SSL, pero puede ser inválido o caducado.', 'https://oferta.senasofiaplus.edu.co/sofia-oferta/'),
(13, 'URL utiliza HTTPS, lo cual es seguro.', 'URL está accesible y devuelve un código 200 OK.', 'El sitio tiene un certificado SSL, pero puede ser inválido o caducado.', 'https://oferta.senasofiaplus.edu.co/sofia-oferta/'),
(14, 'URL utiliza HTTPS, lo cual es seguro.', 'URL está accesible y devuelve un código 200 OK.', 'El sitio tiene un certificado SSL, pero puede ser inválido o caducado.', 'https://oferta.senasofiaplus.edu.co/sofia-oferta/'),
(16, 'URL utiliza HTTPS, lo cual es seguro.', 'URL está accesible y devuelve un código 200 OK.', 'El sitio tiene un certificado SSL, pero puede ser inválido o caducado.', 'https://support.google.com/'),
(17, 'URL utiliza HTTPS, lo cual es seguro.', 'URL está accesible y devuelve un código 200 OK.', 'El sitio tiene un certificado SSL, pero puede ser inválido o caducado.', 'https://github.com/');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
