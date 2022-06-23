const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("consoleTable");

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '1234',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database!`)
  );

