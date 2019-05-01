auth = function(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token){
    res.format({
      html: function(){
          //precisamos passar no segundo parametro um array com os resultados
          res.render("coreui/login");   
      },
      json: function(){
          return res.status(401).send({ auth: false, message: 'No token provided.' });
      }
  })
  } 
    
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}
// auth = function(req, res, next) {
//     if (req.session && req.session.user === "amy" && req.session.admin)
//       return next();
//     else
//       return res.render('coreui/login');
//       // return res.sendStatus(401);
// }
