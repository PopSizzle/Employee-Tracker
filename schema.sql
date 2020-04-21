DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
) ENGINE=INNODB;

INSERT INTO department (name)
VALUES ("Engineering"),("Finance"), ("Legal");

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (50),
    salary INT (10),
    department_id INT,
    FOREIGN KEY (department_id) 
        REFERENCES department(id),
    PRIMARY KEY (id)
) ENGINE=INNODB;

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 110000, 1), ("Lead Engineer", 160000, 1),("Accountant", 80000, 2),("Finance Executive", 120000, 2),("Lawyer", 90000, 3),("Legal Team Lead", 150000, 3);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  manager_id INT,
  role_id INT,
  FOREIGN KEY (role_id) 
    REFERENCES role(id),
  PRIMARY KEY (id)
);

INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUES ("John", "Smith", NULL, 2),("Jane", "Doe", 1, 1),("Alejandro", "Alvarez", NULL, 4),("Jessica", "Simpson", 3, 3),("Alicia", "Spinner", NULL, 6),("Lisa", "Hernandez", 5, 5);



