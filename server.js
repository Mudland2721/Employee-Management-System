// DEPENDENCIES
const mysql = require("mysql");
const inquirer = require("inquirer");
const console_table = require("console.table");
const clear = require("console-clear");

//connection pretences 
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Emme2721",
    database: "employees_DB",
  });

  //Data base connection 
  connection.connect(function(err) {
    //check for an error 
    if (err) throw err;
  
    //log message to console if connect was successful 
    console.log("connected as id " + connection.threadId);
  
    //Once we are done connecting to the database end the connection (so people cannot get into it)
    connection.end();
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
}

//function for all emp
viewAll = () => {
    //show table in console then return to main menu
    let all = "SELECT * FROM employees_db.employee;"
    
}