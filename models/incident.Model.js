const db = require("../database/db");

module.exports.getincidents = async () => {
    const rows =  await  db.query("SELECT * From incident")
    .catch(err => console.log(err))
    return rows;
} 

module.exports.getincident = async (id) => {
    const [row] =  await  db.query("SELECT * From incident WHERE incident_id = ?",[id])
    .catch(err => console.log(err))
    return row;
} 

module.exports.deleteincident = async (id) => {
    const [{affectedRows}] =  await  db.query("DELETE From incident WHERE incident_id = ?",[id])
    .catch(err => console.log(err))
    return affectedRows;
} 

module.exports.createincident = async (obj , id = 0) => {
    const [data] =  await  db.query(`INSERT INTO incident(
        trauma, location, dispatch_priority, trauma_specification, medical, medical_specification
    ) VALUES(?,?,?,?,?,?)`,
    [obj.trauma, obj.location, obj.dispatch_priority, obj.trauma_specification, obj.medical, obj.medical_specification, id])
    .catch(err => console.log(err))
    return data;
} 

module.exports.updateincident = async (obj , id ) => {
    const [data] =  await  db.query(`UPDATE incident
    SET trauma = ?, 
    location = ?, 
    dispatch_priority = ?, 
    trauma_specification = ?, 
    medical = ?, 
    medical_specification = ?
    WHERE incident_id = ? `,
    [obj.trauma, obj.location, obj.dispatch_priority, obj.trauma_specification, obj.medical, obj.medical_specification, id])
    .catch(err => console.log(err))
    return data;
} 