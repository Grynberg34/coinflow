const express = require('express');
const router = express.Router();
const connection = require('../db/connection');
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

function checkAuthentication(req,res,next){
  if (req.isAuthenticated()) {
    if(req.user.tipo_conta == 'user'){
      res.redirect('/user')
    }
  
    else if (req.user.tipo_conta == 'admin') {
      next()
    }
  }
  else{
    res.redirect('/')
  }
}

router.get('/', checkAuthentication, function(req, res) {
  var user_id = req.user.id
  res.redirect(`/admin/${user_id}`)
});
 
router.get('/:id', checkAuthentication, function(req, res) {
  var id = req.params.id;
  var user_id = req.user.id;
  var nome = req.user.nome_empresa;
  if(user_id == id) {
    res.render('admin', {user_id, nome})
  }
  else res.redirect('/')
});

router.get('/:id', checkAuthentication, function(req, res) {
  var id = req.params.id;
  var user_id = req.user.id;
  var nome = req.user.nome_empresa;
  if(user_id == id) {
    res.render('admin', {user_id, nome})
  }
  else res.redirect('/')
});

router.get('/:id/funcionarios', checkAuthentication, function(req, res) {
  var id = req.params.id;
  var user_id = req.user.id;
  var nome = req.user.nome_empresa;
  var codigo = req.user.codigo_cadastro;

  connection.query(`SELECT * FROM funcionarios WHERE id_empresa = '${user_id}' ORDER BY nome ASC `, function(err, funcionarios, fields) {
    if (err) res.render('error')
    if(user_id == id) {
      res.render('admin-funcionarios', {user_id, funcionarios, nome, codigo})
    }
    else res.redirect('/')
  })
});


router.post('/:id/funcionarios', function(req, res) {
  var id = req.params.id;
  var user_id = req.user.id;
  var del = req.body.del;

  if(user_id == id) {
    connection.query(`DELETE FROM funcionarios WHERE id_empresa = '${user_id}' and id = '${del}' `, function(err) {
      if (err) res.render('error')
      res.redirect(`/admin/${user_id}/funcionarios`)
    })
  }

});

router.get('/:id/enviar', checkAuthentication, function(req, res) {
  var id = req.params.id;
  var user_id = req.user.id;
  var nome = req.user.nome_empresa;
  if(user_id == id) {
    res.render('admin-enviar', {user_id, nome})
  }
});

router.get('/:id/enviar/editar', checkAuthentication, function(req, res) {
  var id = req.params.id;
  var user_id = req.user.id;
  var nome = req.user.nome_empresa;
  connection.query(`SELECT * FROM funcionarios WHERE id_empresa = '${user_id}' ORDER BY nome ASC `, function(err, funcionarios, fields) {
    if (err) res.render('error')
    if(user_id == id) {
      res.render('admin-editar', {user_id, funcionarios, nome})
    }
    else res.redirect('/')
  })
});

router.post('/:id/enviar/editar', function(req, res) {
  var id = req.params.id;
  var user_id = req.user.id;
  var user = req.body.user;
  var value = req.body.value;

  if(user_id == id) {
    connection.query(`UPDATE funcionarios SET saldo_mensal = '${value}' WHERE id_empresa = '${user_id}' and id = '${user}' `, function(err) {
      if (err) res.render('error')
      res.redirect(`/admin/${user_id}/enviar/editar`)
    })
  }

});

router.get('/:id/enviar/mensal', checkAuthentication, function(req, res) {
  var id = req.params.id;
  var user_id = req.user.id;
  var nome = req.user.nome_empresa;
  connection.query(`SELECT * FROM funcionarios WHERE id_empresa = '${user_id}' ORDER BY nome ASC `, function(err, funcionarios, fields) {
    if (err) res.render('error')
    connection.query(`SELECT * FROM envios WHERE id_empresa = '${user_id}' and tipo = 'mensal' ORDER BY id DESC LIMIT 1 `, function(err, envio, fields) {
      if (err) res.render('error')
      if(user_id == id) {
        res.render('admin-mensal', {user_id, funcionarios, nome, envio})
      }
      else res.redirect('/')

    })
  })
});

router.post('/:id/enviar/mensal', function(req, res) {
  var id = req.params.id;
  var user_id = req.user.id;

  if(user_id == id) {
    connection.query(`SELECT * FROM funcionarios WHERE id_empresa = '${user_id}' ORDER BY nome ASC `, function(err, funcionarios, fields) {
      if (err) res.render('error')
      for (var i = 0; i < funcionarios.length; i++) {
        connection.query(`UPDATE funcionarios SET outflow = outflow + ${funcionarios[i].saldo_mensal} WHERE id_empresa = '${user_id}' and id = '${funcionarios[i].id}'`)
      }
      connection.query(`INSERT INTO envios (id_empresa, data, tipo) VALUES ('${user_id}', NOW(), 'mensal')`)
      res.redirect(`/admin/${user_id}/enviar/historico`)
    })
  }

});

router.get('/:id/enviar/individual', checkAuthentication, function(req, res) {
  var id = req.params.id;
  var user_id = req.user.id;
  var nome = req.user.nome_empresa;
  connection.query(`SELECT * FROM funcionarios WHERE id_empresa = '${user_id}' ORDER BY nome ASC `, function(err, funcionarios, fields) {
    if (err) res.render('error')
    if(user_id == id) {
      res.render('admin-individual', {user_id, funcionarios, nome})
    }
    else res.redirect('/')
  })
});

router.post('/:id/enviar/individual', function(req, res) {
  var id = req.params.id;
  var user_id = req.user.id;
  var user = req.body.user;
  var value = req.body.value;

  if(user_id == id) {
    connection.query(`SELECT * FROM funcionarios WHERE id = '${user}' and id_empresa = '${user_id}'`, function(err, username, fields) {
      if (err) res.render('error')
      connection.query(`UPDATE funcionarios SET outflow = outflow + '${value}' WHERE id_empresa = '${user_id}' and id = '${user}'`)
      connection.query(`INSERT INTO envios (id_empresa, data, tipo, usuario, valor) VALUES ('${user_id}', NOW(), 'individual', '${username[0].nome}', '${value}')`)
      res.redirect(`/admin/${user_id}/enviar/historico`)
    })

  }

});


router.get('/:id/enviar/historico', checkAuthentication, function(req, res) {
  var id = req.params.id;
  var user_id = req.user.id;
  var nome = req.user.nome_empresa;
  connection.query(`SELECT * FROM envios WHERE id_empresa = '${user_id}' and tipo = 'mensal' ORDER BY id DESC `, function(err, mensal, fields) {
    if (err) res.render('error', {err})
    connection.query(`SELECT * FROM envios WHERE id_empresa = '${user_id}' and tipo = 'individual' ORDER BY id DESC `, function(err, individual, fields) {
      if (err) res.render('error', {err})
      if(user_id == id) {
        res.render('admin-historico', {user_id, mensal, individual, nome})
      }
      else res.redirect('/')
    })
  })
});

router.get('/:id/recompensas', checkAuthentication, function(req, res) {
  var id = req.params.id;
  var user_id = req.user.id;
  var nome = req.user.nome_empresa;
  if(user_id == id) {
    res.render('admin-recompensas', {user_id, nome})
  }
});

router.get('/:id/recompensas/adicionar', checkAuthentication, function(req, res) {
  var id = req.params.id;
  var user_id = req.user.id;
  var nome = req.user.nome_empresa;
  if(user_id == id) {
    res.render('admin-adicionar', {user_id, nome})
  }
});

router.post('/:id/recompensas/adicionar', upload.single('img'), function(req, res) {

  var id = req.params.id;
  var user_id = req.user.id;
  var nome = req.body.nome;
  var categoria = req.body.categoria;
  var preço = req.body.preço;
  var estoque = req.body.estoque;
  var filename = req.file.filename;
  var originalname = req.file.originalname;
  var extension = originalname.substr(-4);
  var adicionada = 'Recompensa adicionada com sucesso';

  if(user_id == id) {
    connection.query(`INSERT INTO recompensas (nome, categoria, preço, estoque, id_empresa, nome_arquivo, extensão_arquivo) VALUES ('${nome}', '${categoria}', '${preço}', '${estoque}', '${user_id}', '${filename}', '${extension}') `, function(err, fields) {
      if (err) res.render('error', {err})
      res.render('admin-adicionar', {adicionada, user_id, nome})
    })
  }
})

router.get('/:id/recompensas/estoque', checkAuthentication, function(req, res) {
  var id = req.params.id;
  var user_id = req.user.id;
  var nome = req.user.nome_empresa;
  if(user_id == id) {
    connection.query(`SELECT * FROM recompensas WHERE id_empresa = '${user_id}'`, function(err, recompensas, fields) {
      if (err) res.render('error', {err})
      res.render('admin-estoque', {user_id, recompensas, nome})
    })
  }
});

router.post('/:id/recompensas/estoque', function(req, res) {
  var id = req.params.id;
  var user_id = req.user.id;
  var rec = req.body.rec;
  var value = req.body.value;

  if(user_id == id) {
    connection.query(`UPDATE recompensas SET estoque = '${value}' WHERE id_empresa = '${user_id}' and id = '${rec}' `, function(err) {
      if (err) res.render('error')
      res.redirect(`/admin/${user_id}/recompensas/estoque`)
    })
  }

});



module.exports = router;
