const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

function checkAuthentication(req,res,next){
  if (req.isAuthenticated()) {
    if(req.user.tipo_conta == 'user'){
      res.redirect('/user')
    }
  
    else if (req.user.tipo_conta == 'admin') {
      next()
    }
  }
  else{
    res.redirect('/')
  }
}

router.get('/', checkAuthentication, function(req, res) {
  var user_id = req.user.id
  res.redirect(`/admin/${user_id}`)
});
 
router.get('/:id', checkAuthentication, function(req, res) {
  var id = req.params.id;
  var user_id = req.user.id;
  var nome = req.user.nome_empresa;
  if(user_id == id) {
    res.render('admin', {user_id, nome})
  }
  else res.redirect('/')
});

router.get('/:id', checkAuthentication, function(req, res) {
  var id = req.params.id;
  var user_id = req.user.id;
  var nome = req.user.nome_empresa;
  if(user_id == id) {
    res.render('admin', {user_id, nome})
  }
  else res.redirect('/')
});

router.get('/:id/funcionarios', checkAuthentication, function(req, res) {
  var id = req.params.id;
  var user_id = req.user.id;
  var nome = req.user.nome_empresa;
  var codigo = req.user.codigo_cadastro;

  connection.query(`SELECT * from funcionarios where id_empresa = '${user_id}' ORDER BY nome ASC `, function(err, funcionarios, fields) {
    if (err) res.render('error')
    if(user_id == id) {
      res.render('admin-funcionarios', {user_id, funcionarios, nome, codigo})
    }
    else res.redirect('/')
  })
});


router.post('/:id/funcionarios', function(req, res) {
  var id = req.params.id;
  var user_id = req.user.id;
  var del = req.body.del;

  console.log(del)

  if(user_id == id) {
    connection.query(`DELETE from funcionarios where id_empresa = '${user_id}' and id = '${del}' `, function(err) {
      if (err) res.render('error')
      res.redirect(`/admin/${user_id}/funcionarios`)
    })
  }

});

module.exports = router;
