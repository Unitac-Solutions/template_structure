const mysql = require("mysql2/promise");
const dotevn = require("dotenv").config();

const mysqlPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: true,
        // ca: serverCa
    }
});

module.exports = mysqlPool;