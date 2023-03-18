-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: moviemates
-- ------------------------------------------------------
-- Server version	5.5.5-10.11.1-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `idImdbMovie` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `creationDate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comment_FK_1` (`idUser`),
  KEY `comment_FK` (`idImdbMovie`),
  CONSTRAINT `comment_FK` FOREIGN KEY (`idImdbMovie`) REFERENCES `movie` (`imdb_id`),
  CONSTRAINT `comment_FK_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listmovie`
--

DROP TABLE IF EXISTS `listmovie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listmovie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `idOwner` int(11) NOT NULL,
  `isPrivate` tinyint(1) NOT NULL,
  `creationDate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `listmovie_FK` (`idOwner`),
  CONSTRAINT `listmovie_FK` FOREIGN KEY (`idOwner`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listmovie`
--

LOCK TABLES `listmovie` WRITE;
/*!40000 ALTER TABLE `listmovie` DISABLE KEYS */;
/*!40000 ALTER TABLE `listmovie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adult` tinyint(1) DEFAULT NULL,
  `backdrop_path` varchar(255) DEFAULT NULL,
  `budget` int(11) DEFAULT NULL,
  `homepage` varchar(255) DEFAULT NULL,
  `imdb_id` varchar(255) DEFAULT NULL,
  `original_language` varchar(255) DEFAULT NULL,
  `original_title` varchar(255) DEFAULT NULL,
  `overview` text DEFAULT NULL,
  `popularity` float DEFAULT NULL,
  `poster_path` varchar(255) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `revenue` bigint(20) DEFAULT NULL,
  `runtime` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `tagline` text DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `video` tinyint(1) DEFAULT NULL,
  `vote_average` float DEFAULT NULL,
  `vote_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `movie_imdb_id_IDX` (`imdb_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movielistmovie`
--

DROP TABLE IF EXISTS `movielistmovie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movielistmovie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idMovie` int(11) NOT NULL,
  `idListMovie` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `movielistmovie_FK` (`idListMovie`),
  KEY `movielistmovie_FK_1` (`idMovie`),
  CONSTRAINT `movielistmovie_FK` FOREIGN KEY (`idListMovie`) REFERENCES `listmovie` (`id`),
  CONSTRAINT `movielistmovie_FK_1` FOREIGN KEY (`idMovie`) REFERENCES `movie` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movielistmovie`
--

LOCK TABLES `movielistmovie` WRITE;
/*!40000 ALTER TABLE `movielistmovie` DISABLE KEYS */;
/*!40000 ALTER TABLE `movielistmovie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `note`
--

DROP TABLE IF EXISTS `note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `idMovie` int(11) NOT NULL,
  `note` tinyint(1) NOT NULL,
  `creationDate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `note_FK` (`idMovie`),
  KEY `note_FK_1` (`idUser`),
  CONSTRAINT `note_FK` FOREIGN KEY (`idMovie`) REFERENCES `movie` (`id`),
  CONSTRAINT `note_FK_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note`
--

LOCK TABLES `note` WRITE;
/*!40000 ALTER TABLE `note` DISABLE KEYS */;
/*!40000 ALTER TABLE `note` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `birthDate` varchar(20) NOT NULL,
  `bio` varchar(300) DEFAULT NULL,
  `profilPicture` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_be726a825c7254f55be1540601` (`pseudo`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'jeSuisFanDeFilm','Bonnin','Nathan','$2b$10$yO52HBvGu0r4qdCB7LMBsu9vHoquoCzP1OYLG6TCoe.kVL5X/vawK','mbonnin3zs8@gmail.com','07/02/2000',NULL,NULL),(4,'mathieu','Bonnin','Nathan','$2b$10$t.teP6DClHu4CClOKyQhxuwCbOGcKEH18rnFfK1XSrQYFzpCg8k0O','mbonnisn3zs8@gmail.com','07/02/2000',NULL,NULL),(6,'matlamenace','Bonnin','Nathan','$2b$10$7R808c/du8478Tz5kgtD6Ozk5nCey.zjQPThLl6Oa4Pr9UYFqgjfm','mbonnin38@gmail.com','07/02/2000',NULL,NULL),(7,'inesLaMenace','Logrado','Ines','$2b$10$BnEk4d1spIUSQ.5Y0ll9RuklglVZitWMYvyFqtp0R8R/I5Z4O57OO','ilogrado.g@gmail.com','16/03/1980',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'moviemates'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-18 17:42:00
