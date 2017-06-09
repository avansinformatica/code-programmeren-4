
DROP DATABASE IF EXISTS `todolist`;
CREATE DATABASE `todolist`;
USE `todolist`;

-- todolist_user aanmaken
CREATE USER 'todolist_user'@'%' IDENTIFIED BY 'secret';

-- geef in een keer alle rechten - soort administrator!
GRANT ALL ON `todolist`.* TO 'todolist_user'@'%';


-- -----------------------------------------------------
-- Table `todos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `todos` ;
CREATE TABLE IF NOT EXISTS `todos` (
	`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`Titel` VARCHAR(32) NOT NULL,
	`Beschrijving` VARCHAR(1000) NOT NULL,
	`Status` ENUM('OPEN','GEANNULEERD','AFGEROND') NOT NULL DEFAULT 'OPEN',
	`LaatstGewijzigdOp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`ID`)
) 
ENGINE = InnoDB;


INSERT INTO `todos` (`Titel`,`Beschrijving`) VALUES
('Boodschappen halen', 'Niet vergeten om boodschappen te halen'),
('Huiswerk maken', 'Oefenen met nodejs, MySql en Git!'),
('Sporten', 'Ook belangrijk'),
('Naar de film', 'Die laatste goeie film nog kijken!');