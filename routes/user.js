const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

function checkAuthentication(req,res,next){
  if (req.isAuthenticated()) {
    if(req.user.tipo_conta == 'admin'){
      res.redirect('/admin')
    }
  
    else if (req.user.tipo_conta == 'user') {
      next()
    }
  }
  else{
    res.redirect('/')
  }
}

router.get('/', checkAuthentication, function(req, res) {
 var user_id = req.user.id
 res.redirect(`/user/${user_id}`)
});

router.get('/:id', checkAuthentication, function(req, res) {
  var id = req.params.id;
  var user_id = req.user.id;
  var nome = req.user.nome;
  var outflow = req.user.outflow;
  var flowin = req.user.flowin;
  if(user_id == id) {
    res.render('user', {user_id, nome, flowin, outflow})
  }
  else res.redirect('/')
});


router.get('/:id/enviar', checkAuthentication, function(req, res) {
  var id = req.params.id;
  var user_id = req.user.id;
  var outflow = req.user.outflow;
  var id_empresa = req.user.id_empresa;
  var nome = req.user.nome;
  connection.query(`SELECT * FROM funcionarios WHERE id_empresa = '${id_empresa}' AND NOT id = '${user_id}' ORDER BY nome ASC `, function(err, funcionarios, fields) {
    if (err) res.render('error')
    if(user_id == id) {
      res.render('user-enviar', {user_id, funcionarios, nome, outflow})
    }
    else res.redirect('/')
  })
});

router.post('/:id/enviar', function(req, res) {
  var id = req.params.id;
  var user_id = req.user.id;
  var id_empresa = req.user.id_empresa;
  var nome = req.user.nome;
  var outflow = req.user.outflow;
  var user = req.body.user;
  var value = req.body.value;
  var motivo = req.body.motivo;
  var notfound = 'Usuário não encontrado.';
  var insuficiente = 'Saldo insuficiente.';
  var saldo = 'Outflow enviado com sucesso.';

   connection.query(`SELECT * FROM funcionarios WHERE id_empresa = '${id_empresa}' AND NOT id = '${user_id}' ORDER BY nome ASC `, function(err, funcionarios, fields) {
    connection.query(`SELECT COUNT(*) as number FROM funcionarios WHERE id_empresa = '${id_empresa}' AND id = '${user}'`, function(err, rows, fields) {
      if (rows[0].number < 1) res.render('user-enviar', {user_id, funcionarios, nome, outflow, notfound})
      else if (user != user.id && value < outflow && user_id == id) {
        connection.query(`UPDATE funcionarios SET outflow = flowin + '${value}' WHERE id_empresa = '${id_empresa}' and id = '${user}'`)
        connection.query(`UPDATE funcionarios SET outflow = outflow - '${value}' WHERE id_empresa = '${id_empresa}' and id = '${user_id}'`)
        connection.query(`INSERT INTO transferencias (id_empresa, data, id_remetente, id_destinatario, valor, motivo) VALUES ('${id_empresa}', NOW(), '${user_id}', '${user}', '${value}', '${motivo}')`)
        connection.query(`SELECT * FROM funcionarios WHERE id_empresa = '${id_empresa}' AND id = '${user_id}'`, function(err, new_user, fields) {
          if (err) res.render('error')
          var new_outflow = new_user[0].outflow
          res.render('user-enviar', {user_id, funcionarios, nome, new_outflow, saldo})
        })
      }  
      else res.render('user-enviar', {user_id, funcionarios, nome, outflow, insuficiente})
    })
  })
});

module.exports = router;
