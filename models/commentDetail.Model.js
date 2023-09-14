const db = require("../database/db");

module.exports.getcomment_details = async () => {
    const [rows] =  await  db.query("SELECT * From comment_detail")
    .catch(err => console.log(err))
    return rows;
} 

module.exports.getcomment_detail = async (id) => {
    const [row] =  await  db.query("SELECT * From comment_detail WHERE comment_detail_id = ?",[id])
    .catch(err => console.log(err))
    return row;
} 

module.exports.deletecomment_detail = async (id) => {
    const [{affectedRows}] =  await  db.query("DELETE From comment_detail WHERE comment_detail_id = ?",[id])
    .catch(err => console.log(err))
    return affectedRows;
} 

module.exports.createcomment_detail = async (obj , id = 0) => {
    const [data] =  await  db.query(`INSERT INTO comment_detail(
        comment,created_by
    ) VALUES(?,?)`,
    [obj.comment,  obj.userInfo.user_id])
    .catch(err => console.log(err))
    return data;
} 

module.exports.updatecomment_detail = async (obj , id ) => {
    const [data] =  await  db.query(`UPDATE comment_detail
    SET comment = ?
    WHERE comment_detail_id = ? `,
    [obj.comment, id])
    .catch(err => console.log(err))
    return data;
} 