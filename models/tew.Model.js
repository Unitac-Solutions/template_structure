const db = require("../database/db");

module.exports.gettews = async () => {
    const [rows] =  await  db.query("SELECT * From tew")
    .catch(err => console.log(err))
    return rows;
} 

module.exports.gettew = async (id) => {
    const [row] =  await  db.query("SELECT * From tew WHERE tew_id = ?",[id])
    .catch(err => console.log(err))
    return row;
} 

module.exports.deletetew = async (id) => {
    const [{affectedRows}] =  await  db.query("DELETE From tew WHERE tew_id = ?",[id])
    .catch(err => console.log(err))
    return affectedRows;
} 

module.exports.createtew = async (obj , id = 0) => {
    const [data] =  await  db.query(`INSERT INTO tew(
        emergency, very_urgent, urgent, mobility, rr, hr, temp, avpu, trauma, sbp, walking, breathing, respiratory, pulse
    ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [obj.emergency, obj.very_urgent, obj.urgent, obj.mobility, obj.rr, obj.hr, obj.temp, obj.avpu, obj.trauma, obj.sbp, obj.walking, obj.breathing, obj.respiratory, obj.pulse])
    .catch(err => console.log(err))
    return data;
} 

module.exports.updatetew = async (obj , id ) => {
    const [data] =  await  db.query(`UPDATE tew
    SET emergency = ?, 
    very_urgent = ?, 
    urgent = ?, 
    mobility = ?, 
    rr = ?, 
    hr = ?, 
    temp = ?, 
    avpu = ?, 
    trauma = ?, 
    sbp = ?, 
    walking = ?, 
    breathing = ?, 
    respiratory = ?, 
    pulse = ?
    WHERE tew_id = ? `,
     [obj.emergency, obj.very_urgent, obj.urgent, obj.mobility, obj.rr, obj.hr, obj.temp, obj.avpu, obj.trauma, obj.sbp, obj.walking, obj.breathing, obj.respiratory, obj.pulse, id])
    .catch(err => console.log(err))
    return data;
} 