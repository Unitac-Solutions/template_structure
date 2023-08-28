require('dotenv').config()
const express = require('express');
const cors = require('cors'); 
const locationRoutes = require('./routes/locationRoutes');
const etaRoutes = require('./routes/etaRoutes');
const directionsRoutes = require('./routes/directionsRoutes');

const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());
app.use('/api', locationRoutes);
app.use('/api/eta', etaRoutes);
app.use('/api/directions', directionsRoutes);

app.listen(port, () => console.log('Server Started'))