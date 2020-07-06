USE employees_DB;
INSERT INTO department
    (department_name)
VALUES
    ("Management"),
    ("Engineering"),
    ("VPs"),
    ("Sales"),
    ("Asset");
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("CEO", 200000, 1),
    ("VP Of Business", 125000, 1),
    ("VP Of Marketing", 95000, 2),
    ("VP Of Asset Development", 75000, 2),
    ("VP Of Operations", 70000, 3),
    ("Chief Quality Officer", 80000, 1),
    ("Software Devlopment Chair", 55000, 3),
    ("Sales Head", 75000, 4),
    ("Asset Manager", 65000, 5);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Andrew", "Weathers", 1, 1),
    ("Jake", "St.Pierre", 2, 1),
    ("Jorge", "Navaro", 3, 1),
    ("Chance", "Wright", 4, 3),
    ("Devon", "Hollond", 5, 2),
    ("Matt", "Morris", 6, 2),
    ("Chris", "Lucci", 7, 6),
    ("Mason", "Morey", 9 , 2),
    ("John", "Smith", 8, 6);
SELECT *
FROM employees_db.employee;

