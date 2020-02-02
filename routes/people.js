const express = require("express");
const Router = express.Router();

const mysqlConnection = require("../connection");

Router.post("/", (req, res)=>{
  var create = "INSERT INTO `people`(`name`, `age`) VALUES ('"+req.body.name+"', '"+req.body.age+"')";
  mysqlConnection.query(create, (err, rows, fields)=>{
    if (!err) {
      res.status(201).send(rows);
    } else {
      console.log(err);
    }
  });
});

Router.get("/", (req, res)=>{
  var read = "SELECT * FROM people ORDER BY id ASC";
  mysqlConnection.query(read, (err, rows, fields)=>{
    if (!err) {
      res.status(200).send(rows);
    } else {
      console.log(err);
    }
  });
});

Router.get("/:id", (req, res)=>{
  var read_people_id = "SELECT * FROM `people` WHERE id = "+req.params.id;
  mysqlConnection.query(read_people_id, (err, rows, fields)=>{
    if (!err) {
      res.status(200).send(rows);
    } else {
      console.log(err);
    }
  });
});

Router.put("/:id", (req, res)=>{
  var update_by_id = "UPDATE `people` SET `name` = '"+req.body.name+"', `age` = '"+req.body.age+"' WHERE id = "+req.params.id;
  mysqlConnection.query(update_by_id, (err, rows, fields)=>{
    if (!err) {
      res.status(200).send(rows);
    } else {
      console.log(err);
    }
  });
});

Router.delete("/:id", (req, res)=>{
  var delete_people_by_id = "DELETE FROM `people` WHERE id = "+req.params.id;
  mysqlConnection.query(delete_people_by_id, (err, rows, fields)=>{
    if (!err) {
      res.status(200).send(rows);
    } else {
      console.log(err);
    }
  });
});

module.exports = Router;
