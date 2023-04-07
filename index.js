const express = require('express');
require("./db/database.js");

const cors = require("cors");
//app initialize
const app = express();
//request body parser
app.use(express.json());

const initRoutes = require("./routes.js");


//port 
const PORT = process.env.PORT || 3001;


global.__basedir = __dirname;


const corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
initRoutes(app);


// listen to port 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
 
