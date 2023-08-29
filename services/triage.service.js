const db = require("../database/db");

module.exports.getSpecialists = async () => {
    const rows =  await  db.query("SELECT * From triage")
    .catch(err => console.log(err))
    return rows;
} 

module.exports.getSpecialist = async (id) => {
    const [row] =  await  db.query("SELECT * From triage WHERE triage_id = ?",[id])
    .catch(err => console.log(err))
    return row;
} 

module.exports.deleteSpecialistbyId = async (id) => {
    const [{affectedRows}] =  await  db.query("DELETE From triage WHERE triage_id = ?",[id])
    .catch(err => console.log(err))
    return affectedRows;
} 

module.exports.createSpecialist = async (obj , id = 0) => {
    const [data] =  await  db.query(`INSERT INTO triage(
        tew_id, user_type, branch, username, email, user_reg, street_name, city_town, province, postal_code
    ) VALUES(?,?,?,?,?,?,?,?,?)`,
    [obj.tew_id, obj.user_type, obj.branch, obj.username, obj.email, obj.user_reg, obj.street_name, obj.city_town, obj.province, obj.postal_code])
    .catch(err => console.log(err))
    return data;
} 

module.exports.updateSpecialist = async (obj , id ) => {
    const [data] =  await  db.query(`UPDATE anticipated_specialist
    SET user_type  = ?, 
    branch  = ?, 
    username  = ?, 
    email  = ?, 
    user_reg  = ?, 
    street_name  = ?, 
    city_town  = ?, 
    province  = ?, 
    postal_code = ?
    WHERE triage_id = ? `,
     [obj.user_type, obj.branch, obj.username, obj.email, obj.user_reg, obj.street_name, obj.city_town, obj.province, obj.postal_code, id])
    .catch(err => console.log(err))
    return data;
} 