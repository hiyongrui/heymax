DROP DATABASE IF EXISTS heymaxDB;
CREATE DATABASE heymaxDB;
use heymaxDB;

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `productID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `price` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`productID`)
);

insert into product (name, description, price, quantity) values
("product first", "descrip of first", 80, 5), 
("product sec", "descrip of sec", 10, 3), 
("product third", "descrip of third", 100, 6), 
("product fourth", "descrip of four", 50, 9), 
("product five", "descrip of five", 40, 3), 
("product six", "descrip of six", 60, 5), 
("product seven", "descrip of seven", 80, 3),
("product eight", "descrip of eight", 10, 2),
("product nine", "descrip of nine", 20, 10),
("product ten", "descrip of ten", 30, 20);


select * from product;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phoneNumber` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`userID`)
);

insert into user (name, address, email, phoneNumber, role) values
("james", 'Company1', "james@gmail.com", "81234567", "User"),
("tom", 'Company2', "tom@gmail.com", "91234567", "Admin"),
("jenny", 'Company3', "jenny@gmail.com", "81234568", "User"),
("mary", 'Company4', "mary@gmail.com", "91234568", "Admin");

select * from user;

DROP TABLE IF EXISTS `orderTable`;

CREATE TABLE `orderTable` (
  `orderID` int NOT NULL AUTO_INCREMENT,
  `totalPrice` int NOT NULL,
  `address` varchar(45) NOT NULL,
  `userID` int NOT NULL,
  PRIMARY KEY (`orderID`),
  FOREIGN KEY (`userID`) REFERENCES User(`userID`)
);

select * from orderTable;