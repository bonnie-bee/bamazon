const mysql = require("mysql");
const inquirer = require("inquirer");
const keys = require('./keys.js');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: mysqlPW,
    database: "bamazon"
});

connection.connect(function (err) {
    
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.end();

});