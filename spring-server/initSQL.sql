DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS products;
CREATE TABLE transactions(id serial PRIMARY KEY, itemid INTEGER, date VARCHAR(255), prize INTEGER);
CREATE TABLE products(itemid INTEGER PRIMARY KEY, name VARCHAR(255), prize INTEGER);
DROP SEQUENCE IF EXISTS hibernate_sequence;
CREATE SEQUENCE hibernate_sequence START 1;