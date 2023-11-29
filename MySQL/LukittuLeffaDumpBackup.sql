-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lukittuleffa
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `joinrequest`
--

DROP TABLE IF EXISTS `joinrequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `joinrequest` (
  `status` tinyint(1) NOT NULL COMMENT 'In postgres, change this to boolean. Tinyint(1) serves as a boolean in MySQL, but isn''t supported in postgres.',
  `userlukittu_userid` int NOT NULL,
  `watchgroup_groupid` int NOT NULL,
  PRIMARY KEY (`userlukittu_userid`,`watchgroup_groupid`),
  KEY `fk_invitation_userlukittu1_idx` (`userlukittu_userid`),
  KEY `fk_invitation_watchgroup1_idx` (`watchgroup_groupid`),
  CONSTRAINT `fk_invitation_userlukittu1` FOREIGN KEY (`userlukittu_userid`) REFERENCES `userlukittu` (`userid`),
  CONSTRAINT `fk_invitation_watchgroup1` FOREIGN KEY (`watchgroup_groupid`) REFERENCES `watchgroup` (`groupid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `joinrequest`
--

LOCK TABLES `joinrequest` WRITE;
/*!40000 ALTER TABLE `joinrequest` DISABLE KEYS */;
/*!40000 ALTER TABLE `joinrequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userlukittu`
--

DROP TABLE IF EXISTS `userlukittu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `userlukittu` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` tinytext NOT NULL COMMENT 'Unique username which user uses to log in which also shows as the users nickname on the website.',
  `pwd` tinytext NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `id_UNIQUE` (`userid`),
  UNIQUE KEY `uname_UNIQUE` (`username`(45))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userlukittu`
--

LOCK TABLES `userlukittu` WRITE;
/*!40000 ALTER TABLE `userlukittu` DISABLE KEYS */;
/*!40000 ALTER TABLE `userlukittu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watchgroup`
--

DROP TABLE IF EXISTS `watchgroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `watchgroup` (
  `groupid` int NOT NULL,
  `groupname` tinytext NOT NULL,
  `moderatorid` int NOT NULL COMMENT 'The userid who is moderator',
  `description` text COMMENT 'A description for the groups',
  PRIMARY KEY (`groupid`),
  UNIQUE KEY `groupid_UNIQUE` (`groupid`),
  UNIQUE KEY `groupname_UNIQUE` (`groupname`(45))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watchgroup`
--

LOCK TABLES `watchgroup` WRITE;
/*!40000 ALTER TABLE `watchgroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `watchgroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watchhistory`
--

DROP TABLE IF EXISTS `watchhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `watchhistory` (
  `movieid` int NOT NULL,
  `userlukittu_userid` int NOT NULL,
  PRIMARY KEY (`movieid`),
  UNIQUE KEY `movieid_UNIQUE` (`movieid`),
  KEY `fk_watchhistory_userlukittu1_idx` (`userlukittu_userid`),
  CONSTRAINT `fk_watchhistory_userlukittu1` FOREIGN KEY (`userlukittu_userid`) REFERENCES `userlukittu` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watchhistory`
--

LOCK TABLES `watchhistory` WRITE;
/*!40000 ALTER TABLE `watchhistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `watchhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watchlist`
--

DROP TABLE IF EXISTS `watchlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `watchlist` (
  `movieid` int NOT NULL,
  `userlukittu_userid` int NOT NULL,
  PRIMARY KEY (`movieid`),
  UNIQUE KEY `movieid_UNIQUE` (`movieid`),
  KEY `fk_watchlist_userlukittu1_idx` (`userlukittu_userid`),
  CONSTRAINT `fk_watchlist_userlukittu1` FOREIGN KEY (`userlukittu_userid`) REFERENCES `userlukittu` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watchlist`
--

LOCK TABLES `watchlist` WRITE;
/*!40000 ALTER TABLE `watchlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `watchlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watchreviews`
--

DROP TABLE IF EXISTS `watchreviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `watchreviews` (
  `reviewid` int NOT NULL,
  `reviewtext` text,
  `rating` float NOT NULL COMMENT '1-5 rating system',
  `reviewdate` datetime DEFAULT NULL,
  `watchhistory_movieid` int NOT NULL,
  PRIMARY KEY (`reviewid`),
  UNIQUE KEY `reviewid_UNIQUE` (`reviewid`),
  KEY `fk_watchreviews_watchhistory1_idx` (`watchhistory_movieid`),
  CONSTRAINT `fk_watchreviews_watchhistory1` FOREIGN KEY (`watchhistory_movieid`) REFERENCES `watchhistory` (`movieid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watchreviews`
--

LOCK TABLES `watchreviews` WRITE;
/*!40000 ALTER TABLE `watchreviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `watchreviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'lukittuleffa'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-18 16:32:36
