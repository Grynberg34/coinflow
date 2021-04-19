const express = require('express');
const router = express.Router();
const CadastroEmpresaController = require('../controllers/CadastroEmpresaController');
const CadastroFuncionarioController = require ('../controllers/CadastroFuncionarioController');

function checkAuthentication(req,res,next){
  if (req.isAuthenticated()) {
    if(req.user.tipo_conta == 'user'){
      res.redirect('/user');
    }
  
    else if (req.user.tipo_conta == 'admin') {
      res.redirect('/admin');
    }
  }
  else{
    next()
  }
}

router.get('/', checkAuthentication, function(_, res) {
  res.render('cadastro');
});


router.get('/empresa', checkAuthentication, function(_, res) {
  res.render('cadastro_empresa');
});


router.post('/empresa', CadastroEmpresaController.cadastrar);

router.get('/funcionario', checkAuthentication, function(_, res) {
  res.render('cadastro_funcionario');
});


router.post('/funcionario', CadastroFuncionarioController.cadastrar);

module.exports = router;
