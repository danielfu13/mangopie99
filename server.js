const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("consoleTable");
// const Connection = require("mysql2/typings/mysql/lib/Connection");

var chooseRole = [];
var chooseManager = [];
var chooseDepart = [];

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '1234',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database!`)
  );

db.connect((err) => {
  if (err) throw err;

  chooseFunction();
})

function chooseFunction() {
  inquirer
  .prompt({
    type: "list",
    name: "function",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role"
    ]
  })
  .then(function(answer) {
    console.log(answer);
  
  if (answer.selection === "View all departments") {
    viewDepart();
  }
  else if(answer.selection === "View all roles") {
    viewRole();

  } 
  else if(answer.selection === "View all employees") {
    viewEmployee();

  }
  else if(answer.selection === "Add a department") {
    addDepart();

  }
  else if(answer.selection === "Add a role") {
    addRole();

  }
  else if(answer.selection === "Add an employee") {
    addEmployee();

  }
  else if(answer.selection === "Update an employee role") {
    updateRole();

  }
  else{
    connection.end();
  }
});
}

function viewDepart() {
  db.query (
    "SELECT * FROM department", 
    function(err, results, fields) {
      if (err) throw err;
      console.table(result);
      runSearch();
    }
  );
};

function viewRole() {
  db.query (
    "SELECT role.id, role.title, role.salary, role.department_id, department.id, department.name FROM role LEFT JOIN department on role.department_id = department.id",
    function(err, result, fields) {
      if (err) throw err;
      console.table(result);
      runSearch(); 
    }
  );
};

function viewEmployee() {
  db.query (
    "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title, role.salary, role.id, department.id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id", 
    function(err, result, fields) {
      if (err) throw err;
      console.table(result);
      runSearch(); 
    }
  );
};

function lookuprole(){  
  db.query("SELECT * FROM role", function (err, data) {
    if (err) throw err;
    for (i = 0; i < data.length; i++) {
      chooseRole.push(data[i].id + "-" + data[i].title)
    }
  })
}

function lookupEmployee(){  
  db.query("SELECT * FROM employee", function (err, data) {
    if (err) throw err;
    for (i = 0; i < data.length; i++) {
      chooseManager.push(data[i].id + "-" + data[i].first_name+" "+ data[i].last_name)
    }
  }) 
}

function lookupDepts(){
  db.query("SELECT * FROM department", function (err, data) {
    if (err) throw err;
    for (i = 0; i < data.length; i++) {
      chooseDepart.push(data[i].id + "-" + data[i].name)
    }
  })
}

function addDepart() {

  lookuprole()
  lookupEmployee()
  lookupDepts()
  
  inquirer.prompt([
  {
    name: "dept",
    type: "input",
    message: "Enter the department you would like to add:"
  }
  ]).then(function(answer) {
    var query = 
    `INSERT INTO department (name)
     VALUES ('${answer.dept}')`;
    db.query(query, function(err, res) {
      console.log(`-------new department added: ${answer.dept}-------`)
    });
    runSearch();
  });
  };

function addRole() {

  lookuprole()
  lookupEmployee()
  lookupDepts()
  
  inquirer.prompt([
  {
    name: "role",
    type: "input",
    message: "Which role would you like to add?"
  },
  
  {
    name: "depart",
    type: "list",
    message: "which department would you like to add this role?",
    choices: chooseDepart
  },
  
  {
    name: "salary",
    type: "number",
    message: "What is the role's salary?"
  },
  
   ]).then(function(answer) {
     console.log(`${answer.role}`)
    var getDeptId =answer.dept.split("-")
    var query = 
    `INSERT INTO role (title, salary, department_id)
     VALUES ('${answer.role}','${answer.salary}','${getDeptId[0]}')`;
    db.query(query, function(err, res) {
      console.log(`<br>-----new role ${answer.role} added!------`)
    });
    runSearch();
  });
};


function addEmployee() {

  lookuprole()
  lookupEmployee()

  inquirer.prompt([
  {
    name: "firstname",
    type: "input",
    message: "What is the employee's first name?"
  },

  {
    name: "lastname",
    type: "input",
    message: "What is the employee's last name?"
  },

  {
    name: "role",
    type: "list",
    message: "What is the employee's role?",
    choices: chooseRole 
  },

  {
    name: "employeemanager",
    type: "list",
    message: "Who is the employee's manager?",
    choices: chooseManager
  }
  
  ]).then(function(answer) {
    var getRoleId =answer.role.split("-")
    var getReportingToId=answer.reportingTo.split("-")
    var query = 
    `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ('${answer.firstname}','${answer.lastname}','${getRoleId[0]}','${getReportingToId[0]}')`;
  db.query(query, function(err, res) {
    console.log(`new employee ${answer.firstname} ${answer.lastname} added!`)
    });
    runSearch();
  });
};


function updateRole() {
  connection.query('SELECT * FROM employee', function (err, result) {
    if (err) throw (err);
    inquirer
      .prompt([
        {
          name: "employeeName",
          type: "list",

          message: "Which employee's role is changing?",
          choices: function () {
          var employeeArray = [];
            result.forEach(result => {
              employeeArray.push(
                result.last_name
            );
          })
          return employeeArray;
        }
      }
    ])
 
    .then(function (answer) {
      console.log(answer);
      const name = answer.employeeName;
    
      db.query("SELECT * FROM role", function (err, res) {
        inquirer
          .prompt([
            {
              name: "role",
              type: "list",
              message: "What is their new role?",
              choices: function () {
                var roleArray = [];
                res.forEach(res => {
                  roleArray.push(
                    res.title)
                })
                return roleArray;
              }
            }
          ]).then(function (roleAnswer) {
            const role = roleAnswer.role;
            console.log(role);
            db.query('SELECT * FROM role WHERE title = ?', [role], function (err, res) {
              if (err) throw (err);
              let roleId = res[0].id;
 
              let query = "UPDATE employee SET role_id = ? WHERE last_name =  ?";
              let values = [parseInt(roleId), name]
      
              db.query(query, values,
                function (err, res, fields) {
                  console.log(`You have updated ${name}'s role to ${role}.`)
                })
              viewAll();
            })
          })
        } 
      )
    })
  })
};
