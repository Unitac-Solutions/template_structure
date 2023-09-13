const { mapValues } = require("async");
const db = require("../database/db");

module.exports.getpersonnels = async () => {
    const rows =  await  db.query("SELECT * From personnel")
    .catch(err => console.log(err))
    return rows;
} 

module.exports.getpersonnel = async (id) => {
    const [row] =  await  db.query("SELECT * From personnel WHERE personel_id= ?",[id])
    .catch(err => console.log(err))
    return row;
} 

module.exports.deletepersonnel = async (id) => {
    const [{affectedRows}] =  await  db.query("DELETE From personnel WHERE personel_id = ?",[id])
    .catch(err => console.log(err))
    return affectedRows;
} 

module.exports.createpersonnel = async (obj , id = 0) => {
    const data =  await  db.query(`INSERT INTO personnel(
        personnelId, first_name, last_name, occupation, created_by
    ) VALUES(?,?,?,?,?)`,
    [obj.personnelId, obj.first_name, obj.last_name, obj.occupation, obj.userInfo.user_id])
    .catch(err => console.log(err))
    return data;
} 

module.exports.updatepersonnel = async (obj , id ) => {
    console.log(obj)
    const [data] =  await  db.query(`UPDATE personnel
    SET personnelId = ?, 
    first_name = ?, 
    last_name = ?, 
    occupation = ?
    WHERE personel_id = ?`,
     [obj.personnelId, obj.first_name, obj.last_name, obj.occupation, id])
    .catch(err => console.log(err))
    return data;
} 