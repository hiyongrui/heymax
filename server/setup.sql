DROP DATABASE IF EXISTS heymaxDB;
CREATE DATABASE heymaxDB;
use heymaxDB;

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `productID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`productID`)
);

insert into product (name, description, price) values
("product first", "descrip of first", 80), 
("product sec", "descrip of sec", 10), 
("product third", "descrip of third", 50);

select * from product;