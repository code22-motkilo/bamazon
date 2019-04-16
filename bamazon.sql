/*  
BAMAZON DATABASE 

1. Create a MySQL Database called `bamazon`.

2. Then create a Table inside of that database called `products`.

3. The products table should have each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

*/

# DROP DATABASE IF EXISTS bamazon;
# CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price INT(10) default 0,
    stock_quantity INT(10) default 0 ,
    PRIMARY KEY(id)

);

SELECT * FROM products;

/*  
4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

*/

USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("twin fin", "outdoors", 900, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("single fin", "outdoors", 1000, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("SUP", "outdoors", 1500, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("guitar", "music", 2000, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("amplifier", "music", 500, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("t-shirt", "clothing", 20, 10000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("shorts", "clothing", 20, 10000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("hats", "clothing", 10, 10000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("pizza", "food", 15, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("beer", "food", 1, 1000000);


SELECT * FROM products;

