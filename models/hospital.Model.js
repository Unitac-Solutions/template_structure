const db = require("../database/db");

module.exports.getHospitals = async () => {
    const [rows] =  await  db.query("SELECT * From hospital")
    .catch(err => console.log(err))
    return rows;
} 

module.exports.getHospital = async (id) => {
    const [row] =  await  db.query("SELECT * From hospital WHERE hospital_id = ?",[id])
    .catch(err => console.log(err))
    return row;
}

module.exports.createHospital = async (obj , id = 0) => {
    const [data] =  await  db.query(`INSERT INTO hospital(
        anticipated_care_id, comment_detail_id, personel_id, handover_id
    ) VALUES(?,?,?,?)`,
    [obj.anticipated_care_id, obj.comment_detail_id, obj.personel_id, obj.handover_id])
    .catch(err => console.log(err))
    return data;
}

module.exports.deleteHospital = async (id) => {
    const [{affectedRows}] =  await  db.query("DELETE From hospital WHERE hospital_id = ?",[id])
    .catch(err => console.log(err))
    return affectedRows;
} 

//Currently no update value can be edited except if you asigning anticipated cares by new hospitals so currently it is a comment

module.exports.updateHospital = async (obj , id ) => {
    const [data] =  await  db.query(`UPDATE hospital
    SET anticipated_care_id = ?,
    comment_detail_id = ?,	
    personel_id = ?,	
    handover_id	= ?
    WHERE hospital_id = ? `,
     [obj.anticipated_care_id, obj.comment_detail_id, obj.personel_id, obj.handover_id, id])
    .catch(err => console.log(err))
    return data;
}