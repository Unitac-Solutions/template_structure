const db = require("../database/db");

module.exports.getCases = async () => {
    const [rows] =  await  db.query("SELECT * FROM patient_case")
    .catch(err => console.log(err))
    return rows;
} 

module.exports.getCase = async (id) => {
    const [row] =  await  db.query("SELECT * From patient_case WHERE patient_id = ?",[id])
    .catch(err => console.log(err))
    return row;
} 

module.exports.deleteCase = async (id) => {
    const [{affectedRows}] =  await  db.query("DELETE From patient_case WHERE patient_id = ?",[id])
    .catch(err => console.log(err))
    return affectedRows;
} 

module.exports.createCase = async (obj , id = 0) => {
    const [data] =  await  db.query(`INSERT INTO patient_case(
        patient_id, open_case, incident_id, clinical_id, hospital_id, clinical_detail_id	
    ) VALUES(?,?,?,?,?,?)`,
    [obj.patient_id, obj.open_case, obj.incident_id, obj.clinical_id, obj.hospital_id, obj.clinical_detail_id])
    .catch(err => console.log(err))
    return data;
} 

module.exports.updateCase = async (obj , id ) => {
    const [data] =  await  db.query(`UPDATE patient_case
    SET open_case = ?
    WHERE patient_id = ? `,
    [obj.open_case, id])
    .catch(err => console.log(err))
    return data;
} 