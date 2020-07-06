// DEPENDENCIES
const mysql = require("mysql");
const inquirer = require("inquirer");
const console_table = require("console.table");
const clear = require("console-clear");
const allQuery = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name, concat(manager.first_name," ",manager.last_name) as manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee as manager on employee.manager_id = manager.id';
//connection pretences 
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Emme2721",
    database: "employees_DB",
  });

// start of app
function startSearch() {
    inquirer.
    prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like done?',
        choices: [
            'View all Employees',
            'View all Employees by Manager',
            'View all Employees by department',
            'Add Employee',
            'Add Employee role',
            'Add Employee department',
            'Exit',
        ],
    }).then(function(res) {
        switch (res.action) {
            case 'View all Employees':
                //function for this ()
                viewAll();
                break;

            case 'View all Employees by Manager':
                //function for this ()
                break;

            case 'View all Employees by department':
                //function for this ()
                break;
            
            case 'Add Employee':
                //function for this ()
                break;

            case 'Add Employee role':
                //function for this ()
                break;

            case 'Add Employee department':
                //function for this ()
                break;
        }       
    })
} startSearch();

//function for all emp
viewAll = () => {
    //show table in console then return to main menu
    // console.log("viewAll occurred");
    
    connection.query(allQuery, function (err, res) {
      if (err) throw err;
      console.log('OH LORD------------------------------', res);

      console.table(res);
      startSearch();
    });
  };
