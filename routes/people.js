const express = require("express");
const Router = express.Router();

const mysqlConnection = require("../connection");

var ocultaSenha = (senha) => {
  var senha_oculta = '';
  for (var i = 0; i < String(senha).length; i++) {
    senha_oculta += '*';
  }
  return senha_oculta;
}

Router.post("/", (req, res)=>{
  var create = "INSERT INTO people (nome, senha) VALUES('"+req.body.nome+"', '"+req.body.senha+"')";
  mysqlConnection.query(create, (err, rows, fields)=>{
    if (!err) {
      req.session.nome = req.body.nome;
      req.session.senha = req.body.senha;
      var resposta = {
        nome: req.session.nome,
        senha: ocultaSenha(req.session.senha)
      }
      res.status(201).send(resposta);
    } else {
      console.log(err);
    }
  });
});

Router.get("/", (req, res)=>{
  var read = "SELECT * FROM people ORDER BY id ASC";
  var resposta = [];
  mysqlConnection.query(read, (err, rows, fields)=>{
    if (!err) {
      for (var i = 0; i < rows.length; i++) {
        var json = {
          id: rows[i].id,
          nome: rows[i].nome,
          senha: ocultaSenha(rows[i].senha)
        }
        resposta.push(json);
      }
      res.status(200).send(resposta);
    } else {
      console.log(err);
    }
  });
});

Router.get("/:id", (req, res)=>{
  var read_people_by_id = "SELECT * FROM people WHERE id = "+req.params.id;
  var resposta = {}
  mysqlConnection.query(read_people_by_id, (err, rows, fields)=>{
    if (!err) {
      var json = {
        id: rows[0].id,
        nome: rows[0].nome,
        senha: ocultaSenha(rows[0].senha)
      }
      resposta = json;
      res.status(200).send(resposta);
    } else {
      console.log(err);
    }
  });
});

Router.put("/:id", (req, res)=>{
  var update_by_id = "UPDATE people SET nome = '"+req.body.nome+"', senha = '"+req.body.senha+"' WHERE id = "+req.params.id;
  mysqlConnection.query(update_by_id, (err, rows, fields)=>{
    if (!err) {
      res.status(200).send(rows);
    } else {
      console.log(err);
    }
  });
});

Router.delete("/:id", (req, res)=>{
  var delete_people_by_id = "DELETE FROM people WHERE id = "+req.params.id;
  mysqlConnection.query(delete_people_by_id, (err, rows, fields)=>{
    if (!err) {
      res.status(200).send(rows);
    } else {
      console.log(err);
    }
  });
});

module.exports = Router;
