const express = require('express');
const router = express.Router();
const CadastroEmpresaController = require('../controllers/CadastroEmpresaController');
const CadastroFuncionarioController = require('../controllers/CadastroFuncionarioController');



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

router.get('/',checkAuthentication, function(_, res) {
  res.redirect('/login')
});

router.get('/empresa',checkAuthentication, function(_, res) {
  res.render('redefinir_empresa')
});

router.post('/empresa', CadastroEmpresaController.pedirRedefinicaoSenha);

router.get('/codigo/empresa',checkAuthentication, function(_, res) {
  res.render('code_empresa')
});

router.post('/codigo/empresa', CadastroEmpresaController.mudarSenha);

router.get('/funcionario',checkAuthentication, function(_, res) {
  res.render('redefinir_funcionario')
});

router.post('/funcionario', CadastroFuncionarioController.pedirRedefinicaoSenha);

router.get('/codigo/funcionario',checkAuthentication, function(_, res) {
  res.render('code_funcionario')
});

router.post('/codigo/funcionario', CadastroFuncionarioController.mudarSenha);

module.exports = router;
