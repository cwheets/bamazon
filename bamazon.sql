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
VALUES("swiffer", "cleaning", 20, 60);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("full pig", "food", 200, 6);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("pinata", "home", 10, 5);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("computer", "electronics", 1,6000 );

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("rainer", "food", 20, 60);

-- INSERT INTO products(product_name,department_name,price,stock_quantity)
-- VALUES("swiffer", "cleaning", 20, 60);

-- INSERT INTO products(product_name,department_name,price,stock_quantity)
-- VALUES("swiffer", "cleaning", 20, 60);

-- INSERT INTO products(product_name,department_name,price,stock_quantity)
-- VALUES("swiffer", "cleaning", 20, 60);