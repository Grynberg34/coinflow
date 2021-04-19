module.exports= {
    
  mostrarMenuInicial: function (req,res) {

    var id = req.params.id;
    var user_id = req.user.id;
    var nome = req.user.nome;
    var outflow = req.user.outflow;
    var flowin = req.user.flowin;
    if(user_id == id) {
      res.render('user', {user_id, nome, flowin, outflow})
    }
    else res.redirect('/')
  },

}