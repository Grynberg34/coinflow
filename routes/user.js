const express = require('express');
const EnviosFuncionarioController = require('../controllers/EnviosFuncionarioController');
const MenuFuncionarioController = require('../controllers/MenuFuncionarioController');
const router = express.Router();

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

router.get('/:id', checkAuthentication, MenuFuncionarioController.mostrarMenuInicial);

router.get('/:id/enviar', checkAuthentication, EnviosFuncionarioController.mostrarMenuEnvioOutflow);

router.post('/:id/enviar', checkAuthentication, EnviosFuncionarioController.enviarOutflow);

module.exports = router;
