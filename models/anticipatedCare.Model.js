const db = require("../database/db");

module.exports.getAnticipatedCares = async () => {
    const [rows] =  await  db.query("SELECT * From anticipated_care")
    .catch(err => console.log(err))
    return rows;
} 

module.exports.getAnticipatedCare = async (id) => {
    const [row] =  await  db.query("SELECT * From anticipated_care WHERE anticipated_care_id = ?",[id])
    .catch(err => console.log(err))
    return row;
}

module.exports.createAnticipatedCare = async (obj, id = 0) => {
    const [data] = await db.query(
      `INSERT INTO anticipated_care(
          anticipated_specialist_id, airway_and_breathing, circulation, drugs, airway_and_breathing_specify, circulation_specify, drugs_specify, created_by
      ) VALUES(?,?,?,?,?,?,?,?)`,
      [
        obj.anticipated_specialist_id,
        obj.airway_and_breathing,
        obj.circulation,
        obj.drugs,
        obj.airway_and_breathing_specify,
        obj.circulation_specify,
        obj.drugs_specify,
        obj.userInfo.user_id // Use the user_id from userInfo
      ]
    ).catch((err) => console.log(err));
  
    return data;
  };
  

module.exports.deleteAnticipatedCare = async (id) => {
    const [{affectedRows}] =  await  db.query("DELETE From anticipated_care WHERE anticipated_care_id = ?",[id])
    .catch(err => console.log(err))
    return affectedRows;
}

module.exports.updateAnticipatedCare = async (obj, id) => {
    try {
        const [data] = await db.query(`
            UPDATE anticipated_care
            SET anticipated_specialist_id = ?,
                airway_and_breathing = ?,
                circulation = ?,
                drugs = ?,
                airway_and_breathing_specify = ?,
                circulation_specify = ?,
                drugs_specify = ?
            WHERE anticipated_care_id = ?`,
            [obj.anticipated_specialist_id, obj.airway_and_breathing, obj.circulation, obj.drugs, obj.airway_and_breathing_specify, obj.circulation_specify, obj.drugs_specify, id]
        );
        if (!data || data.affectedRows === 0) {
            // No rows were updated, which may indicate that the record with the given id does not exist.
            throw new Error(`No record found for id ${id}`);
        }
        return data;
    } catch (err) {
        console.error('Error updating anticipated care:', err.message);
        throw err; // Rethrow the error to handle it at a higher level if needed.
    }
};
