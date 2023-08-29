require("dotenv").config()
const express = require("express")
const app = express();
const bodyparser = require('body-parser');
const db = require("./database/db");

const patientRoutes = require("./routes/patient.Routes");
const anticipatedCareRoutes = require("./routes/anticipatedCare.Routes")
const anticipatedSpecialistRoutes = require("./routes/anticipated_specialist.Routes")
const clinicalHistoryRoutes = require("./routes/clinical_history.Routes")
const commentDetailRoutes = require("./routes/comment_detail.Routes")
const generalExaminationRoutes = require("./routes/general_examination.Routes")
const handoverRoutes = require("./routes/handover.Routes")
const incidentRoutes = require("./routes/incident.Routes")
const managementRoutes = require("./routes/management.Routes")
const medicalAidRoutes = require("./routes/medical_aid.Routes")
const patientCaseRoutes = require("./routes/patient_case.Routes")
const systematicRoutes = require("./routes/systematic.Routes")
const tewRoutes = require("./routes/tew.Routes")
const triageRoutes = require("./routes/triage.Routes")
const viatlExaminationRoutes = require("./routes/vital_examination.Routes")
const errorHandler = require("./middleware/errorHandler");




//Middleware
app.use(bodyparser.json())
app.use(express.json());
app.use(errorHandler);

//app.use('/api/patient', patientRoutes);
app.use('/patient', patientRoutes);
app.use('/api/patient', anticipatedCareRoutes);
app.use('/api/patient', anticipatedSpecialistRoutes);
app.use('/api/patient', clinicalHistoryRoutes);
app.use('/api/patient', commentDetailRoutes);
app.use('/api/patient', generalExaminationRoutes);
app.use('/api/patient', handoverRoutes);
app.use('/api/patient', incidentRoutes);
app.use('/api/patient', managementRoutes);
app.use('/api/patient', medicalAidRoutes);
app.use('/api/patient', patientCaseRoutes)
app.use('/api/patient', systematicRoutes);
app.use('/api/patient', tewRoutes);
app.use('/api/patient', triageRoutes);
app.use('/api/patient', viatlExaminationRoutes)

db.query("SELECT 1").then(
        data => console.log("db connection succeeded."), 
        app.listen(process.env.APP_PORT, () =>{
            console.log("Server running on PORT",process.env.APP_PORT,"...")
        })
    ).catch(
        err => console.log("db connection failed." + err)
    );
