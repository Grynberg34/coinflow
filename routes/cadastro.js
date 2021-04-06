const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../db/connection');
const { v4: uuidv4 } = require('uuid');

function checkAuthentication(req,res,next){
  if (req.isAuthenticated()) {
    if(req.user.tipo_conta == 'user'){
      res.redirect('/user')
    }
  
    else if (req.user.tipo_conta == 'admin') {
      res.redirect('/admin')
    }
  }
  else{
    next()
  }
}

router.get('/', checkAuthentication, function(_, res) {
  res.render('cadastro')
});


router.get('/empresa', checkAuthentication, function(_, res) {
  res.render('cadastro_empresa')
});


router.post('/empresa', function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var areas = req.body.areas;
  var code = uuidv4();
  var password = req.body.password;
  var repeat = req.body.repeatpassword;
  var userexists = "esse email já foi utilizado por outro usuário";
  var passdontmatch = "as senhas não coincidem";

  if (password == repeat) {

    connection.query(`SELECT COUNT(*) as number FROM funcionarios WHERE email = '${email}'`, function (err, rows, fields) {
      if (rows[0].number > 0) {
        res.render('cadastro_empresa', {userexists})
      } 
     
      else {
        var hashedpassword = bcrypt.hashSync(password, 10);
        var sql = `INSERT INTO empresas (nome_empresa, email, tipo_conta, areas_atuacao, codigo_cadastro, hashedpassword) VALUES ('${name}', '${email}', 'admin', '${areas}', '${code}', '${hashedpassword}')`;
        connection.query(sql, function (err) {
          if (err) res.render('cadastro_empresa', {userexists})
          else {
          res.redirect('/login/empresa')}
        });
      }
  
    })
  }

  else res.render('cadastro_empresa', {passdontmatch}) 


});

router.get('/funcionario', checkAuthentication, function(_, res) {
  res.render('cadastro_funcionario')
});


router.post('/funcionario', function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var code = req.body.code;
  var password = req.body.password;
  var repeat = req.body.repeatpassword;
  var userexists = "Esse email ou nome já foi utilizado por outro usuário";
  var passdontmatch = "As senhas não coincidem.";
  var invalidcode = 'Código da empresa inválido.';


  connection.query(`SELECT id FROM empresas WHERE codigo_cadastro = '${code}'`, function (err, empresa, fields) {
    if (err) res.render('cadastro_funcionario', {invalidcode})
    else {
      if (password == repeat) {
        var id_empresa = empresa[0].id;
        connection.query(`SELECT COUNT(*) as number FROM empresas WHERE email = '${email}'`, function (err, rows, fields) {
          if (rows[0].number > 0) {
            res.render('cadastro_funcionario', {userexists})
          } 
          else {
            var hashedpassword = bcrypt.hashSync(password, 10);
            var sql = `INSERT INTO funcionarios (nome, email, tipo_conta, id_empresa, hashedpassword) VALUES ('${name}', '${email}', 'user', '${id_empresa}', '${hashedpassword}')`;
            connection.query(sql, function (err) {
              if (err) res.render('cadastro_funcionario', {userexists})
              else {
              res.redirect('/login/funcionario')}
            });
          }
        })

      } 
      else res.render('cadastro_funcionario', {passdontmatch}) 
    }

  })

});


module.exports = router;
