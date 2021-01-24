const express = require('express');
const router = express.Router();
const nodemailer = require ('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const connection = require('../db/connection')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  auth: {
    user: 'coinflow.suporte@gmail.com',
    pass: 'rfasddhmogaomwpx'
  },
  tls: {
    rejectUnauthorized: false
  }
}));


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

router.get('/',checkAuthentication, function(_, res) {
  res.redirect('/login')
});

router.get('/empresa',checkAuthentication, function(_, res) {
  res.render('redefinir_empresa')
});

router.post('/empresa', function(req, res) {

  var email = req.body.email;
  var emailnotfound = 'We could not find any registered account with this email.'
  
  connection.query(`SELECT * from empresas where EMAIL = '${email}' `, function(err, rows) {
    if (err)
      console.log(err)
    if (!rows.length) {
      res.render('redefinir_empresa', {emailnotfound})
    }
    else {
      var code = uuidv4();
      req.flash('code', code)
      req.flash('email', email )
      var mailOptions = {
        from: 'Suporte Coinflow coinflow.suporte@gmail.com',
        to: `${email}`,
        subject: 'Criar Nova Senha- Coinflow ',
        text: `Use este código para criar uma nova senha: ${code}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.redirect('/redefinir/codigo/empresa')
    }
  });
});

router.get('/codigo/empresa',checkAuthentication, function(_, res) {
  res.render('code_empresa')
});

router.post('/codigo/empresa', function(req, res) {
  var code = req.flash('code');
  var email = req.flash('email');
  var emailcode = req.body.code;
  var password = req.body.password;
  var repeat = req.body.repeatpassword;
  var message = 'Senhas não coincidem.';
  var message2 = 'Código errado. Tente novamente';
  var hashedpassword = bcrypt.hashSync(password, 10);
  if (password == repeat){
    if (code == emailcode) {
      connection.query(`UPDATE empresas SET hashedpassword = '${hashedpassword}' WHERE email = '${email}'`);
      return res.render('success')
    } 
    else 
    console.log(code);
    return res.render('redefinir_empresa', {message2})
  } else return res.render('redefinir_empresa', {message})
});

router.get('/funcionario',checkAuthentication, function(_, res) {
  res.render('redefinir_funcionario')
});

router.post('/funcionario', function(req, res) {

  var email = req.body.email;
  var emailnotfound = 'We could not find any registered account with this email.'
  
  connection.query(`SELECT * from funcionarios where EMAIL = '${email}' `, function(err, rows) {
    if (err)
      console.log(err)
    if (!rows.length) {
      res.render('redefinir_funcionario', {emailnotfound})
    }
    else {
      var code = uuidv4();
      req.flash('code', code)
      req.flash('email', email )
      var mailOptions = {
        from: 'Suporte Coinflow coinflow.suporte@gmail.com',
        to: `${email}`,
        subject: 'Criar Nova Senha- Coinflow ',
        text: `Use este código para criar uma nova senha: ${code}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.redirect('/redefinir/codigo/funcionario')
    }
  });
});

router.get('/codigo/funcionario',checkAuthentication, function(_, res) {
  res.render('code_funcionario')
});

router.post('/codigo/funcionario', function(req, res) {
  var code = req.flash('code');
  var email = req.flash('email');
  var emailcode = req.body.code;
  var password = req.body.password;
  var repeat = req.body.repeatpassword;
  var message = 'Senhas não coincidem.';
  var message2 = 'Código errado. Tente novamente';
  var hashedpassword = bcrypt.hashSync(password, 10);
  if (password == repeat){
    if (code == emailcode) {
      connection.query(`UPDATE funcionarios SET hashedpassword = '${hashedpassword}' WHERE email = '${email}'`);
      return res.render('success')
    } 
    else 
    console.log(code);
    return res.render('redefinir_funcionario', {message2})
  } else return res.render('redefinir_funcionario', {message})
});


module.exports = router;
