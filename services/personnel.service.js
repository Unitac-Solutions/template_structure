const db = require("../database/db");

module.exports.getAllpersonnels = async () => {
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
    const [data] =  await  db.query(`INSERT INTO personnel(
        personnelId, first_name, last_name, occupation
    ) VALUES(?,?,?,?)`,
    [obj.personnelId, obj.first_name, obj.last_name, obj.occupation])
    .catch(err => console.log(err))
    return data;
} 

module.exports.updatepersonnel = async (obj , id ) => {
    const [data] =  await  db.query(`UPDATE personnels
    SET personnelId = ?, 
    first_name = ?, 
    last_name = ?, 
    occupation = ?
    WHERE personel_id = ? `,
     [obj.personnelId, obj.first_name, obj.last_name, obj.occupation, id])
    .catch(err => console.log(err))
    return data;
} 