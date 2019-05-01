module.exports = function(app){
  app.get('/login',function(req,res){
    //a funcao send cospe o dado na tela
    res.render("coreui/login",{mensagem: null,token: req.params.token});   
  })

  app.post('/login',function(req,res){
    var connection = app.infra.dbConnection();
    var loginBanco = new app.infra.loginBanco(connection);

    //dados do post
    var dados_form = req.body;
    
    req.assert('nome','Nome é obrigatório').notEmpty();
    req.assert('senha','A senha é obrigatória').notEmpty();
    
    var erros = req.validationErrors();
  
    if(erros){
        res.format({
            html: function(){
                res.status(400).render('coreui/login',{errosValidacao : erros, loginInfo : dados_form});
            },
            json: function(){
                res.status(400).json(erros);
            }
        })
        return false;
      }
      
      loginBanco.lista(dados_form,function(err,results){
        if(!err){
          if(results.length > 0){
                       // res.redirect('/');
            const id = 1; //esse id viria do banco de dados
            var token = jwt.sign({ id },process.env.SECRET, {
            expiresIn: 3000 
            // expiresIn: 300 // expires in 5min
            });
            res.status(200).send({ auth: true, token: token});
            
          }else{
            // caso não ache o usuário cai na primeira condição
            res.status(400).send({ auth: false, token: null });
          }
        }else{
          res.format({
              html: function(){
                  res.status(400).render('coreui/login',{errosValidacao : err});
                  console.log(err)
              },
              json: function(){
                  res.status(400).json(erros);
              }
          })
          return false;
        }
        
    })  
  })
}