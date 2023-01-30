const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
// app.use(bodyParser);

// parse requests of content-type - application/json
app.use(express.json());

// app.use(express.bodyParser());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}))

app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

// database
const db = require("./app/models");
// const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ status: "Welcome to application." });
});

// routes

require("./app/routes/car.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

