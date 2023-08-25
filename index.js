const express = require("express")
const app = express();
const bodyparser = require('body-parser');
//require('express-async-errors');

const db = require("./database/db");
const employeeRoutes = require("./routes/employee.routes")
const patientRoutes = require("./routes/patient.Routes")
const errorHandler = require("./middleware/errorHandler");

//Middleware
app.use(bodyparser.json())
app.use('/api/employees', employeeRoutes);
app.use('/api/patient', patientRoutes);
app.use(errorHandler);

db.query("SELECT 1")
.then(data  => console.log("db conncetion succeded."),
    app.listen(3000, () => 
    console.log("Server started at 3000")))
.catch(err => console.log("db connection failed." + err))

