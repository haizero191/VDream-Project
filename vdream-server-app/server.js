const express = require("express");
const route = require("./routes/index");
const PORT = 4000;
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
/* Use Dotenv */
require("dotenv").config();

/* Apply node server middleware modules */
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(cors());

/* Server routes setting */
route(app);

/* MongoDB connect */
const db = require("./utils/mongodb");

app.listen(PORT, () => {
console.log(`VDream node server is listening on port ${PORT}`);
  db.connect();
  console.log(process.env.ASCII_ART)

});
