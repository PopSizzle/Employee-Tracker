const inquirer = require("inquirer");
const mysql = require("mysql");
const ctable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",
    database: "employee_trackerDB"
});

connection.connect(function(err) {
    if(err) throw err;
    generateTable();
});

function generateTable(){
    const query = "SELECT * from employees";
    connection.query(query, function(err, res) {
        const values = [];
        for(i=0; i<res.length; i++){
            let obj = [];
            obj.push(res[i].first_name);
            obj.push(res[i].last_name);
            values.push(obj);
        }

        console.table(["First Name", "Last Name"], values);
    });
}