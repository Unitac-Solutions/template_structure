const db = require("../database/db");

module.exports.getAllUsers = async () => {
    try {
        const rows = await db.query("SELECT * FROM user");
        if (rows.length === 0) {
            throw new Error("No data found.");
        }
        return rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports.getUser = async (id) => {
    const [row] =  await  db.query("SELECT * From user WHERE user_id = ?",[id])
    .catch(err => console.log(err))
    return row;
} 

module.exports.deleteUser = async (id) => {
    const [{affectedRows}] =  await  db.query("DELETE From user WHERE user_id = ?",[id])
    .catch(err => console.log(err))
    return affectedRows;
} 

module.exports.createUser = async (obj, id = 0) => {
  try {
    const emailResults = await db.query("SELECT * FROM user WHERE email = ?", [obj.email]);

    if (emailResults[0].length > 0) {
      console.log(emailResults);
      return { error: "Email already exists" }; // Return a JSON indicating the error
    }

    const insertQuery = `
      INSERT INTO user(
        first_name, last_name, phone_number,
        work_number, role, paramedic_id,
        type, email, password, created_by
      ) VALUES(?,?,?,?,?,?,?,?,?,?)`;

    const [data] = await db.query(insertQuery, [
      obj.first_name,
      obj.last_name,
      obj.phone_number,
      obj.work_number,
      obj.role,
      obj.paramedic_id,
      obj.type,
      obj.email,
      obj.HashedPassword,
      id
    ]);

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};


  module.exports.updateUser = async (obj, id) => {
    console.log(     obj.userInfo)
    const [data] = await db.query(
      `UPDATE user
       SET first_name = ?,
           last_name = ?,
           phone_number = ?,
           work_number = ?,
           role = ?,
           paramedic_id = ?,
           type = ?,
           email = ?,
           password = ?,
           modified_by = ?,
           modified_date = current_timestamp
       WHERE user_id = ?`,
      [
        obj.first_name,
        obj.last_name,
        obj.phone_number,
        obj.work_number,
        obj.role,
        obj.paramedic_id,
        obj.type,
        obj.email,
        obj.password,
        obj.userInfo.user_id,  
        id  
      ]
    ).catch(err => {
      console.error(err);
      throw err;  
    });
  
    return data;
  };
  module.exports.getUserByEmail = async (email) => {
    try {
      const [results] = await db.query(
        `SELECT * FROM user WHERE email = ?`,
        [email]
      );
  
      if (results.length === 0) {
        return null;  
      }
     
      return results[0];  
    } catch (error) {
      throw error; 
    }
  };
  
  