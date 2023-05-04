/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `gx` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `gx`;

CREATE TABLE IF NOT EXISTS `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `marca_cat` varchar(50) DEFAULT NULL,
  `atrib1_cat` varchar(50) DEFAULT NULL,
  `atrib2_cat` varchar(50) DEFAULT NULL,
  `atrib3_cat` varchar(50) DEFAULT NULL,
  `atrib4_cat` varchar(50) DEFAULT NULL,
  `modelo_cat` varchar(50) DEFAULT NULL,
  `atrib5_cat` varchar(50) DEFAULT NULL,
  `atrib6_cat` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome` (`nome`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;

/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
REPLACE INTO `categorias` (`id`, `nome`, `tipo`, `is_active`, `marca_cat`, `atrib1_cat`, `atrib2_cat`, `atrib3_cat`, `atrib4_cat`, `modelo_cat`, `atrib5_cat`, `atrib6_cat`) VALUES
	(1, 'HD', 'P', 0, 'marca', 'capacidade', 'tamanho', 'rpm', 'tipo_entrada', 'modelo', NULL, NULL),
	(2, 'Monitor', 'E', 0, 'marca', 'tamanho', 'tecnologia', 'voltagem', 'entradas', 'modelo', NULL, NULL),
	(3, 'placa mae', 'P', 1, 'marca', 'socket', 'tipo_mem', 'tipo_video', 'tipo_hd', 'modelo', 'saida_video', 'placa_rede'),
	(5, 'processador', 'P', 1, 'marca', 'Nº de nucleos', 'Nº de thereds', NULL, NULL, NULL, NULL, NULL),
	(11, 'ssd', 'P', 1, 'marca', 'Nº de nucleos', 'Nº de thereds', NULL, NULL, NULL, NULL, NULL),
	(41, 'teclado', 'p', 1, 'test', 'test', 'test', 'test', 'test', 'test', 'test', NULL),
	(44, 'mouse', 'p', 1, 'test', 'test', 'test', 'test', 'test', 'test', 'test', NULL),
	(47, 'teste01', 'p', 1, 'test', 'test', 'test', 'test', 'test', 'test', 'test', NULL);
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `equipamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `numero` varchar(50) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*!40000 ALTER TABLE `equipamentos` DISABLE KEYS */;
REPLACE INTO `equipamentos` (`id`, `nome`, `numero`, `is_active`) VALUES
	(1, 'Positivo', 'pms-210707', 0),
	(2, 'test', 'pms-210708', 1),
	(3, 'hp', 'pms-150807', 1);
/*!40000 ALTER TABLE `equipamentos` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `especificacoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_categorias_id` int(11) NOT NULL DEFAULT 0,
  `saldo` int(4) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `marca` varchar(50) CHARACTER SET utf8mb3 NOT NULL DEFAULT '0',
  `modelo` varchar(50) CHARACTER SET utf8mb3 NOT NULL DEFAULT '0',
  `atrib1` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL DEFAULT '0',
  `atrib2` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL DEFAULT '0',
  `atrib3` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL DEFAULT '0',
  `atrib4` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL DEFAULT '0',
  `atrib5` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL DEFAULT '0',
  `atrib6` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL DEFAULT '0',
  `SKU` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_categoruas_id` (`fk_categorias_id`),
  CONSTRAINT `FK__categorias` FOREIGN KEY (`fk_categorias_id`) REFERENCES `categorias` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*!40000 ALTER TABLE `especificacoes` DISABLE KEYS */;
REPLACE INTO `especificacoes` (`id`, `fk_categorias_id`, `saldo`, `is_active`, `marca`, `modelo`, `atrib1`, `atrib2`, `atrib3`, `atrib4`, `atrib5`, `atrib6`, `SKU`) VALUES
	(3, 1, NULL, 1, 'test', 'test', 'test', 'test', 'test', 'test', 'sla', '0', 'TESTESTESTESTESTESSLA'),
	(4, 1, NULL, 1, 'cpu', 'Nº sockets', 'Nº nucleos', 'test', 'test', 'test', 'sla', '0', 'CPUNº Nº TESTESTESSLA');
/*!40000 ALTER TABLE `especificacoes` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `movimentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_peca` int(11) DEFAULT NULL,
  `id_equipamento` int(11) DEFAULT NULL,
  `tipo` varchar(50) NOT NULL,
  `valor` varchar(50) NOT NULL,
  `data` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_peca` (`id_peca`),
  KEY `id_equipamento` (`id_equipamento`),
  CONSTRAINT `FK_movimentos_equipamentos` FOREIGN KEY (`id_equipamento`) REFERENCES `equipamentos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_movimentos_pecas` FOREIGN KEY (`id_peca`) REFERENCES `pecas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_movimentos_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=latin1;

/*!40000 ALTER TABLE `movimentos` DISABLE KEYS */;
REPLACE INTO `movimentos` (`id`, `id_usuario`, `id_peca`, `id_equipamento`, `tipo`, `valor`, `data`) VALUES
	(1, 2, NULL, 3, 'E', '10', '2022-10-25 15:44:56'),
	(2, 2, 2, 1, 'S', '1', '2022-10-25 15:46:49'),
	(3, 1, 14, NULL, 'e', '10', '2022-10-25 17:32:59'),
	(4, 1, 2, NULL, 'E', '90', '2022-10-25 17:34:54'),
	(5, 1, 2, NULL, 'S', '100', '2022-10-25 17:35:12'),
	(6, 1, 2, NULL, 'S', '70', '2022-10-31 15:59:18'),
	(7, 1, 2, NULL, 'S', '60', '2022-10-31 15:59:59'),
	(8, 1, 2, NULL, 'S', '50', '2022-10-31 16:00:23'),
	(9, 1, 2, NULL, 'S', '40', '2022-10-31 16:00:42'),
	(10, 1, 2, NULL, 'S', '30', '2022-10-31 16:00:44'),
	(11, 1, 2, NULL, 'S', '20', '2022-10-31 16:02:57'),
	(12, 1, 2, NULL, 'S', '10', '2022-10-31 16:04:21'),
	(13, 1, 2, NULL, 'E', '0', '2022-10-31 16:04:31'),
	(14, 1, 2, NULL, 'E', '10', '2022-10-31 16:04:31'),
	(15, 1, 2, NULL, 'E', '20', '2022-10-31 16:04:32'),
	(16, 1, 2, NULL, 'E', '30', '2022-10-31 16:04:33'),
	(17, 1, 2, NULL, 'E', '40', '2022-10-31 16:04:33'),
	(18, 1, 2, NULL, 'E', '50', '2022-10-31 16:04:33'),
	(19, 1, 2, NULL, 'E', '60', '2022-10-31 16:04:34'),
	(20, 1, 2, NULL, 'E', '70', '2022-10-31 16:04:34'),
	(21, 1, 2, NULL, 'E', '80', '2022-10-31 16:04:35'),
	(22, 1, 2, NULL, 'E', '90', '2022-10-31 16:04:35'),
	(23, 1, 2, NULL, 'E', '100', '2022-10-31 16:04:36'),
	(24, 1, 2, NULL, 'E', '110', '2022-10-31 16:04:36'),
	(25, 1, 2, NULL, 'E', '120', '2022-10-31 16:04:37'),
	(26, 1, 2, NULL, 'E', '130', '2022-10-31 16:04:37'),
	(27, 1, 2, NULL, 'E', '140', '2022-10-31 16:04:38'),
	(28, 1, 2, NULL, 'E', '150', '2022-10-31 16:04:39'),
	(29, 1, 2, NULL, 'E', '160', '2022-10-31 16:04:40'),
	(30, 1, 2, NULL, 'E', '170', '2022-10-31 16:06:27'),
	(31, 1, 2, NULL, 'E', '180', '2022-10-31 16:06:27'),
	(32, 1, 2, NULL, 'E', '190', '2022-10-31 16:06:28'),
	(33, 1, 2, NULL, 'E', '200', '2022-10-31 16:06:41'),
	(34, 1, 2, NULL, 'E', '210', '2022-10-31 16:06:41'),
	(35, 1, 2, NULL, 'E', '220', '2022-10-31 16:06:42'),
	(36, 1, 2, NULL, 'E', '230', '2022-10-31 16:14:41'),
	(37, 1, 2, NULL, 'E', '240', '2022-10-31 16:14:49'),
	(38, 1, 2, NULL, 'E', '250', '2022-10-31 16:15:04'),
	(39, 1, 2, NULL, 'E', '260', '2022-10-31 16:15:18'),
	(40, 1, 2, NULL, 'E', '270', '2022-10-31 16:15:40'),
	(41, 1, 2, NULL, 'E', '280', '2022-10-31 16:15:46'),
	(42, 1, 2, NULL, 'E', '290', '2022-10-31 16:16:05'),
	(43, 1, 2, NULL, 'S', '300', '2022-10-31 16:16:15'),
	(44, 1, 2, NULL, 'S', '290', '2022-10-31 16:16:16'),
	(45, 1, 2, NULL, 'S', '280', '2022-10-31 16:16:16'),
	(46, 1, 2, NULL, 'S', '270', '2022-10-31 16:16:17'),
	(47, 1, 2, NULL, 'S', '260', '2022-10-31 16:16:36'),
	(48, 1, 2, NULL, 'S', '250', '2022-10-31 16:17:02'),
	(49, 1, 2, NULL, 'S', '240', '2022-10-31 16:17:02'),
	(50, 1, 2, NULL, 'S', '230', '2022-10-31 16:17:03'),
	(51, 1, 2, NULL, 'S', '220', '2022-10-31 16:17:44'),
	(52, 1, 2, NULL, 'S', '210', '2022-10-31 16:18:09'),
	(53, 1, 2, NULL, 'S', '210', '2022-10-31 16:18:22'),
	(54, 1, 2, NULL, 'S', '210', '2022-10-31 16:18:22'),
	(55, 1, 2, NULL, 'S', '210', '2022-10-31 16:18:23'),
	(56, 1, 2, NULL, 'S', '210', '2022-10-31 16:18:24'),
	(57, 1, 2, NULL, 'S', '210', '2022-10-31 16:18:43'),
	(58, 1, 2, NULL, 'S', '210', '2022-10-31 16:18:52'),
	(59, 1, 2, NULL, 'S', '210', '2022-10-31 16:18:53'),
	(60, 1, 2, NULL, 'E', '210', '2022-10-31 16:18:59'),
	(61, 1, 2, NULL, 'E', '210', '2022-10-31 16:18:59'),
	(62, 1, 2, NULL, 'E', '210', '2022-10-31 16:19:00'),
	(63, 1, 2, NULL, 'E', '210', '2022-10-31 16:19:01'),
	(64, 1, 2, NULL, 'E', '210', '2022-10-31 16:19:01'),
	(65, 1, 2, NULL, 'E', '210', '2022-10-31 16:19:35'),
	(66, 1, 2, NULL, 'E', '210', '2022-10-31 16:19:37'),
	(67, 1, 2, NULL, 'E', '210', '2022-10-31 16:19:37'),
	(68, 1, 2, NULL, 'E', '210', '2022-10-31 16:21:27'),
	(69, 1, 2, NULL, 'E', '210', '2022-10-31 16:21:28'),
	(70, 1, 2, NULL, 'E', '210', '2022-10-31 16:21:28'),
	(71, 1, 2, NULL, 'S', '210', '2022-10-31 16:21:35'),
	(72, 1, 2, NULL, 'S', '210', '2022-10-31 16:21:36'),
	(73, 1, 2, NULL, 'S', '210', '2022-10-31 16:21:37'),
	(74, 1, 2, NULL, 'S', '210', '2022-10-31 16:21:37'),
	(75, 1, 2, NULL, 'S', '210', '2022-10-31 16:22:06'),
	(76, 1, 2, NULL, 'S', '210', '2022-10-31 16:22:07'),
	(77, 1, 2, NULL, 'S', '210', '2022-10-31 16:22:08'),
	(78, 1, 2, NULL, 'S', '210', '2022-10-31 16:22:08'),
	(79, 1, 2, NULL, 'S', '210', '2022-10-31 16:22:09'),
	(80, 1, 2, NULL, 'S', '210', '2022-10-31 16:22:28'),
	(81, 1, 2, NULL, 'S', '210', '2022-10-31 16:22:29'),
	(82, 1, 2, NULL, 'S', '210', '2022-10-31 16:22:30'),
	(83, 1, 2, NULL, 'S', '210', '2022-10-31 16:22:31'),
	(84, 1, 2, NULL, 'S', '210', '2022-10-31 16:22:31'),
	(85, 1, 2, NULL, 'S', '210', '2022-10-31 16:22:38'),
	(86, 1, 2, NULL, 'S', '210', '2022-10-31 16:22:39'),
	(87, 1, 2, NULL, 'S', '210', '2022-10-31 16:22:40'),
	(88, 1, 2, NULL, 'S', '210', '2022-10-31 16:22:52'),
	(89, 1, 2, NULL, 'S', '210', '2022-10-31 16:22:53'),
	(90, 1, 2, NULL, 'S', '210', '2022-10-31 16:22:53'),
	(91, 1, 2, NULL, 'S', '210', '2022-10-31 16:23:08'),
	(92, 1, 2, NULL, 'S', '210', '2022-10-31 16:23:10'),
	(93, 1, 2, NULL, 'S', '210', '2022-10-31 16:23:11'),
	(94, 1, 2, NULL, 'S', '210', '2022-10-31 16:23:11'),
	(95, 1, 2, NULL, 'S', '150', '2022-10-31 16:23:20'),
	(96, 1, 2, NULL, 'S', '150', '2022-10-31 16:23:21'),
	(97, 1, 2, NULL, 'S', '150', '2022-10-31 16:23:22'),
	(98, 1, 2, NULL, 'S', '150', '2022-10-31 16:23:22'),
	(99, 1, 2, NULL, 'S', '150', '2022-10-31 16:23:23'),
	(100, 1, 2, NULL, 'S', '150', '2022-10-31 16:23:23'),
	(101, 1, 2, NULL, 'S', '150', '2022-10-31 16:23:24'),
	(102, 1, 2, NULL, 'S', '150', '2022-10-31 16:23:55'),
	(103, 1, 2, NULL, 'S', '140', '2022-10-31 16:23:56'),
	(104, 1, 2, NULL, 'S', '130', '2022-10-31 16:23:57'),
	(105, 1, 2, NULL, 'S', '120', '2022-10-31 16:23:57'),
	(106, 1, 2, NULL, 'S', '110', '2022-10-31 16:23:58'),
	(107, 1, 2, NULL, 'S', '100', '2022-10-31 16:23:59'),
	(108, 1, 2, NULL, 'S', '90', '2022-10-31 16:24:00'),
	(109, 1, 2, NULL, 'S', '80', '2022-10-31 16:24:03'),
	(110, 1, 2, NULL, 'S', '70', '2022-10-31 16:24:03'),
	(111, 1, 2, NULL, 'S', '60', '2022-10-31 16:24:09'),
	(112, 1, 2, NULL, 'S', '60', '2022-10-31 16:24:10'),
	(113, 1, 2, NULL, 'S', '60', '2022-10-31 16:24:10'),
	(114, 1, 2, NULL, 'S', '60', '2022-10-31 16:25:04'),
	(115, 1, 2, NULL, 'S', '60', '2022-10-31 16:25:05'),
	(116, 1, 2, NULL, 'S', '60', '2022-10-31 16:25:05'),
	(117, 1, 2, NULL, 'S', '60', '2022-10-31 16:25:17'),
	(118, 1, 2, NULL, 'S', '60', '2022-10-31 16:25:18'),
	(119, 1, 2, NULL, 'S', '60', '2022-10-31 16:25:19'),
	(120, 1, 2, NULL, 'S', '60', '2022-10-31 16:25:31'),
	(121, 1, 2, NULL, 'S', '50', '2022-10-31 16:25:32'),
	(122, 1, 2, NULL, 'S', '40', '2022-10-31 16:25:33'),
	(123, 1, 2, NULL, 'S', '30', '2022-10-31 16:25:34'),
	(124, 1, 2, NULL, 'S', '20', '2022-10-31 16:25:46'),
	(125, 1, 2, NULL, 'E', '10', '2022-10-31 16:25:54');
/*!40000 ALTER TABLE `movimentos` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `senha` char(150) NOT NULL,
  `criado` date NOT NULL,
  `alterado` date DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;

/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
REPLACE INTO `usuarios` (`id`, `nome`, `senha`, `criado`, `alterado`, `is_active`) VALUES
	(1, 'joao', '123', '2022-09-21', NULL, 1),
	(2, 'joao', '123', '2022-09-21', NULL, 1),
	(3, 'joao', '$2a$10$Nzm3UDSH1MrIjCdEOhlJ7OfOLQKYh4mGujBlvJRi3p2/jf9izehoe', '0000-00-00', NULL, 1),
	(4, 'joao', '$2a$10$VSespoZIQXwebSw5X258jO2HmKayegINeKyIqL0PuAH4c2tkvDxl2', '0000-00-00', NULL, 1),
	(5, 'joao', '$2a$10$/LiwiVgakXafdh3KNqadsOBTDbMxLCpU4O.B32lH3n/iFpcVmxyNC', '2022-10-13', NULL, 1),
	(6, 'joao', '$2a$10$OH2Gkh6R8OQtQhwKstsm9ezAHBvNRgtKsFrnd6Xq/RAlY36OBKrcS', '2022-10-13', NULL, 1),
	(7, 'joao', '$2a$10$7sOSDG/5bz/MKseuadN...1LtRzhwiK4hRfBrrxVygvhLbpSIrUvy', '2022-10-13', NULL, 1),
	(8, 'test', '202cb962ac59075b964b07152d234b70', '2022-10-26', NULL, 1),
	(9, 'test2', '202cb962ac59075b964b07152d234b70', '2022-10-26', NULL, 1),
	(10, 'test2', '202cb962ac59075b964b07152d234b70', '2022-10-26', NULL, 1),
	(11, 'test2', '202cb962ac59075b964b07152d234b70', '2022-11-25', NULL, 1),
	(12, 'test2', '202cb962ac59075b964b07152d234b70', '2022-11-25', NULL, 1),
	(13, 'test2', '202cb962ac59075b964b07152d234b70', '2022-11-25', NULL, 1),
	(14, 'test2', '202cb962ac59075b964b07152d234b70', '2022-11-25', NULL, 1),
	(15, 'test2', '202cb962ac59075b964b07152d234b70', '2022-11-25', NULL, 1),
	(16, 'joao', '202cb962ac59075b964b07152d234b70', '2022-11-25', NULL, 1),
	(17, 'regiane', '202cb962ac59075b964b07152d234b70', '2022-11-25', NULL, 1),
	(18, 'test2', '202cb962ac59075b964b07152d234b70', '2023-01-02', NULL, 1),
	(19, 'zica', '202cb962ac59075b964b07152d234b70', '2023-01-02', NULL, 1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
