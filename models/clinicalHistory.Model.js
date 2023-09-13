const db = require("../database/db");

module.exports.getclinical_historys = async () => {
    const [rows] =  await  db.query("SELECT * From clinical_history")
    .catch(err => console.log(err))
    return rows;
} 

module.exports.getclinical_history = async (id) => {
    const [row] =  await  db.query("SELECT * From clinical_history WHERE clinical_id = ?",[id])
    .catch(err => console.log(err))
    return row;
} 

module.exports.deleteclinical_history = async (id) => {
    const [{affectedRows}] =  await  db.query("DELETE From clinical_history WHERE clinical_id = ?",[id])
    .catch(err => console.log(err))
    return affectedRows;
} 

module.exports.createclinical_history = async (obj , id = 0) => {
    const [data] =  await  db.query(`INSERT INTO clinical_history(
        history, med_condition, medication, surgery, allergy, created_by
    ) VALUES(?,?,?,?,?,?)`,
    [obj.history, obj.med_condition, obj.medication, obj.surgery, obj.allergy,obj.userInfo.user_id])
    .catch(err => console.log(err))
    return data;
} 

module.exports.updateclinical_history = async (obj , id ) => {
    const [data] =  await  db.query(`UPDATE clinical_history
    SET history = ?, 
    med_condition = ?, 
    medication = ?, 
    surgery = ?, 
    allergy = ?
    WHERE clinical_id = ? `,
     [obj.history, obj.med_condition, obj.medication, obj.surgery, obj.allergy, id])
    .catch(err => console.log(err))
    return data;
} 