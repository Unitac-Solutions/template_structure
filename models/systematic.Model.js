const db = require("../database/db");

module.exports.getsystematics = async () => {
    const rows =  await  db.query("SELECT * From systematic")
    .catch(err => console.log(err))
    return rows;
} 

module.exports.getsystematic = async (id) => {
    const [row] =  await  db.query("SELECT * From systematic WHERE systematic_id = ?",[id])
    .catch(err => console.log(err))
    return row;
} 

module.exports.deletesystematic = async (id) => {
    const [{affectedRows}] =  await  db.query("DELETE From systematic WHERE systematic_id = ?",[id])
    .catch(err => console.log(err))
    return affectedRows;
} 

module.exports.createsystematic = async (obj , id = 0) => {
    const [data] =  await  db.query(`INSERT INTO systematic(
        cns, cvs, abd, resp, headneck, msk, created_by
    ) VALUES(?,?,?,?,?,?,?)`,
    [obj.cns, obj.cvs, obj.abd, obj.resp, obj.headneck, obj.msk, obj.userInfo.user_id])
    .catch(err => console.log(err))
    return data;
} 

module.exports.updatesystematic = async (obj , id ) => {
    const [data] =  await  db.query(`UPDATE systematic
    SET cns = ?, 
    cvs = ?, 
    abd = ?, 
    resp = ?, 
    headneck = ?, 
    msk = ? 
    WHERE systematic_id = ? `,
     [obj.cns, obj.cvs, obj.abd, obj.resp, obj.headneck, obj.msk, id])
    .catch(err => console.log(err))
    return data;
} 