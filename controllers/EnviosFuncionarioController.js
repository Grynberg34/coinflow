const Funcionario = require('../models/Funcionario');


module.exports= {
  
  mostrarMenuEnvioOutflow: function(req,res) {

    var id = req.params.id;
    var user_id = req.user.id;
    var outflow = req.user.outflow;
    var id_empresa = req.user.id_empresa;
    var nome = req.user.nome;
    Funcionario.selecionarOutrosFuncionarios(user_id, id_empresa, function(err, funcionarios, fields) {
      if (err) res.render('error')
      if(user_id == id) {
        res.render('user-enviar', {user_id, funcionarios, nome, outflow})
      }
      else res.redirect('/')
    })
  },

  enviarOutflow: function(req,res) {

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
  
    Funcionario.selecionarOutrosFuncionarios(user_id, id_empresa, function(err, funcionarios, fields) {
      Funcionario.checarExistenciaFuncionario(user, id_empresa, function(err, rows, fields) {
        if (rows[0].number < 1) res.render('user-enviar', {user_id, funcionarios, nome, outflow, notfound})
        else if (user != user.id && value < outflow && user_id == id) {

          Funcionario.enviarOutflow(value, id_empresa, user, user_id, motivo);

          Funcionario.selecionarFuncionarioLogado(id_empresa,user_id, function(err, new_user, fields) {
            if (err) res.render('error')
            var new_outflow = new_user[0].outflow
            res.render('user-enviar', {user_id, funcionarios, nome, new_outflow, saldo})
          })
        }  
        else res.render('user-enviar', {user_id, funcionarios, nome, outflow, insuficiente})
      })
    })
  }
}