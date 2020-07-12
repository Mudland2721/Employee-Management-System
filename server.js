// DEPENDENCIES
const mysql = require("mysql");
const inquirer = require("inquirer");
const console_table = require("console.table");
const revert = require("console-clear");
const allQuery =
  'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name, concat(manager.first_name," ",manager.last_name) as manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee as manager on employee.manager_id = manager.id';
//connection pretences
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Emme2721",
  database: "employees_DB",
});

// async function options() {
//   await connection.query("SELECT * FROM role", function (err, res) {
//     if (err) throw err;
//     res.map(({ title, id }) => {
//       return {
//         name: title,
//         value: id,
//       };
//     });
//   });
// }

// start of app
function startSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like done?",
      choices: [
        "View all Employees",
        "View all Employees by Manager",
        "View all Employees by department",
        "Add Employee",
        "Add Employee role",
        "Add Employee department",
        "Exit",
      ],
    })
    .then(function (res) {
      switch (res.action) {
        case "View all Employees":
          viewAll();
          break;

        case "View all Employees by Manager":
          //function for this () ------------------
          employeeByManager();
          break;

        case "View all Employees by department":
          employeeByDepartment();
          break;

        case "Add Employee":
          //function for this ()
          addEmployee();
          break;

        case "Add Employee role":
          //function for this ()
          addRole();
          break;

        case "Add Employee department":
          //function for this ()
          addEmployeeDepartment();
          break;

        case "Exit":
          //function for this ()
          exitConsole();
          break;
      }
    });
}
startSearch();

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
// TypeError: Cannot convert object to primitive value -----------------------------------------------------------------------------------------------------
employeeByManager = () => {
  //show table in console then return to main menu
  connection.query("SELECT * FROM employee;", function (err, res) {
    if (err) throw err;
    let mangersSelection = res.map(({ id, first_name, last_name }) => ({
      name: first_name.concat(" ", last_name),
      value: id,
    }));
    //  specific manager Id for follow up prompt
    let { userManagerId } = inquirer
      .prompt([
        {
          type: "list",
          message: "Which employee Manager would you like to view?",
          name: "userManagerId",
          choices: mangersSelection,
        },
      ])
      .then(() => {
        //query for employee search
        let employees = connection.query(
          allQuery,
          +"WHERE role.id =?;",
          userManagerId
        );
        console.log("\n");
        console.table(employees);
        startSearch();
      });
  });
};
//function for displaying all employees by department
employeeByDepartment = () => {
  revert();

  connection.query("SELECT * FROM department;", function (err, res) {
    if (err) throw err;
    // console.log(res);
    let departmentArr = res.map((department) => {
      return {
        name: department.department_name,
        value: department.id,
      };
    });

    const departmentChoice = inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "Which department would you like to view?",
        choices: departmentArr,
      })
      .then((res, err) => {
        if (err) throw err;
        viewDepartment(res.action);
      });

    viewDepartment = (dep_id) => {
      connection.query(
        allQuery + " WHERE department.id = ?;",
        dep_id,
        function (err, res) {
          if (err) throw err;
          console.log("\n");
          console.table(res);
          console.log("\n");
          startSearch();
        }
      );
    };
  });
};

addEmployee = () => {
  revert();
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    let managerOptions = res.map(({ id, first_name, last_name }) => ({
      // name: first_name.concat(" ", last_name),
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    let options = connection.query("SELECT * FROM role", function (err, res) {
      if (err) throw err;

      res
        .map(({ title, id }) => {
          return {
            name: title,
            value: id,
          };
        })
        .then((role) => {
          return role;
        });
      connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;

        inquirer
          .prompt([
            {
              name: "first_name",
              message: "What is the employees first name?",
            },
            {
              name: "last_name",
              message: "What is the employees last name?",
            },
            {
              type: "list",
              message: "Whats the employees role here?",
              name: "role_id",
              choices: options,
            },
            {
              type: "list",
              message: "Who is this employees Manager?",
              name: "manager_id",
              choices: managerOptions,
            },
          ])
          .then((noobie) => {
            return (
              connection.query("INSERT INTO employee SET ?", noobie),
              connection.query(allQuery + ";"),
              console.log("\n"),
              console.table(noobie),
              console.log("\n"),
              startSearch()
            );
          });
      });
    });
  });
};

addRole = () => {
  revert();
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    //arr mapping
    let departmentSelection = res.map(({ id, department_name }) => ({
      name: department_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          name: "title",
          message: "What's the name of the role you'd like to add?",
        },
        {
          name: "salary",
          message: "What is the role's salary?",
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department is the role under?",
          choices: departmentSelection,
        },
      ])
      .then((answer) => {
        return connection.query("INSERT INTO role SET ?", answer);
      })
      .then(() => {
        return connection.query("SELECT * FROM role", function (err, res) {
          if (err) throw err;
          console.log("\n");
          console.table(res);
          startSearch();
        });
      });
  });
};

addEmployeeDepartment = () => {
  revert();
  inquirer
    .prompt({
      name: "department_name",
      message: "What is the new department?",
    })
    .then((department) => {
      console.log("\n");
      console.table(department);
      console.log("\n");
      startSearch();
    });
};
