const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const Empresa = require("../models/Empresa");
const nodemailer = require ('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = {
  cadastrar: function(req, res) {

    var name = req.body.name;
    var email = req.body.email;
    var areas = req.body.areas;
    var code = uuidv4();
    var password = req.body.password;
    var repeat = req.body.repeatpassword;
    var userexists = "esse email já foi utilizado por outro usuário";
    var passdontmatch = "as senhas não coincidem";
  
      

    if (password == repeat) {
  
      Empresa.checarDuplicado(email, function(err,rows){

        if (rows[0].number > 0) {
          res.render('cadastro_empresa', {userexists});
        } 
        
        else {
          var hashedpassword = bcrypt.hashSync(password, 10);
          Empresa.salvarDadosCadastrais(name, email, areas, code, hashedpassword, function (err) {
          if (err) res.render('cadastro_empresa', {userexists});
          else {
          res.redirect('/login/empresa')};
          });
        }
        
      })

    }
  
    else res.render('cadastro_empresa', {passdontmatch}) 

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
    var emailnotfound = 'não existe uma conta de empresa registrada com esse email.'
    
    Empresa.selecionarEmpresa(email, function(err, rows) {
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
  },

  mudarSenha: function (req,res) {
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
        Empresa.salvarSenha(email, hashedpassword);
        return res.render('success')
      } 
      else 
      console.log(code);
      return res.render('redefinir_empresa', {message2})
    } else return res.render('redefinir_empresa', {message})
  },

}