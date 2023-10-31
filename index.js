const express = require("express")
const app = express();
const bodyparser = require('body-parser');
const dotenv = require("dotenv").config();
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


const port = process.env.PORT || 5000;

db.query("SELECT 1")
.then(data  => console.log("db conncetion succeded."),
    app.listen(port, () => 
    console.log(`Server started at ${port}`)))
.catch(err => console.log("db connection failed." + err))

