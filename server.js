const inquirer = require("inquirer");
const mysql = require("mysql");
const ctable = require("console.table");
const allRoles = [];
const managers = [];
const managerIds = [];
const employees = [];

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",
    database: "employee_trackerDB"
});

connection.connect(function(err) {
    if(err) throw err;
    // welcome();
    populateEmployees();
});

function generateTable(){
    let query = "SELECT employees.id, employees.first_name, employees.last_name, employees.role_id, role.id, role.title, role.salary, department.name ";
    query += "FROM employees LEFT JOIN role ON (employees.role_id = role.id) LEFT JOIN department ON (role.department_id = department.id)";
    connection.query(query, function(err, res) {
        const values = [];
        for(i=0; i<res.length; i++){
            let obj = [];
            obj.push(res[i].id);
            obj.push(res[i].first_name);
            obj.push(res[i].last_name);
            obj.push(res[i].title);
            obj.push(res[i].salary);
            obj.push(res[i].name)
            values.push(obj);
        }
        console.table("\n------------------------------------------")
        console.table(["ID","First Name", "Last Name", "Title", "Salary", "Department"], values);
        console.log("-----------------------------------");
        console.log("Use the arrows to continue navigating the menu");
    });
}

function welcome(){
    console.log("Welcome to the Employee Tracking App!");
    console.log("---------------------------------------");
    mainMenu();
}

function mainMenu() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "menuChoice",
            choices: [
                "Edit employees",
                "Edit employee roles",
                "Edit departments",
                "View company records",
                "Exit"
            ]
        }
    ]).then(function(data){
        switch(data.menuChoice) {
            case "Edit employees":
                editEmployees();
                break;
            case "Edit employee roles":
                editRoles();
                break;
            case "Edit departments":
                editDepts();
                break;
            case "View company records":
                generateTable();
                mainMenu();
                break;
            default:
                connection.end(console.log("Thank you have a good day!"));
        }
    })
}

function editEmployees() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to edit in the employee database?",
            name: "employeeChoice",
            choices: [
                "Add an employee",
                "Delete an employee",
                "Return to the main menu",
                "Exit"
            ]
        }
    ]).then(function(data){
        switch(data.employeeChoice) {
            case "Add an employee":
                addEmployee();
                break;
            case "Delete an employee":
                deleteEmployee();
                break;
            case "Return to the main menu":
                mainMenu();
                break;
            default:
                connection.end(console.log("Thank you have a good day!"));
        }
    })
}

function addEmployee(){
    populateRoles();
    populateManagers();
    populateEmployees();
    inquirer.prompt([
        {
            type: "input",
            message: "What is the first name of your new employee?",
            name: "firstName"
        },
        {
            type: "Input",
            message: "What is the last name of your new employee?",
            name: "lastName"
        },
        {
            type: "list",
            message: "What is your new employee's role?",
            name: "role",
            choices: allRoles
        },
        {
            type: "list",
            message: "Who is your new employer's manager?",
            name: "manager",
            choices: managers
        }
    ]).then(function(data) {
        
    })
}

function populateRoles() {
    
    connection.query("SELECT role.title FROM role", function(err, res) {
        if (err) throw err;
        for(var i=0; i<res.length; i++){
            allRoles.push(res[i].title);
        }
    })
}

function populateManagers(){

    connection.query("SELECT employees.first_name, employees.last_name, employees.manager_id, employees.id FROM employees", function(err, res) {
        if (err) throw err;

        for(var i=0; i<res.length; i++){
            if(res[i].manager_id === null){
                let name = "";
                name += res[i].first_name + " ";
                name+= res[i].last_name;
                managers.push(name);
                managerIds.push(res[i].id);
            }
        }
        // console.log(managers);
        // console.log(managerIds);
    })
}

function populateEmployees() {

    connection.query("SELECT employees.first_name, employees.last_name FROM employees", function(err, res) {
        if (err) throw err;

        for(var i=0; i<res.length; i++){
            let name = "";
            name += res[i].first_name + " ";
            name+= res[i].last_name;
            employees.push(name);
        }
        // console.log(employees);
        console.log(employees.length);
    });    
}
