const db = require("../database/db");

module.exports.gethandovers = async () => {
    const rows =  await  db.query("SELECT * From handover")
    .catch(err => console.log(err))
    return rows;
} 

module.exports.gethandover = async (id) => {
    const [row] =  await  db.query("SELECT * From handover WHERE handover_id = ?",[id])
    .catch(err => console.log(err))
    return row;
} 

module.exports.deletehandover = async (id) => {
    const [{affectedRows}] =  await  db.query("DELETE From handover WHERE handover_id = ?",[id])
    .catch(err => console.log(err))
    return affectedRows;
} 

module.exports.createhandover = async (obj , id = 0) => {
    const [data] =  await  db.query(`INSERT INTO handover(
        handover_by, handover_to, handover_title, handover_name, handover_mp_no, handover_signature, hand_signature2
    ) VALUES(?,?,?,?,?,?,?)`,
    [obj.handover_by, obj.handover_to, obj.handover_title, obj.handover_name, obj.handover_mp_no, obj.handover_signature, obj.hand_signature2])
    .catch(err => console.log(err))
    return data;
} 

module.exports.updatehandover = async (obj , id ) => {
    const [data] =  await  db.query(`UPDATE handover
    SET handover_by = ?, 
    handover_to = ?, 
    handover_title = ?, 
    handover_name = ?, 
    handover_mp_no = ?, 
    handover_signature = ?, 
    hand_signature2 = ?
    WHERE handover_id = ? `,
     [obj.handover_by, obj.handover_to, obj.handover_title, obj.handover_name, obj.handover_mp_no, obj.handover_signature, obj.hand_signature2, id])
    .catch(err => console.log(err))
    return data;
} 