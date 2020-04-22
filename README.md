# Employee-Tracker

## Overview

Employee-Tracker is an SQL system for tracking and managing employees, departments, and roles. It is run out of the command line using node.js. Employee-tracker allows the user to view, add, and change employees, roles, and departments inside of a database.


### Table of Contents

* Installation and Usage
* Dependencies and Code Snippet
* Sample Team Table
* Languages Used
* Authors
* License
* Acknowledgements

## Insatallation and Usage

Employee-tracker will function from the command line for anybody who has the necessary dependencies installed and runs 'node server.js' from the command line. They can then follow the prompts and access the system.

## Dependencies and Code Snippet

Employee-tracker has the following dependencies:

npm inquirer
npm mysql
npm console.table

To install inquirer, a user simply needs to type 'npm install inquirer' in the command line. Then do the same for both mysql and console.table.

Here is an example of the code used for displaying the table of employees, including a snippet of raw sql code that is submitted to the database:

```
    let query = "SELECT employees.employee_id, employees.first_name, employees.last_name, employees.role_id, role.role_id, role.title, role.salary, department.name ";
    query += "FROM employees LEFT JOIN role ON (employees.role_id = role.role_id) LEFT JOIN department ON (role.department_id = department.department_id)";
    connection.query(query, function(err, res) {
        if (err) throw err;
        const values = [];
        
        for(i=0; i<res.length; i++){
            let obj = [];
            obj.push(res[i].employee_id);
            obj.push(res[i].first_name);
            obj.push(res[i].last_name);
            obj.push(res[i].title);
            obj.push(res[i].salary);
            obj.push(res[i].name)
            values.push(obj);
        }
        console.table("\n------------------------------------------")
        console.table(["ID","First Name", "Last Name", "Title", "Salary", "Department"], values);
```

### Sample Team Table

Here is an example of a table that was generated using Employee-Tracker:

![](/Assets/EmployeeTable.png)


## Languages Used

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Authors

* Sam Poppe 

- [Link to Github](https://github.com/PopSizzle)
- [Link to LinkedIn](https://www.linkedin.com/in/sam-poppe-623281193/)

## License

This project is licensed under the MIT License 

## Acknowledgments

* Shout out to my teacher Jerome Chenetter and my TAS Kerwin Hy and Mahisha Gunasekaran for teaching me all the skills needed for this project.