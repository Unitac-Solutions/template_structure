const db = require("../database/db");
const { genSaltSync, hashSync, compareSync } = require("bcryptjs");



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
  const [row] = await db.query("SELECT * From user WHERE user_id = ?", [id])
    .catch(err => console.log(err))
  return row;
}


module.exports.createUser = async (obj, id = 0) => {
  try {
    const emailResults = await db.query("SELECT * FROM user WHERE email = ?", [obj.email]);

    if (emailResults[0].length > 0) {
      return { error: "Email already exists" }; // Return a JSON indicating the error
    } else {

      const insertQuery = `
      INSERT INTO user(
        first_name, last_name, phone_number,
        email, password, created_by
      ) VALUES(?,?,?,?,?,?)`;

      const [data] = await db.query(insertQuery, [
        obj.first_name,
        obj.last_name,
        obj.phone_number,
        obj.email,
        obj.HashedPassword,
        id,
        'patient'
      ]);

      return data;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports.activateAccount = async (user_id) => {

  const [data] = await db.query(
    `UPDATE user
     SET  is_activated = ?
     WHERE user_id = ?`,
    [
      1,
      user_id
    ]
  ).catch(err => {
    console.error(err);
    throw err;
  });

  return data;
};


module.exports.updatePassword = async (HashedPassword, id) => {

  const [data] = await db.query(
    `UPDATE user
     SET  password = ?,
         modified_by = ?,
         modified_date = current_timestamp
     WHERE user_id = ?`,
    [
      HashedPassword,
      id,
      id
    ]
  ).catch(err => {
    console.error(err);
    throw err;
  });

  return data;
};


module.exports.updateUserWithoutPassword = async (obj, id) => {
  console.log(obj);
  const [data] = await db.query(
    `UPDATE user
       SET first_name = ?,
           last_name = ?,
           phone_number = ?,
           modified_by = ?,
           modified_date = current_timestamp
       WHERE user_id = ?`,
    [
      obj.first_name,
      obj.last_name,
      obj.phone_number,
      obj.userInfo.user_id,
      id
    ]
  ).catch(err => {
    console.error(err);
    throw err;
  });

  return data;
};


module.exports.updateUser = async (obj, id) => {
  console.log(obj);
  const [data] = await db.query(
    `UPDATE user
       SET first_name = ?,
           last_name = ?,
           phone_number = ?,
          password = ?,
           modified_by = ?,
           modified_date = current_timestamp
       WHERE user_id = ?`,
    [
      obj.first_name,
      obj.last_name,
      obj.phone_number,
      obj.hashedPassword,
      obj.userInfo.user_id,
      id
    ]
  ).catch(err => {
    console.error(err);
    throw err;
  });

  return data;
};

module.exports.deleteUser = async (obj, id) => {

  const [data] = await db.query(
    `UPDATE user
      SET is_activated = 0,
      deleted_by = ?,
      deleted_date = ?
      WHERE user_id = ?`,
    [obj.deleted_by, Date.now(), id]
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
const nodemailer = require('nodemailer');

module.exports.sendLink = async (recipient, subject, message) => {
  try {

    // Configure Nodemailer with your email service provider's SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'unitacsolution.co.za',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SERVER_EMAIL,
        pass: process.env.SERVER_EMAIL_PASSWORD,
      },
    });

    // Create an email object
    const mailOptions = {
      from: process.env.SERVER_EMAIL,
      to: recipient,
      subject: subject,
      text: message,
    };

    // Send the email and return a Promise
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    return true; // Indicate that the email was sent successfully
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};

module.exports.getUserByGUID = async (guid) => {
  try {
    const [user] = await db.query("SELECT * FROM user WHERE guid = ?", [guid]);
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports.updateUserByGUID = async (obj, guid) => {
  try {
    const [data] = await db.query(`
      UPDATE user
      SET first_name = ?,
          last_name = ?,
          phone_number = ?,
          modified_by = ?,
          modified_date = current_timestamp
      WHERE guid = ?`,
      [
        obj.first_name,
        obj.last_name,
        obj.phone_number,
        obj.userInfo.user_id,
        guid
      ]
    );
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports.deleteUserByGUID = async (obj, guid) => {
  try {
    const [data] = await db.query(`
      UPDATE user
      SET is_activated = 0,
          deleted_by = ?,
          deleted_date = ?
      WHERE guid = ?`,
      [
        obj.deleted_by,
        Date.now(),
        guid
      ]
    );
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
