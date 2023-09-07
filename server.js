const express = require('express');
const app = express();
const port = 5000;

const corsMiddleware = require('./Middlewares/corsMiddleware');
const kafkaHospitalRoute = require('./Routes/kafkaHospitalRoute');
const kafkaPatientRoute = require('./Routes/kafkaPatientRoute');
const kafkaParamedicRoute = require('./Routes/kafkaParamedicRoute');


app.use(corsMiddleware);

app.use('/api/kafkaHospital', kafkaHospitalRoute); // specifying a base URL for my API routes
app.use('/api/kafkaPatient', kafkaPatientRoute);
app.use('/api/kafkaParamedic', kafkaParamedicRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
