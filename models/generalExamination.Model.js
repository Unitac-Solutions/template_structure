const db = require("../database/db");

module.exports.getgeneral_examinations = async () => {
    const [rows] =  await  db.query("SELECT * From general_examination")
    .catch(err => console.log(err))
    return rows;
} 

module.exports.getgeneral_examination = async (id) => {
    const [row] =  await  db.query("SELECT * From general_examination WHERE general_examination_id = ?",[id])
    .catch(err => console.log(err))
    return row;
} 

module.exports.deletegeneral_examination = async (id) => {
    const [{affectedRows}] =  await  db.query("DELETE From general_examination WHERE general_examination_id = ?",[id])
    .catch(err => console.log(err))
    return affectedRows;
} 

module.exports.creategeneral_examination = async (obj , id = 0) => {
    const data =  await  db.query(`INSERT INTO general_examination(
    motor, verbal, eye, pupil, equal, reaction, dehydrated, bleeding, estimated_blood_loss, urine_losses, ng_losses, cd_loses,created_by
    ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [obj.motor, obj.verbal, obj.eye, obj.pupil, obj.equal, obj.reaction, obj.dehydrated, obj.bleeding, obj.estimated_blood_loss, obj.urine_losses, obj.ng_losses, obj.cd_loses,  obj.userInfo.user_id])
    .catch(err => console.log(err))
    return data;
} 

module.exports.updategeneral_examination = async (obj , id ) => {
    const data =  await  db.query(`UPDATE general_examination
    SET motor = ?, 
    verbal = ?, 
    eye = ?, 
    pupil = ?, 
    equal = ?, 
    reaction = ?, 
    dehydrated = ?, 
    bleeding = ?, 
    estimated_blood_loss = ?, 
    urine_losses = ?, 
    ng_losses = ?, 
    cd_loses = ?
    WHERE general_examination_id = ? `,
     [obj.motor, obj.verbal, obj.eye, obj.pupil, obj.equal, obj.reaction, obj.dehydrated, obj.bleeding, obj.estimated_blood_loss, obj.urine_losses, obj.ng_losses, obj.cd_loses, id])
    .catch(err => console.log(err))
    return data;
} 