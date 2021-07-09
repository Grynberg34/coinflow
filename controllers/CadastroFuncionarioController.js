const bcrypt = require('bcrypt');
const Funcionario = require('../models/Funcionario');
const nodemailer = require ('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

module.exports= {

  cadastrar: function(req,res) {

    var name = req.body.name;
    var email = req.body.email;
    var code = req.body.code;
    var password = req.body.password;
    var repeat = req.body.repeatpassword;
    var userexists = "Esse email ou nome já foi utilizado por outro usuário.";
    var passdontmatch = "As senhas não coincidem.";
    var invalidcode = 'Código da empresa inválido.';
  
    Funcionario.checarCodigo(code, function (err, empresa, fields) {
      if (err || empresa.length < 1) res.status(400).render('cadastro_funcionario', {invalidcode})
      else {
        if (password == repeat) {
          var id_empresa = empresa[0].id;
          Funcionario.checarDuplicado(email, function (err, rows, fields) {
            if (rows[0].number > 0) {
              res.status(400).render('cadastro_funcionario', {userexists})
            } 
            else {
              var hashedpassword = bcrypt.hashSync(password, 10);
              Funcionario.salvarDadosCadastrais(name, email, id_empresa,hashedpassword, function (err) {
                if (err) res.status(400).render('cadastro_funcionario', {userexists})
                else {
                res.status(302).redirect('/login/funcionario')}
              });
            }
          })
  
        } 
        else res.status(400).render('cadastro_funcionario', {passdontmatch}) 
      }
  
    })
  },

  pedirRedefinicaoSenha: function (req,res) {
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

    var email = req.body.email;
    var emailnotfound = 'não existe nenhuma conta de funcionário registrada com esse email'
    
    Funcionario.checarFuncionario(email, function(err, rows) {
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

  },

  mudarSenha: function (req,res) {

    var code = req.flash('code');
    var email = req.flash('email');
    var emailcode = req.body.code;
    var password = req.body.password;
    var repeat = req.body.repeatpassword;
    var message = 'senhas não coincidem';
    var message2 = 'código errado, tente novamente';
    var hashedpassword = bcrypt.hashSync(password, 10);
    if (password == repeat){
      if (code == emailcode) {
        Funcionario.salvarSenha(email, hashedpassword);
        return res.render('success');
      } 
      else 
      console.log(code);
      return res.render('redefinir_funcionario', {message2})
    } else return res.render('redefinir_funcionario', {message})
  }
}