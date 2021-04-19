const Empresa = require("../models/Empresa");

module.exports = {

  mostrarMenuEnvios: function (req,res){
    var id = req.params.id;
    var user_id = req.user.id;
    var nome = req.user.nome_empresa;
    if(user_id == id) {
      res.render('admin-enviar', {user_id, nome})
    }
  },

  mostrarValoresMensais: function (req,res) {
    var id = req.params.id;
    var user_id = req.user.id;
    var nome = req.user.nome_empresa;
    Empresa.selecionarFuncionarios(user_id, function(err, funcionarios, fields) {
      if (err) res.render('error')
      if(user_id == id) {
        res.render('admin-editar', {user_id, funcionarios, nome})
      }
      else res.redirect('/')
    })
  },

  editarValoresMensais: function (req,res) {
    var id = req.params.id;
    var user_id = req.user.id;
    var user = req.body.user;
    var value = req.body.value;
  
    if(user_id == id) {
      Empresa.editarValorMensal(user_id, value, user, function(err) {
        if (err) res.render('error')
        res.redirect(`/admin/${user_id}/enviar/editar`)
      })
    }
  },

  mostrarInterfaceEnvioMensal: function (req,res) {
    var id = req.params.id;
    var user_id = req.user.id;
    var nome = req.user.nome_empresa;
    Empresa.selecionarFuncionarios(user_id, function(err, funcionarios, fields) {
      if (err) res.render('error')
      Empresa.selecionarUltimoEnvioMensal(user_id, function(err, envio, fields) {
        if (err) res.render('error')
        if(user_id == id) {
          res.render('admin-mensal', {user_id, funcionarios, nome, envio})
        }
        else res.redirect('/')
  
      })
    })
  },

  efetuarEnvioMensal: function (req,res) {
    var id = req.params.id;
    var user_id = req.user.id;
  
    if(user_id == id) {
      Empresa.selecionarFuncionarios(user_id, function(err, funcionarios, fields) {
        if (err) res.render('error')
        Empresa.enviarOutflowMensal(user_id, funcionarios);
        Empresa.catalogarEnvioMensal(user_id);
        res.redirect(`/admin/${user_id}/enviar/historico`)
      })
    }
  },

  mostrarInterfaceEnvioIndividual: function (req,res) {
    var id = req.params.id;
    var user_id = req.user.id;
    var nome = req.user.nome_empresa;
    Empresa.selecionarFuncionarios(user_id, function(err, funcionarios, fields) {
      if (err) res.render('error')
      if(user_id == id) {
        res.render('admin-individual', {user_id, funcionarios, nome})
      }
      else res.redirect('/')
    })
  },

  efetuarEnvioIndividual: function (req,res) {
    var id = req.params.id;
    var user_id = req.user.id;
    var user = req.body.user;
    var value = req.body.value;
  
    if(user_id == id) {
      Empresa.selecionarNomeFuncionario(user, function(err, username, fields) {
        if (err) res.render('error');
        var name = username[0].nome;
        Empresa.enviarOutflowIndividual(user_id, value, user);
        Empresa.catalogarEnvioIndividual(name, user_id, value);
        res.redirect(`/admin/${user_id}/enviar/historico`);
      })
  
    }
  },

  mostrarHistoricoEnvios: function (req,res) {
    var id = req.params.id;
    var user_id = req.user.id;
    var nome = req.user.nome_empresa;
    Empresa.mostrarHistoricoEnvioMensal(user_id, function(err, mensal, fields) {
      if (err) res.render('error', {err})
      Empresa.mostrarHistoricoEnvioIndividual(user_id, function(err, individual, fields) {
        if (err) res.render('error', {err})
        if(user_id == id) {
          res.render('admin-historico', {user_id, mensal, individual, nome})
        }
        else res.redirect('/')
      })
    })
  },

}