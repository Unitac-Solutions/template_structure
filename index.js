const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const db = require("./database/db");
 
const userRoutes = require("./routes/user.Router"); 
 
const errorHandler = require("./middleware/errorHandler");

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use('/api/users', userRoutes);  
 
app.use(errorHandler);

db.query("SELECT 1")
  .then(data => {
    console.log("DB connection succeeded.");
    app.listen(3000, () => {
      console.log("Server started at 3000");
    });
  })
  .catch(err => console.log("DB connection failed: " + err));
