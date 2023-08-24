const express = require("express");
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();

//Local Imports
const connectDb = require('./db/index.js')
const patientRouter = require('./routes/patient.Router.js')
const userRoutes = require('./routes/user.Router.js')
const errorHandler = require('./middlewares/errorHandler.js')

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.json());
app.use("/api/patients", patientRouter);
app.use('/api/users', userRoutes )
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
