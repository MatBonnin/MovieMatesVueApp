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
  `idMovie` int(11) NOT NULL,
  `text` text NOT NULL,
  `creationDate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comment_FK` (`idMovie`),
  KEY `comment_FK_1` (`idUser`),
  CONSTRAINT `comment_FK` FOREIGN KEY (`idMovie`) REFERENCES `movie` (`id`),
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (38,0,'/tt79dbOPd9Z9ykEOpvckttgYXwH.jpg',25000000,'','tt6710474','en','Everything Everywhere All at Once','Primé aux OSCARS 2023 : Meilleur film - Meilleur scénario - Meilleure réalisation - Meilleure actrice (Michelle Yeoh) - Meilleurs seconds rôles (Jamie Lee Curtis et Ke Huy Quan).  Evelyn Wang est à bout : elle ne comprend plus sa famille, son travail et croule sous les impôts… Soudain, elle se retrouve plongée dans le multivers, des mondes parallèles où elle explore toutes les vies qu’elle aurait pu mener. Face à des forces obscures, elle seule peut sauver le monde mais aussi préserver la chose la plus précieuse : sa famille.',1105.82,'/xqMbHUHskSEjuuuJaVZWT37ptbq.jpg','2022-03-24',106700036,139,'Released','L\'univers est tellement plus grand que vous ne le pensez.','Everything Everywhere All at Once',0,7.942,3760),(39,0,'/bRyharzJeD1l2sTjA5ewVf0R0ZU.jpg',35000000,'','tt14209916','en','Cocaine Bear','En 1985 une cargaison de cocaïne disparue après le crash de l\'\'avion qui la transportait, avait été en fait ingérée par un ours brun. Tel est le point de départ de ce thriller haletant où, au cœur d\'\'une forêt du fin fond de la Georgie, va se former un groupe mal assorti de flics, de criminels, de touristes et d\'\'adolescents, assemblés pour affronter un super prédateur enragé et assoiffé de sang, rendu complètement fou par l\'\'ingestion d\'\'une dose faramineuse de cocaïne.',506.468,'/crl0mZX2wPzuB7YYslcU8UIv1Ml.jpg','2023-02-22',66458105,95,'Released','Un ours ça sniffe énormément','Crazy Bear',0,6.753,190),(40,0,'/eN6R6mb3ntHwA3y3MhSwpP78ljN.jpg',0,'','tt3155298','en','Luther: The Fallen Sun','Un sinistre tueur en série terrorise Londres, tandis que John Luther, brillant policier en disgrâce, se morfond derrière les barreaux. Hanté par son incapacité à arrêter le cyberpsychopathe qui le tourmente, Luther décide de s\'\'évader de prison pour boucler cette enquête par tous les moyens.',371.318,'/xPGLz4a1TsMZABL3M6GvkJdHOad.jpg','2023-02-24',0,129,'Released','Tourmenté par un tueur. Traqué par les siens.','Luther : Soleil déchu',0,6.909,209),(41,0,'/eN6R6mb3ntHwA3y3MhSwpP78ljN.jpg',0,'','tt3155298','en','Luther: The Fallen Sun','Un sinistre tueur en série terrorise Londres, tandis que John Luther, brillant policier en disgrâce, se morfond derrière les barreaux. Hanté par son incapacité à arrêter le cyberpsychopathe qui le tourmente, Luther décide de s\'\'évader de prison pour boucler cette enquête par tous les moyens.',371.318,'/xPGLz4a1TsMZABL3M6GvkJdHOad.jpg','2023-02-24',0,129,'Released','Tourmenté par un tueur. Traqué par les siens.','Luther : Soleil déchu',0,6.909,209),(42,0,'/tt79dbOPd9Z9ykEOpvckttgYXwH.jpg',25000000,'','tt6710474','en','Everything Everywhere All at Once','Primé aux OSCARS 2023 : Meilleur film - Meilleur scénario - Meilleure réalisation - Meilleure actrice (Michelle Yeoh) - Meilleurs seconds rôles (Jamie Lee Curtis et Ke Huy Quan).  Evelyn Wang est à bout : elle ne comprend plus sa famille, son travail et croule sous les impôts… Soudain, elle se retrouve plongée dans le multivers, des mondes parallèles où elle explore toutes les vies qu’elle aurait pu mener. Face à des forces obscures, elle seule peut sauver le monde mais aussi préserver la chose la plus précieuse : sa famille.',1105.82,'/xqMbHUHskSEjuuuJaVZWT37ptbq.jpg','2022-03-24',106700036,139,'Released','L\'univers est tellement plus grand que vous ne le pensez.','Everything Everywhere All at Once',0,7.94,3765),(43,0,'/bRyharzJeD1l2sTjA5ewVf0R0ZU.jpg',35000000,'','tt14209916','en','Cocaine Bear','En 1985 une cargaison de cocaïne disparue après le crash de l\'\'avion qui la transportait, avait été en fait ingérée par un ours brun. Tel est le point de départ de ce thriller haletant où, au cœur d\'\'une forêt du fin fond de la Georgie, va se former un groupe mal assorti de flics, de criminels, de touristes et d\'\'adolescents, assemblés pour affronter un super prédateur enragé et assoiffé de sang, rendu complètement fou par l\'\'ingestion d\'\'une dose faramineuse de cocaïne.',506.468,'/crl0mZX2wPzuB7YYslcU8UIv1Ml.jpg','2023-02-22',66458105,95,'Released','Un ours ça sniffe énormément','Crazy Bear',0,6.753,190),(44,0,'/tt79dbOPd9Z9ykEOpvckttgYXwH.jpg',25000000,'','tt6710474','en','Everything Everywhere All at Once','Primé aux OSCARS 2023 : Meilleur film - Meilleur scénario - Meilleure réalisation - Meilleure actrice (Michelle Yeoh) - Meilleurs seconds rôles (Jamie Lee Curtis et Ke Huy Quan).  Evelyn Wang est à bout : elle ne comprend plus sa famille, son travail et croule sous les impôts… Soudain, elle se retrouve plongée dans le multivers, des mondes parallèles où elle explore toutes les vies qu’elle aurait pu mener. Face à des forces obscures, elle seule peut sauver le monde mais aussi préserver la chose la plus précieuse : sa famille.',1105.82,'/xqMbHUHskSEjuuuJaVZWT37ptbq.jpg','2022-03-24',106700036,139,'Released','L\'univers est tellement plus grand que vous ne le pensez.','Everything Everywhere All at Once',0,7.94,3765),(45,0,'/v2LilmCylr3bL9TCZSj6syjowZh.jpg',50000000,'','tt7405458','en','A Man Called Otto','Le film raconte l\'\'histoire d\'\'Otto Anderson (Tom Hanks), un veuf grognon très routinier. Le jour où une jeune famille pleine d\'\'entrain emménage dans la maison voisine, il fait la connaissance de Marisol, une femme sur le point d\'\'accoucher et vive d\'\'esprit avec laquelle nait une invraisemblable amitié qui va chambouler son petit monde. Une histoire émouvante et comique sur comment la bonne entente entre familles survient parfois lorsqu\'\'on s\'\'y en attend le moins.',668.421,'/7Sc5hW5HhK2HWGF35MkGtv8guHF.jpg','2022-12-28',103842303,126,'Released','Le bonheur se lit sur son visage.','Le Pire Voisin au monde',0,7.884,748),(46,0,'/eN6R6mb3ntHwA3y3MhSwpP78ljN.jpg',0,'','tt3155298','en','Luther: The Fallen Sun','Un sinistre tueur en série terrorise Londres, tandis que John Luther, brillant policier en disgrâce, se morfond derrière les barreaux. Hanté par son incapacité à arrêter le cyberpsychopathe qui le tourmente, Luther décide de s\'\'évader de prison pour boucler cette enquête par tous les moyens.',371.318,'/xPGLz4a1TsMZABL3M6GvkJdHOad.jpg','2023-02-24',0,129,'Released','Tourmenté par un tueur. Traqué par les siens.','Luther : Soleil déchu',0,6.909,209),(47,0,'/eN6R6mb3ntHwA3y3MhSwpP78ljN.jpg',0,'','tt3155298','en','Luther: The Fallen Sun','Un sinistre tueur en série terrorise Londres, tandis que John Luther, brillant policier en disgrâce, se morfond derrière les barreaux. Hanté par son incapacité à arrêter le cyberpsychopathe qui le tourmente, Luther décide de s\'\'évader de prison pour boucler cette enquête par tous les moyens.',371.318,'/xPGLz4a1TsMZABL3M6GvkJdHOad.jpg','2023-02-24',0,129,'Released','Tourmenté par un tueur. Traqué par les siens.','Luther : Soleil déchu',0,6.909,209),(48,0,'/tt79dbOPd9Z9ykEOpvckttgYXwH.jpg',25000000,'','tt6710474','en','Everything Everywhere All at Once','Primé aux OSCARS 2023 : Meilleur film - Meilleur scénario - Meilleure réalisation - Meilleure actrice (Michelle Yeoh) - Meilleurs seconds rôles (Jamie Lee Curtis et Ke Huy Quan).  Evelyn Wang est à bout : elle ne comprend plus sa famille, son travail et croule sous les impôts… Soudain, elle se retrouve plongée dans le multivers, des mondes parallèles où elle explore toutes les vies qu’elle aurait pu mener. Face à des forces obscures, elle seule peut sauver le monde mais aussi préserver la chose la plus précieuse : sa famille.',1105.82,'/xqMbHUHskSEjuuuJaVZWT37ptbq.jpg','2022-03-24',106700036,139,'Released','L\'univers est tellement plus grand que vous ne le pensez.','Everything Everywhere All at Once',0,7.942,3760),(49,0,'/r7Dfg9aRZ78gJsmDlCirIIlNH3d.jpg',3000000,'','tt13833688','en','The Whale','Charlie, professeur d\'\'anglais reclus souffrant d\'\'obésité, tente de renouer avec sa fille adolescente pour une ultime chance de rédemption.',1635.86,'/5jilYAMUKk9U5K9phmbFOEDqfR3.jpg','2022-12-09',36752010,117,'Released','','The Whale',0,8.058,1272),(50,0,'/ae4xZiU7IeFVrvXxm2GjdcTrBm.jpg',35000000,'https://www.paramountpictures.fr/film/untitled-scream-sequel','tt17663992','en','Scream VI','Après avoir frappé à trois reprises à Woodsboro, après avoir terrorisé le campus de Windsor et les studios d’Hollywood, Ghostface a décidé de sévir dans Big Apple, mais dans une ville aussi grande que New York personne ne vous entendra crier…',768.536,'/ykB2ooivlz8p0EznxjVpFvr7i9Y.jpg','2023-03-08',67047270,123,'Released','Nouvelle ville. Nouvelles règles.','Scream VI',0,7.542,261),(51,0,'/eN6R6mb3ntHwA3y3MhSwpP78ljN.jpg',0,'','tt3155298','en','Luther: The Fallen Sun','Un sinistre tueur en série terrorise Londres, tandis que John Luther, brillant policier en disgrâce, se morfond derrière les barreaux. Hanté par son incapacité à arrêter le cyberpsychopathe qui le tourmente, Luther décide de s\'\'évader de prison pour boucler cette enquête par tous les moyens.',371.318,'/xPGLz4a1TsMZABL3M6GvkJdHOad.jpg','2023-02-24',0,129,'Released','Tourmenté par un tueur. Traqué par les siens.','Luther : Soleil déchu',0,6.909,209),(52,0,'/eN6R6mb3ntHwA3y3MhSwpP78ljN.jpg',0,'','tt3155298','en','Luther: The Fallen Sun','Un sinistre tueur en série terrorise Londres, tandis que John Luther, brillant policier en disgrâce, se morfond derrière les barreaux. Hanté par son incapacité à arrêter le cyberpsychopathe qui le tourmente, Luther décide de s\'\'évader de prison pour boucler cette enquête par tous les moyens.',371.318,'/xPGLz4a1TsMZABL3M6GvkJdHOad.jpg','2023-02-24',0,129,'Released','Tourmenté par un tueur. Traqué par les siens.','Luther : Soleil déchu',0,6.909,209),(53,0,'/eN6R6mb3ntHwA3y3MhSwpP78ljN.jpg',0,'','tt3155298','en','Luther: The Fallen Sun','Un sinistre tueur en série terrorise Londres, tandis que John Luther, brillant policier en disgrâce, se morfond derrière les barreaux. Hanté par son incapacité à arrêter le cyberpsychopathe qui le tourmente, Luther décide de s\'\'évader de prison pour boucler cette enquête par tous les moyens.',371.318,'/xPGLz4a1TsMZABL3M6GvkJdHOad.jpg','2023-02-24',0,129,'Released','Tourmenté par un tueur. Traqué par les siens.','Luther : Soleil déchu',0,6.909,209),(54,0,'/bRyharzJeD1l2sTjA5ewVf0R0ZU.jpg',35000000,'','tt14209916','en','Cocaine Bear','En 1985 une cargaison de cocaïne disparue après le crash de l\'\'avion qui la transportait, avait été en fait ingérée par un ours brun. Tel est le point de départ de ce thriller haletant où, au cœur d\'\'une forêt du fin fond de la Georgie, va se former un groupe mal assorti de flics, de criminels, de touristes et d\'\'adolescents, assemblés pour affronter un super prédateur enragé et assoiffé de sang, rendu complètement fou par l\'\'ingestion d\'\'une dose faramineuse de cocaïne.',506.468,'/crl0mZX2wPzuB7YYslcU8UIv1Ml.jpg','2023-02-22',66458105,95,'Released','Un ours ça sniffe énormément','Crazy Bear',0,6.753,190),(55,0,'/tt79dbOPd9Z9ykEOpvckttgYXwH.jpg',25000000,'','tt6710474','en','Everything Everywhere All at Once','Primé aux OSCARS 2023 : Meilleur film - Meilleur scénario - Meilleure réalisation - Meilleure actrice (Michelle Yeoh) - Meilleurs seconds rôles (Jamie Lee Curtis et Ke Huy Quan).  Evelyn Wang est à bout : elle ne comprend plus sa famille, son travail et croule sous les impôts… Soudain, elle se retrouve plongée dans le multivers, des mondes parallèles où elle explore toutes les vies qu’elle aurait pu mener. Face à des forces obscures, elle seule peut sauver le monde mais aussi préserver la chose la plus précieuse : sa famille.',1105.82,'/xqMbHUHskSEjuuuJaVZWT37ptbq.jpg','2022-03-24',106700036,139,'Released','L\'univers est tellement plus grand que vous ne le pensez.','Everything Everywhere All at Once',0,7.942,3760),(56,0,'/ae4xZiU7IeFVrvXxm2GjdcTrBm.jpg',35000000,'https://www.paramountpictures.fr/film/untitled-scream-sequel','tt17663992','en','Scream VI','Après avoir frappé à trois reprises à Woodsboro, après avoir terrorisé le campus de Windsor et les studios d’Hollywood, Ghostface a décidé de sévir dans Big Apple, mais dans une ville aussi grande que New York personne ne vous entendra crier…',768.536,'/ykB2ooivlz8p0EznxjVpFvr7i9Y.jpg','2023-03-08',67047270,123,'Released','Nouvelle ville. Nouvelles règles.','Scream VI',0,7.542,261),(57,0,'/r7Dfg9aRZ78gJsmDlCirIIlNH3d.jpg',3000000,'','tt13833688','en','The Whale','Charlie, professeur d\'\'anglais reclus souffrant d\'\'obésité, tente de renouer avec sa fille adolescente pour une ultime chance de rédemption.',1635.86,'/5jilYAMUKk9U5K9phmbFOEDqfR3.jpg','2022-12-09',36752010,117,'Released','','The Whale',0,8.058,1272),(58,0,'/eN6R6mb3ntHwA3y3MhSwpP78ljN.jpg',0,'','tt3155298','en','Luther: The Fallen Sun','Un sinistre tueur en série terrorise Londres, tandis que John Luther, brillant policier en disgrâce, se morfond derrière les barreaux. Hanté par son incapacité à arrêter le cyberpsychopathe qui le tourmente, Luther décide de s\'\'évader de prison pour boucler cette enquête par tous les moyens.',371.318,'/xPGLz4a1TsMZABL3M6GvkJdHOad.jpg','2023-02-24',0,129,'Released','Tourmenté par un tueur. Traqué par les siens.','Luther : Soleil déchu',0,6.909,209),(59,0,'/v2LilmCylr3bL9TCZSj6syjowZh.jpg',50000000,'','tt7405458','en','A Man Called Otto','Le film raconte l\'\'histoire d\'\'Otto Anderson (Tom Hanks), un veuf grognon très routinier. Le jour où une jeune famille pleine d\'\'entrain emménage dans la maison voisine, il fait la connaissance de Marisol, une femme sur le point d\'\'accoucher et vive d\'\'esprit avec laquelle nait une invraisemblable amitié qui va chambouler son petit monde. Une histoire émouvante et comique sur comment la bonne entente entre familles survient parfois lorsqu\'\'on s\'\'y en attend le moins.',668.421,'/7Sc5hW5HhK2HWGF35MkGtv8guHF.jpg','2022-12-28',103842303,126,'Released','Le bonheur se lit sur son visage.','Le Pire Voisin au monde',0,7.884,748);
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

-- Dump completed on 2023-03-18 15:19:54
