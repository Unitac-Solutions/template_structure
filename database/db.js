const mysql = require("mysql2/promise");

const mysqlPool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Arnold994.",
    database: "test"
});

module.exports = mysqlPool;