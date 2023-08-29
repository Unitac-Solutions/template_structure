const db = require("../database/db");
const getAllEmployes = async () => {
    const rows =  await  db.query("SELECT * From employees")
    .catch(err => console.log(err))
    return rows;
} 

const getEmployebyId = async (id) => {
    const [row] =  await  db.query("SELECT * From employees WHERE id = ?",[id])
    .catch(err => console.log(err))
    return row;
} 

const deleteEmployebyId = async (id) => {
    const [{affectedRows}] =  await  db.query("DELETE From employees WHERE id = ?",[id])
    .catch(err => console.log(err))
    return affectedRows;
} 

const createEmployee = async (obj , id = 0) => {
    const [data] =  await  db.query(`INSERT INTO employees(
        name, employee_code, salary
    ) VALUES(?,?,?)`,
     [obj.name, obj.employee_code, obj.salary])
    .catch(err => console.log(err))
    return data;
} 

const editEmployee = async (obj , id ) => {
    const [data] =  await  db.query(`UPDATE employees
    SET name = ?,
    employee_code = ?,
    salary = ?
    WHERE id = ? `,
     [obj.name, obj.employee_code, obj.salary, id])
    .catch(err => console.log(err))
    return data;
} 

module.exports = {getAllEmployes, getEmployebyId, createEmployee, editEmployee, deleteEmployebyId}