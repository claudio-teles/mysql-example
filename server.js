const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const PeopleRoutes = require("./routes/people");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'node_express_session',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use("/people", PeopleRoutes);

app.listen(3000);
