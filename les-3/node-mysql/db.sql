
DROP DATABASE IF EXISTS `node-mysql`;
CREATE DATABASE `node-mysql`;

-- node_mysql_user aanmaken
CREATE USER 'node_mysql_user'@'localhost' IDENTIFIED BY 'secret';

-- geef in een keer alle rechten - soort administrator!
GRANT ALL ON `node-mysql`.* TO 'node_mysql_user'@'localhost';

GRANT ALL ON `sakila`.* TO 'node_mysql_user'@'localhost';
