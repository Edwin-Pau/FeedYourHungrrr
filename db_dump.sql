-- --------------------------------------------------------
-- Host:                         klbcedmmqp7w17ik.cbetxkdyhwsb.us-east-1.rds.amazonaws.com
-- Server version:               10.4.13-MariaDB-log - Source distribution
-- Server OS:                    Linux
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for vafu4tqc7gv09hif
CREATE DATABASE IF NOT EXISTS `vafu4tqc7gv09hif` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `vafu4tqc7gv09hif`;

-- Dumping structure for table vafu4tqc7gv09hif.Item
CREATE TABLE IF NOT EXISTS `Item` (
  `ItemID` int(11) NOT NULL AUTO_INCREMENT,
  `ItemName` varchar(511) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ItemPrice` decimal(10,2) DEFAULT NULL,
  `RestaurantID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ItemID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table vafu4tqc7gv09hif.Item: ~5 rows (approximately)
/*!40000 ALTER TABLE `Item` DISABLE KEYS */;
INSERT INTO `Item` (`ItemID`, `ItemName`, `ItemPrice`, `RestaurantID`) VALUES
	(1, 'Sushi Combo', 12.55, 3),
	(5, 'Tuna Sushi', 2.00, 3),
	(7, 'Salmon Sushi', 1.22, 3),
	(8, 'Miso', 11.00, 6),
	(9, 'Shoyu', 12.00, 6);
/*!40000 ALTER TABLE `Item` ENABLE KEYS */;

-- Dumping structure for table vafu4tqc7gv09hif.Restaurant
CREATE TABLE IF NOT EXISTS `Restaurant` (
  `RestaurantID` int(11) NOT NULL AUTO_INCREMENT,
  `RestaurantName` varchar(511) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Description` varchar(511) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Username` varchar(511) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`RestaurantID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table vafu4tqc7gv09hif.Restaurant: ~0 rows (approximately)
/*!40000 ALTER TABLE `Restaurant` DISABLE KEYS */;
INSERT INTO `Restaurant` (`RestaurantID`, `RestaurantName`, `Description`, `Username`) VALUES
	(3, 'Miso Japanese Cuisine', 'Great tasting sushi!', 'Admin'),
	(6, 'Best Ramen Shop', 'Town\'s Best Ramen!', 'Admin'),
	(7, 'Deer Garden', 'Best chinese noodle soups in town!', 'Admin');
/*!40000 ALTER TABLE `Restaurant` ENABLE KEYS */;

-- Dumping structure for table vafu4tqc7gv09hif.Stat
CREATE TABLE IF NOT EXISTS `Stat` (
  `StatID` int(11) NOT NULL AUTO_INCREMENT,
  `StatName` varchar(511) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `StatUsage` int(11) DEFAULT NULL,
  PRIMARY KEY (`StatID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table vafu4tqc7gv09hif.Stat: ~11 rows (approximately)
/*!40000 ALTER TABLE `Stat` DISABLE KEYS */;
INSERT INTO `Stat` (`StatID`, `StatName`, `StatUsage`) VALUES
	(1, 'GET_Restaurant', 181),
	(2, 'GET_Restaurant_Me', 162),
	(3, 'POST_Restaurant', 4),
	(4, 'PUT_Restaurant', 2),
	(5, 'DELETE_Restaurant', 2),
	(6, 'GET_Item', 119),
	(7, 'POST_Item', 9),
	(8, 'PUT_Item', 10),
	(9, 'DELETE_Item', 4),
	(10, 'POST_User_Signup', 27),
	(11, 'POST_User_Login', 51);
/*!40000 ALTER TABLE `Stat` ENABLE KEYS */;

-- Dumping structure for table vafu4tqc7gv09hif.User
CREATE TABLE IF NOT EXISTS `User` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(511) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Password` varchar(511) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Token` varchar(511) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table vafu4tqc7gv09hif.User: ~0 rows (approximately)
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` (`UserID`, `Username`, `Password`, `Token`) VALUES
	(33, 'Admin', '$2b$10$rt671R0/yqm7I9R5W8xWpOlHyk5oG0RMV5DDqgizitdtt5rUOgfUG', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWF0IjoxNjE4MTQ0MzQxfQ.T4k-FgJ3nR1fJL_LqutrXLma9ZunxKsZzxJcSD6Qpuo'),
	(34, 'test21', '$2b$10$wE7nwUNoxwbStPID//in1OGePjCiiu8FoMmKTgCyyHXHVoSG65.qC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QyMSIsImlhdCI6MTYxODE0NDU0OX0.ZsVqzxoFKOEas6-fPxp7ZVQ8Les4ndNEpErduZ-7Ies'),
	(35, 'test22', '$2b$10$lmDG2YaOy27bSJ/VaLsbb.gaFFvSjN/fQmH61rtuxX0AN5zIxmXya', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QyMiIsImlhdCI6MTYxODE0NDczNn0.qJZk1JxwVvMHlzx0nCoV-RSpntZTw8CokLilyov1FrQ');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
