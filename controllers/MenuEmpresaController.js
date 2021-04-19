
module.exports = {

  mostrarMenuInicial: function (req,res) {
    var id = req.params.id;
    var user_id = req.user.id;
    var nome = req.user.nome_empresa;
    if(user_id == id) {
      res.render('admin', {user_id, nome})
    }
    else res.redirect('/')
  }

}