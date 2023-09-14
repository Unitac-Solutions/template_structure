const db = require("../database/db");

//________________________________________________________________________________________________GETING ALL PATIENTS
module.exports.getPatients = async () => {
    const [rows] =  await  db.query("SELECT * From patient")
    .catch(err => console.log(err))
    return rows;
} 

//________________________________________________________________________________________________GETING SINGLE PATIENT
module.exports.getPatient = async (id) => {
    const [row] =  await  db.query("SELECT * From patient WHERE patient_id = ?",[id])
    .catch(err => console.log(err))
    return row;
}

//________________________________________________________________________________________________CREATING SINGLE PATIENT
//___ERROR(Cannot insert a patient information because has forein key constrainst which is has to do with CONSTRAINT `triage` FOREIGN KEY (`triage_id`)
//Here I am also including the triage_id because of the above error while excluding it that the user would have 
module.exports.createPatient = async (obj , id = 0) => {
    const data =  await  db.query(`INSERT INTO patient(
        last_name, first_name, Initials, age, gender, race, triage_id,created_by,med_aid_id
    ) VALUES(?,?,?,?,?,?,?,?,?)`,
    [obj.last_name, obj.first_name, obj.Initials, obj.age, obj.gender, obj.race, obj.triage_id,  obj.userInfo.user_id,obj.med_aid_id])
    .catch(err => console.log(err))
    return data;
}

//________________________________________________________________________________________________DELETING SINGLE PATIENT
module.exports.deletePatient = async (id) => {
    const [{affectedRows}] =  await  db.query("DELETE From patient WHERE patient_id = ?",[id])
    .catch(err => console.log(err))
    return affectedRows;
} 

//________________________________________________________________________________________________UPDATING SINGLE PATIENT
module.exports.updatePatient = async (obj , id ) => {
    const [data] =  await  db.query(`UPDATE patient
    SET last_name = ?,
    first_name = ?,
    Initials = ?,
    age = ?,
    gender = ?,
    race = ?
    WHERE patient_id = ? `,
     [obj.last_name, obj.first_name, obj.Initials, obj.age, obj.gender, obj.race, id])
    .catch(err => console.log(err))
    return data;
}