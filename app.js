const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('connect-flash');
const connection = require('./db/connection');
var MySQLStore = require('mysql-express-session')(session);

const indexRouter = require('./routes/index');
const cadastroRouter = require('./routes/cadastro');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const redefinirRouter = require('./routes/redefinir');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const sobreRouter = require('./routes/sobre');
const contatoRouter = require('./routes/contato');

const app = express();

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Express configs
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => { 
  if ((req.headers["x-forwarded-proto"] || "").endsWith("http"))
  res.redirect(`https://${req.hostname}${req.url}`);
  else
  next();
});


var sessionStore = new MySQLStore({}, connection);

//Passport configs
app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie : {
    maxAge: 1000* 60 * 60 *24 * 365
  },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.serializeUser(function(user, done) {
  done(null, {
    id     : user.id,
    tipo_conta : user.tipo_conta,
    isAdmin : user.tipo_conta == 'admin'
  });
});

passport.deserializeUser(function(user, done) {
  var table = user.isAdmin ? 'empresas' : 'funcionarios';
  connection.query(`select * from ${table} where id = `+user.id,function(err,rows){	
    done(err, rows[0]);
  });
});



// Local Strategy
passport.use('empresas', new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true,
},
function(req, username, password, done) {
  let sql = 'SELECT * FROM empresas WHERE email = ?';
  connection.query(sql, [username], function(err, rows) {
    if (err)
      return done(err);
    if (!rows.length) {
      return done(null, false, req.flash('message', 'email inválido'));
    }
    bcrypt.compare(password, rows[0].hashedpassword, function(err, isMatch) {
      if(err)
        return done(err);
      if(isMatch){
        return done(null, rows[0]);
      } else {
        return done(null, false, req.flash('message', 'senha inválida'));
      }
    });
  });
}));


passport.use('funcionarios', new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true,
},
function(req, username, password, done) {
  let sql = 'SELECT * FROM funcionarios WHERE email = ?';
  connection.query(sql, [username], function(err, rows) {
    if (err)
      return done(err);
    if (!rows.length) {
      return done(null, false, req.flash('message', 'Usuário inválido.'));
    }
    bcrypt.compare(password, rows[0].hashedpassword, function(err, isMatch) {
      if(err)
        return done(err);
      if(isMatch){
        return done(null, rows[0]);
      } else {
        return done(null, false, req.flash('message', 'Senha inválida.'));
      }
    });
  });
}));


//Routes
app.use('/', indexRouter);
app.use('/cadastro', cadastroRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/redefinir', redefinirRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/sobre', sobreRouter);
app.use('/contato', contatoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {err});
});

module.exports = app;
