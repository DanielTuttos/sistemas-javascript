
CREATE DATABASE crudnodejs;
use crudnodejs;
CREATE TABLE customer(
    id INT(6), UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    telefono VARCHAR(10) NOT NULL
);

SHOW TABLES;

describe customer;