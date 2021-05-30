const Empresa = require("../models/Empresa");

module.exports= {
  
  mostrarTransferenciasTodas: function (req,res) {
    var id = req.params.id;
    var nome = req.user.nome_empresa;
    var user_id = req.user.id;

    Empresa.selecionarTransferenciasTodas(user_id, function(err, transferencias){
      if (err) res.render('error');
      else {
        if(user_id == id) {
          res.render('admin-transferencias', {user_id, nome, transferencias})
        }
        else res.redirect('/')
      }
    })

  }

}