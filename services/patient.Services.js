const db = require("../database/db");

module.exports.getAllPatients = async () => {
    const rows =  await  db.query("SELECT * From patients")
    .catch(err => console.log(err))
    return rows;
} 

module.exports.getPatient = async (id) => {
    const [row] =  await  db.query("SELECT * From patients WHERE id = ?",[id])
    .catch(err => console.log(err))
    return row;
} 

module.exports.deletePatientbyId = async (id) => {
    const [{affectedRows}] =  await  db.query("DELETE From patients WHERE id = ?",[id])
    .catch(err => console.log(err))
    return affectedRows;
} 

module.exports.createPatient = async (obj , id = 0) => {
    const [data] =  await  db.query(`INSERT INTO patients(
        username, email, password
    ) VALUES(?,?,?)`,
    [obj.username, obj.email, obj.password, id])
    .catch(err => console.log(err))
    return data;
} 

module.exports.editPatient = async (obj , id ) => {
    const [data] =  await  db.query(`UPDATE patients
    SET name = ?,
    username = ?,
    email = ?,
    password = ?
    WHERE id = ? `,
     [obj.username, obj.email, obj.password, id])
    .catch(err => console.log(err))
    return data;
} 