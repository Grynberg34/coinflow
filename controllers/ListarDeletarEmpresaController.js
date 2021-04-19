const Empresa = require("../models/Empresa");

module.exports = {

  listarFuncionarios: function (req,res) {
    var id = req.params.id;
    var user_id = req.user.id;
    var nome = req.user.nome_empresa;
    var codigo = req.user.codigo_cadastro;
  
    Empresa.selecionarFuncionarios(user_id, function(err, funcionarios, fields) {
      if (err) res.render('error')
      if(user_id == id) {
        res.render('admin-funcionarios', {user_id, funcionarios, nome, codigo})
      }
      else res.redirect('/')
    })
  },

  deletarFuncionarios: function (req,res) {
    var id = req.params.id;
    var user_id = req.user.id;
    var del = req.body.del;
  
    if(user_id == id) {
      Empresa.deletarFuncionario(user_id, del, function(err) {
        if (err) res.render('error')
        res.redirect(`/admin/${user_id}/funcionarios`)
      })
    }
  }

}