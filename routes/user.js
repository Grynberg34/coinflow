const express = require('express');
const EnviosFuncionarioController = require('../controllers/EnviosFuncionarioController');
const MenuFuncionarioController = require('../controllers/MenuFuncionarioController');
const RecompensasFuncionarioController = require('../controllers/RecompensasFuncionarioController');
const TransferenciasFuncionarioController = require('../controllers/TransferenciasFuncionarioController');
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

router.get('/:id/recompensas', checkAuthentication, RecompensasFuncionarioController.mostrarMenuRecompensas);

router.get('/:id/recompensas/visualizar', checkAuthentication, RecompensasFuncionarioController.mostrarRecompensas);

router.post('/:id/recompensas/visualizar', checkAuthentication, RecompensasFuncionarioController.resgatarRecompensa);

router.get('/:id/recompensas/resgates', checkAuthentication, RecompensasFuncionarioController.mostrarResgates);

router.get('/:id/transferencias', checkAuthentication, TransferenciasFuncionarioController.mostrarMenuTransferencias);

router.get('/:id/transferencias/minhas', checkAuthentication, TransferenciasFuncionarioController.mostrarTransferenciasFuncionario);

router.get('/:id/transferencias/todas', checkAuthentication, TransferenciasFuncionarioController.mostrarTransferenciasTodas);

module.exports = router;
