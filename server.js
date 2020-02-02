const express = require("express");
const bodyParser = require("body-parser");

const PeopleRoutes = require("./routes/people");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/people", PeopleRoutes);

app.listen(3000);
