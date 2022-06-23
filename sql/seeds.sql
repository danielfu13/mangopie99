USE employee_db;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 70000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 200000, 7);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 150000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 100000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 300000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 500000, 13);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Billy", "Joe", 2, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ian", "Euiw", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Wally", "Doe", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Issac", "Cookies", 5, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sheo", "Kwai", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Glair", "Peeko", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Geralt", "Nam", 4, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Daicy", "Oz", 6, 2);