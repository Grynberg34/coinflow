const express = require('express');
const router = express.Router();
const MenuEmpresaController = require("../controllers/MenuEmpresaController");
const EnviosEmpresaController = require('../controllers/EnviosEmpresaController');
const ListarDeletarEmpresaController = require('../controllers/ListarDeletarEmpresaController');
const RecompensasEmpresaController = require('../controllers/RecompensasEmpresaController');

function checkAuthentication(req,res,next){
  if (req.isAuthenticated()) {
    if(req.user.tipo_conta == 'user'){
      res.redirect('/user');
    }
  
    else if (req.user.tipo_conta == 'admin') {
      next()
    }
  }
  else{
    res.redirect('/');
  }
}

router.get('/', checkAuthentication, function(req, res) {
  var user_id = req.user.id;
  res.redirect(`/admin/${user_id}`)
});
 
router.get('/:id', checkAuthentication, MenuEmpresaController.mostrarMenuInicial);

router.get('/:id/funcionarios', checkAuthentication, ListarDeletarEmpresaController.listarFuncionarios);

router.post('/:id/funcionarios', checkAuthentication, ListarDeletarEmpresaController.deletarFuncionarios);

router.get('/:id/enviar', checkAuthentication, EnviosEmpresaController.mostrarMenuEnvios);

router.get('/:id/enviar/editar', checkAuthentication, EnviosEmpresaController.mostrarValoresMensais);

router.post('/:id/enviar/editar', checkAuthentication, EnviosEmpresaController.editarValoresMensais);

router.get('/:id/enviar/mensal', checkAuthentication, EnviosEmpresaController.mostrarInterfaceEnvioMensal);

router.post('/:id/enviar/mensal', checkAuthentication, EnviosEmpresaController.efetuarEnvioMensal);

router.get('/:id/enviar/individual', checkAuthentication, EnviosEmpresaController.mostrarInterfaceEnvioIndividual);

router.post('/:id/enviar/individual', checkAuthentication,  EnviosEmpresaController.efetuarEnvioIndividual);

router.get('/:id/enviar/historico', checkAuthentication, EnviosEmpresaController.mostrarHistoricoEnvios);

router.get('/:id/recompensas', checkAuthentication, RecompensasEmpresaController.mostrarMenuRecompensas);

router.get('/:id/recompensas/adicionar', checkAuthentication, RecompensasEmpresaController.mostrarInterfaceAdicionarRecompensa);

router.post('/:id/recompensas/adicionar', checkAuthentication, RecompensasEmpresaController.adicionarImagemRecompensa, RecompensasEmpresaController.adicionarRecompensa);

router.get('/:id/recompensas/estoque', checkAuthentication, RecompensasEmpresaController.mostrarEstoque);

router.post('/:id/recompensas/estoque', checkAuthentication, RecompensasEmpresaController.editarEstoqueRecompensas);

router.get('/:id/recompensas/remover', checkAuthentication, RecompensasEmpresaController.mostrarInterfaceRemoverRecompensas);

router.post('/:id/recompensas/remover', checkAuthentication, RecompensasEmpresaController.removerRecompensas);

module.exports = router;
