require("dotenv").config()
const express = require("express")
const app = express();
const bodyparser = require('body-parser');
const db = require("./database/db");

const patientRoutes = require("./routes/patient.Routes");
const triageRoutes = require("./routes/triage.Routes");
const anticipatedCareRoutes = require("./routes/anticipatedCare.Routes");
const anticipatedSpecialistRoutes = require("./routes/anticipated_specialist.Routes");
const clinical_detail = require("./routes/clinical_detail.Routes");
const clinical_history = require("./routes/clinical_history.Routes");
const comment_detail = require("./routes/comment_detail.Routes");
const generalExam = require("./routes/general_examination.Routes");
const handover = require("./routes/handover.Routes");
const hospital = require("./routes/hospital.Routes");
const incident = require("./routes/incident.Routes");
const management = require("./routes/management.Routes");
const medicalAid = require("./routes/medical_aid.Routes");
const patientCase = require("./routes/patient_case.Routes");
const personnel = require("./routes/personnel.Routes");
const tew = require("./routes/tew.Routes");
const systematic = require("./routes/systematic.Routes");
const vitalExam = require("./routes/vital_examination.Routes");


const errorHandler = require("./middleware/errorHandler");


//Middleware
app.use(bodyparser.json())
app.use(express.json());
app.use(errorHandler);

//app.use('/api/patient', patientRoutes);
app.use('/patient', patientRoutes);
app.use('/triage', triageRoutes);
app.use('/anticipatedCare', anticipatedCareRoutes);
app.use('/anticipatedSpecialist', anticipatedSpecialistRoutes);
app.use('/clinicalDetail',clinical_detail);
app.use('/clinicalHistory',clinical_history);
app.use('/commentDetail',comment_detail);
app.use('/generalExam',generalExam);
app.use('/handover',handover);
app.use('/hospital',hospital);
app.use('/incident',incident);
app.use('/management',management);
app.use('/medicalAid',medicalAid);
app.use('/patientCase',patientCase);
app.use('/personnel',personnel);
app.use('/tew',tew);
app.use('/systematic',systematic);
app.use('/vitalExam',vitalExam);



db.query("SELECT 1").then(
        data => console.log("db connection succeeded."), 
        app.listen(process.env.APP_PORT, () =>{
            console.log("Server running on PORT",process.env.APP_PORT,"...")
        })
    ).catch(
        err => console.log("db connection failed." + err)
    );
