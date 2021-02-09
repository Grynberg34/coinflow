const express = require('express');
const router = express.Router();

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

module.exports = router;
