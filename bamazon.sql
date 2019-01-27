DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    stock_quanity INT default 0,
    primary key(item_id)
   
);

-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("socks", "clothes", 5, 100);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Pride and Prejuidice", "book", 35, 10);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("pencil", "stationary", 35, 100);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Tungsten rice cooker", "kitchen", 100, 20);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("laptop cover", "electronic accesories", 35, 15);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("iMac Pro", "electroincs", 2500, 10);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Allegro busineses bag", "accesories", 55, 10);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Mitsubishi Dish Dryer", "kitchen", 135, 15);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("All Clad Food Processor", "kitchen", 999, 20);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Persol glasses", "eyewear", 350, 15);