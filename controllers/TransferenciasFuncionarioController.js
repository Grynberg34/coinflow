const Funcionario = require('../models/Funcionario');


module.exports= {
  
  mostrarMenuTransferencias: function (req,res) {
    var id = req.params.id;
    var user_id = req.user.id;
    var nome = req.user.nome;

    if(user_id == id) {
        res.render('user-transferencias', {user_id, nome})
      }
    else res.redirect('/')
  },

  mostrarTransferenciasFuncionario: function (req,res) {
    var id = req.params.id;
    var user_id = req.user.id;
    var nome = req.user.nome;
    var id_empresa = req.user.id_empresa;

    Funcionario.selecionarTransferenciasEnviadas(id_empresa, user_id, function (err, enviadas){
      if (err) res.render('error');
      else {
        Funcionario.selecionarTransferenciasRecebidas(id_empresa, user_id, function (err, recebidas){
          if (err) res.render('error');
          else {
            if(user_id == id) {
              res.render('user-transferencias-minhas', {user_id, nome, enviadas, recebidas})
            }
            else res.redirect('/')
          }
        })
      }

    })

  },

  mostrarTransferenciasTodas: function (req,res) {
    var id = req.params.id;
    var nome = req.user.nome;
    var user_id = req.user.id;
    var id_empresa = req.user.id_empresa;

    Funcionario.selecionarTransferenciasTodas(id_empresa, function(err, transferencias){
      if (err) res.render('error');
      else {
        if(user_id == id) {
          res.render('user-transferencias-todas', {user_id, nome, transferencias})
        }
        else res.redirect('/')
      }
    })

  }

}