const db = require("../database/db");

module.exports.getClinical_details = async () => {
    const rows =  await  db.query("SELECT * From clinical_detail")
    .catch(err => console.log(err))
    return rows;
} 

module.exports.getClinical_detail = async (id) => {
    const [row] =  await  db.query("SELECT * From clinical_detail WHERE clinical_detail_id = ?",[id])
    .catch(err => console.log(err))
    return row;
}

module.exports.createClinical_detail = async (obj , id = 0) => {
    const [data] =  await  db.query(`INSERT INTO clinical_detail(
        systematic_id, general_examination_id, vital_examination_id, management_id
    ) VALUES(?,?,?,?)`,
    [obj.systematic_id, obj.general_examination_id, obj.vital_examination_id, obj.management_id])
    .catch(err => console.log(err))
    return data;
}

module.exports.deleteClinical_detail = async (id) => {
    const [{affectedRows}] =  await  db.query("DELETE From clinical_detail WHERE clinical_detail_id = ?",[id])
    .catch(err => console.log(err))
    return affectedRows;
} 


//Currently no update value can be edited except if you asigning anticipated cares by new Clinical_details so currently it is a comment
/*
module.exports.updateClinical_detail = async (obj , id ) => {
    const [data] =  await  db.query(`UPDATE clinical_detail
    SET [FILL SOMETHING] = ?,
    WHERE clinical_detail_id = ? `,
     [obj.[FILL SOMETHING], id])
    .catch(err => console.log(err))
    return data;
}*/