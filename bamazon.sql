DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    item_id INT(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(40),
    department_name VARCHAR(40),
    price INT(10),
    stock_quantity INT(10),
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('shoes', 'clothing', 38, 176),
('Wide Sargasso Sea', 'books', 12, 36),
('blanket', 'home goods', 60, 15),
('whisk', 'home goods', 4, 162),
('scissors', 'office supplies', 6, 58),
('band-aids', 'health', 5, 367),
('The Bell Jar', 'books', 18, 64),
('boot-cut jeans', 'clothing', 40, 267),
('candle', 'home goods', 50, 4),
('laptop', 'technology', 650, 140);

SELECT * FROM products;