const db = require("../database/db");

module.exports.getAnticipatedCares = async () => {
    const rows =  await  db.query("SELECT * From anticipated_care")
    .catch(err => console.log(err))
    return rows;
} 

module.exports.getAnticipatedCare = async (id) => {
    const [row] =  await  db.query("SELECT * From anticipated_care WHERE anticipated_care_id = ?",[id])
    .catch(err => console.log(err))
    return row;
}

module.exports.createAnticipatedCare = async (obj , id = 0) => {//adding most required fields of the table
    const [data] =  await  db.query(`INSERT INTO patients(
        anticipated_specialist_id, airway_and_breathing, circulation, drugs, airway_and_breathing_specify, circulation_specify, drugs_specify
    ) VALUES(?,?,?,?,?,?,?)`,
    [obj.anticipated_specialist_id, obj.airway_and_breathing, obj.circulation, obj.drugs, obj.airway_and_breathing_specify, obj.circulation_specify, obj.drugs_specify])
    .catch(err => console.log(err))
    return data;
}

module.exports.deleteAnticipatedCare = async (id) => {
    const [{affectedRows}] =  await  db.query("DELETE From anticipated_care WHERE anticipated_care_id = ?",[id])
    .catch(err => console.log(err))
    return affectedRows;
}

module.exports.updateAnticipatedCare = async (obj , id ) => {//updating also those that are ready
    const [data] =  await  db.query(`UPDATE anticipated_care
    SET anticipated_specialist_id = ?, 
    airway_and_breathing = ?,
    circulation = ?,
    drugs = ?,
    airway_and_breathing_specify = ?,
    circulation_specify = ?,
    drugs_specify = ?,
    WHERE anticipated_care_id = ? `,
     [obj.airway_and_breathing, obj.circulation, obj.drugs, obj.airway_and_breathing_specify, obj.circulation_specify, obj.drugs_specify, id])
    .catch(err => console.log(err))
    return data;
}