const Recompensa = require('../models/Recompensa');

module.exports = {
    mostrarMenuRecompensas: function (req,res) {
        var id = req.params.id;
        var user_id = req.user.id;
        var nome = req.user.nome;

        if(user_id == id) {
            res.render('user-recompensas', {user_id, nome})
          }
        else res.redirect('/')
    },

    mostrarRecompensas: function (req,res) {
        var id = req.params.id;
        var user_id = req.user.id;
        var empresa_id = req.user.id_empresa;
        var nome = req.user.nome;
        var flowin = req.user.flowin;

        Recompensa.selecionarRecompensasDisponiveis (empresa_id, function (err, recompensas, fields) {
            if (err) res.render('error');
            if(user_id == id) {
                res.render('user-visualizar', {user_id, nome, recompensas, flowin})
              }
            else res.redirect('/')
        })


    },

    resgatarRecompensa: function(req,res) {
        var id = req.params.id;
        var user_id = req.user.id;
        var empresa_id = req.user.id_empresa;
        var nome = req.user.nome;
        var flowin = req.user.flowin;
        var rec_id = req.body.rec_id;

        Recompensa.checarRecompensa(rec_id, empresa_id, function (err, recompensa, fields) {
            if (err) res.redirect(`/user/${user_id}/recompensas/visualizar`)
            else {
                if (flowin >= recompensa[0].preço && user_id == id) {
                    Recompensa.registrarResgateRecompensa(user_id, empresa_id, recompensa, nome);
                    Recompensa.descontarFlowin(user_id, recompensa);
                    Recompensa.darBaixaEstoque(recompensa);
                    res.redirect(`/user/${user_id}/recompensas/resgates`)

                }
                else {

                    res.redirect(`/user/${user_id}/recompensas/visualizar`)

                }
            }
        })


    }
}