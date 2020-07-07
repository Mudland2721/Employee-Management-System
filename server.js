// DEPENDENCIES
const mysql = require("mysql");
const inquirer = require("inquirer");
const console_table = require("console.table");
const revert = require("console-clear");
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
                employeeByManager();
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

            case 'Exit':
                //function for this ()
                exitConsole();
                break;
        }       
    })
} startSearch();

//function for all emp
viewAll = () => {
    //show table in console then return to main menu    
    connection.query(allQuery, function (err, res) {
      if (err) throw err;

      console.table(res);
      startSearch();
    });
  };

//function for kill app
  exitConsole = () => {
    revert;
    connection.end();
  };

//function for show all emp by managers 
employeeByManager = () => {
    //show table in console then return to main menu    
    connection.query("SELECT * FROM employee;", function (err, res) {
        //was running query and next line was mapping the query before query finished, i was running map on a query object -- so gave it callback

      if (err) throw err;

        let mangersSelection = (res.map(({id, first_name, last_name}) => ({

            name: first_name.concat(" ", last_name), 
            value: id,
    
        })));

        //  specific manager Id for follow up prompt
             let { userManagerId } = inquirer.prompt([
          {
            type: "list",
            message: "Which employee Manager would you like to view?",
            name: 'userManagerId',
            choices: mangersSelection
          }
          ]);
            let employees = connection.query(allQuery, + "WHERE role.id;", userManagerId);

      console.table(employees);

      startSearch();
    });
  };


