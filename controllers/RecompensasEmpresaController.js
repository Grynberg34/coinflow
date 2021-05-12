const Recompensa = require('../models/Recompensa');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/recompensas')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  dest: 'public/images/recompensas',
  storage: storage,
  limits: {
  fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
  if (!file.originalname.match(/\.(png|jpg)$/)){
    cb(new Error('Formato inválido.'), false)
  }
  else {
    cb(undefined, true)}
  }
})

module.exports = {

  mostrarMenuRecompensas: function(req,res) {
    var id = req.params.id;
    var user_id = req.user.id;
    var nome = req.user.nome_empresa;
    if(user_id == id) {
      res.render('admin-recompensas', {user_id, nome})
    }
  },

  mostrarInterfaceAdicionarRecompensa: function(req,res) {
    var id = req.params.id;
    var user_id = req.user.id;
    var nome_empresa = req.user.nome_empresa;
    if(user_id == id) {
      res.render('admin-adicionar', {user_id, nome_empresa})
    }
  },

  adicionarImagemRecompensa: upload.single('img'),

  adicionarRecompensa: function (req,res) {
    var id = req.params.id;
    var user_id = req.user.id;
    var nome_empresa = req.user.nome_empresa;
    var name = req.body.name;
    var categoria = req.body.categoria;
    var preço = req.body.preço;
    var estoque = req.body.estoque;
    var filename = req.file.filename;
    var adicionada = 'Recompensa adicionada com sucesso';
  
    if(user_id == id) {
      Recompensa.salvarRecompensa(name, categoria, preço, estoque, user_id, filename, function(err, fields) {
        if (err) res.render('error', {err})
        res.render('admin-adicionar', {adicionada, user_id, name, nome_empresa});
      })
    }
  },

  mostrarEstoque: function(req,res) {
    var id = req.params.id;
    var user_id = req.user.id;
    var nome = req.user.nome_empresa;
    if(user_id == id) {
      Recompensa.selecionarRecompensas(user_id, function(err, recompensas, fields) {
        if (err) res.render('error', {err})
        res.render('admin-estoque', {user_id, recompensas, nome})
      })
    }
  },

  editarEstoqueRecompensas: function(req,res) {
    var id = req.params.id;
    var user_id = req.user.id;
    var rec = req.body.rec;
    var value = req.body.value;
  
    if(user_id == id) {
      Recompensa.editarEstoqueRecompensa(user_id,rec,value , function(err) {
        if (err) res.render('error')
        res.redirect(`/admin/${user_id}/recompensas/estoque`)
      })
    }
  },

  mostrarInterfaceRemoverRecompensas: function (req,res) {
    var id = req.params.id;
    var user_id = req.user.id;
    var nome = req.user.nome_empresa;
    if(user_id == id) {
      Recompensa.selecionarRecompensas(user_id, function(err, recompensas, fields) {
        if (err) res.render('error', {err})
        res.render('admin-remover', {user_id, recompensas, nome})
      })
    }
  },

  removerRecompensas: function (req,res) {
    var id = req.params.id;
    var user_id = req.user.id;
    var del = req.body.del;
  
    if(user_id == id) {
      Recompensa.removerRecompensa(user_id, del, function(err) {
        if (err) res.render('error', {err})
        res.redirect(`/admin/${user_id}/recompensas/remover`)
      })
    }
  },

  mostrarResgates: function (req,res) {
    var id = req.params.id;
    var user_id = req.user.id;
    var nome = req.user.nome_empresa;

    if(user_id == id) {
      Recompensa.mostrarTodasRecompensasResgatadas(user_id, function (err, recompensas, fields) {
        if (err) res.render('error');
        res.render('admin-resgates', {user_id, nome, recompensas})
      })
    }
    else res.redirect('/')

  },

  confirmarEntregaRecompensa: function(req,res) {
    var id = req.params.id;
    var user_id = req.user.id;
    var res_id = req.body.res_id;


    if (user_id == id) {

      Recompensa.confirmarEntrega(user_id, res_id, function (err) {
        if (err) res.render ('error');
        res.redirect(`/admin/${user_id}/recompensas/resgates`)
        
  
      })

    }
    else redirect('/');

  }

}