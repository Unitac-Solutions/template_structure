const db = require("../database/db");

module.exports.getmedical_aids = async () => {
    const rows =  await  db.query("SELECT * From medical_aid")
    .catch(err => console.log(err))
    return rows;
} 

module.exports.getmedical_aid = async (id) => {
    const [row] =  await  db.query("SELECT * From medical_aid WHERE med_aid_id = ?",[id])
    .catch(err => console.log(err))
    return row;
} 

module.exports.deletemedical_aid = async (id) => {
    const [{affectedRows}] =  await  db.query("DELETE From medical_aid WHERE med_aid_id = ?",[id])
    .catch(err => console.log(err))
    return affectedRows;
} 

module.exports.createmedical_aid = async (obj , id = 0) => {
    const [data] =  await  db.query(`INSERT INTO medical_aid(
    provider, name, med_aid_option, number, dept_code, main_member, auth_number, next_of_kin_name, next_of_kin_contact, next_of_kin_relationship
    ) VALUES(?,?,?,?,?,?,?,?,?,?)`,
    [obj.provider, obj.name, obj.med_aid_option, obj.number, obj.dept_code, obj.main_member, obj.auth_number, obj.next_of_kin_name, obj.next_of_kin_contact, obj.next_of_kin_relationship])
    .catch(err => console.log(err))
    return data;
} 

module.exports.updatemedical_aid = async (obj , id ) => {
    const [data] =  await  db.query(`UPDATE medical_aid
    SET provider = ?,
    name = ?, 
    med_aid_option = ?, 
    number = ?, 
    dept_code = ?, 
    main_member = ?, 
    auth_number = ?, 
    next_of_kin_name = ?, 
    next_of_kin_contact = ?, 
    next_of_kin_relationship = ? 
    WHERE med_aid_id = ? `,
     [obj.provider, obj.name, obj.med_aid_option, obj.number, obj.dept_code, obj.main_member, obj.auth_number, obj.next_of_kin_name, obj.next_of_kin_contact, obj.next_of_kin_relationship])
    .catch(err => console.log(err))
    return data;
} 