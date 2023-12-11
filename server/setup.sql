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
("product third", "descrip of third", 50, 10);

select * from product;


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