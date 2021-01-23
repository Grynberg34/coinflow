const express = require('express');
const router = express.Router();
const passport = require('passport');

function checkAuthentication(req,res,next){
  if (req.isAuthenticated()) {
    if(req.user.tipo_conta == 'user'){
      res.redirect('/user')
    }
  
    else if (req.user.tipo_conta == 'admin') {
      res.redirect('/admin')
    }
  }
  else{
    next()
  }
}

router.get('/', checkAuthentication, function(req, res) {
  res.render('login')
});

router.get('/empresa', checkAuthentication, function(req, res) {
  res.render('login_empresa',  { message: req.flash('message') })
});

router.post('/empresa', passport.authenticate('empresas',{successRedirect:'/admin', failureRedirect: '/login/empresa', failureFlash: true }));


router.get('/funcionario', checkAuthentication, function(req, res) {
  res.render('login_funcionario',  { message: req.flash('message') })
});

router.post('/funcionario', passport.authenticate('funcionarios',{successRedirect:'/user', failureRedirect: '/login/funcionario', failureFlash: true }));

module.exports = router;
