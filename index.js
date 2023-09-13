const express = require("express");
const app = express();
const bodyparser = require('body-parser');
const cors = require("cors");
const db = require("./database/db");
const cookieParser = require('cookie-parser');
//Routed Imports
const patientRoutes = require("./routes/patient.Routes");
const anticipatedCareRoutes = require("./routes/anticipatedCare.Routes");
const anticipatedSpecialistRoutes = require("./routes/anticipatedSpecialist.Routes");
const clinicaDetailsRoutes = require("./routes/clinicalDetail.Routes")
const clinicalHistoryRoutes = require("./routes/clinicalHistory.Routes");
const commentDetailRoutes = require("./routes/commentDetail.Routes");
const generalExaminationRoutes = require("./routes/generalExamination.Routes");
const handoverRoutes = require("./routes/handover.Routes");
const hospitalRoutes = require("./routes/hospital.Routes");
const incidentRoutes = require("./routes/incident.Routes");
const managementRoutes = require("./routes/management.Routes");
const medicalAidRoutes = require("./routes/medicalAid.Routes");
const patientCaseRoutes = require("./routes/patientCase.Routes");
const personnelRoutes = require("./routes/personnel.Routes");
const systematicRoutes = require("./routes/systematic.Routes");
const tewRoutes = require("./routes/tew.Routes");
const triageRoutes = require("./routes/triage.Routes");
const viatlExaminationRoutes = require("./routes/vitalExamination.Routes");

const userRoutes = require("./routes/user.Routes");

const locationRoutes = require('./routes/location.Routes');
const etaRoutes = require('./routes/eta.Routes');
const directionsRoutes = require('./routes/direction.Routes');
const hospitalsRoutes = require('./routes/hospitalLocation.Routes');

//Middleware
const errorHandler = require("./middleware/errorHandler");
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's origin
  credentials: true,
}));
app.use(bodyparser.json())
app.use(express.json());
app.use(errorHandler);

//Authentication Routes
app.use('/api/users', userRoutes);

//Case Routes
app.use('/api/anticipatedCare', anticipatedCareRoutes);
app.use('/api/anticipatedSpecialist', anticipatedSpecialistRoutes);
app.use('/api/clinicaDetails', clinicaDetailsRoutes);
app.use('/api/clinicalHistory', clinicalHistoryRoutes);
app.use('/api/commentDetails', commentDetailRoutes);
app.use('/api/generalExamination', generalExaminationRoutes);
app.use('/api/handover', handoverRoutes);
app.use('/api/hospital', hospitalRoutes);
app.use('/api/incident', incidentRoutes);
app.use('/api/management', managementRoutes);
app.use('/api/medicalAid', medicalAidRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/patientcase', patientCaseRoutes);
app.use('/api/personnel', personnelRoutes)
app.use('/api/systematic', systematicRoutes);
app.use('/api/tew', tewRoutes);
app.use('/api/triage', triageRoutes);
app.use('/api/vitals', viatlExaminationRoutes)

//Locations Routes
app.use('/api/location', locationRoutes);
app.use('/api/eta', etaRoutes);
app.use('/api/directions', directionsRoutes);
app.use('/api/hospitalLocation', hospitalsRoutes);

const PORT = process.env.URL_PORT || 5000;

db.query("SELECT 1")
.then(data  => console.log("db conncetion succeded."),
    app.listen(PORT, () => 
    console.log(`Server started at Port: ${PORT}`)))
.catch(err => console.log("db connection failed." + err))

