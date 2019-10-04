DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(40) NOT NULL,
    department_name VARCHAR(40) NOT NULL,
    price INT(50) NOT NULL,
    stock_quantity INT(60) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("dragon scale", "smithing", 20, 60);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("newt eye", "alchemy", 5, 600);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("vampire teeth", "alchemy", 300, 5);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("anvil", "smithing", 6000, 1);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("16pk rainer", "food", 10, 1000);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("potion pouch", "adventuring", 80, 40);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("big sword", "adventuring", 500, 10);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("wand'o random fx", "???", 3000, 2);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("traders eye glass", "shopkeeping", 100, 10);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("stick", "adventuring?", 1, 10000);

