const db = require("../database/db");

module.exports.getSpecialists = async () => {
    const rows =  await  db.query("SELECT * From anticipated_specialist")
    .catch(err => console.log(err))
    return rows;
} 

module.exports.getSpecialist = async (id) => {
    const [row] =  await  db.query("SELECT * From anticipated_specialist WHERE anticipated_specialist_id = ?",[id])
    .catch(err => console.log(err))
    return row;
} 

module.exports.deleteSpecialist = async (id) => {
    const [{affectedRows}] =  await  db.query("DELETE From anticipated_specialist WHERE anticipated_specialist_id = ?",[id])
    .catch(err => console.log(err))
    return affectedRows;
} 

module.exports.createSpecialist = async (obj , id = 0) => {
    const [data] =  await  db.query(`INSERT INTO anticipated_specialist(
        anticipated_specialist, anticipated_surgeon, anticipated_surgeon_specify, anticipated_specialist_specify
    ) VALUES(?,?,?,?)`,
    [obj.specalist, obj.surgeon, obj.surgeon_specify, obj.specialist_specify])
    .catch(err => console.log(err))
    return data;
} 

module.exports.updateSpecialist = async (obj , id ) => {
    const [data] =  await  db.query(`UPDATE anticipated_specialist
    SET anticipated_specialist = ?,
    anticipated_surgeon = ?,
    anticipated_surgeon_specify = ?,
    anticipated_specialist_specify = ?
    WHERE anticipated_specialist_id = ? `,
     [obj.specalist, obj.surgeon, obj.surgeon_specify, obj.specialist_specify, id])
    .catch(err => console.log(err))
    return data;
} 