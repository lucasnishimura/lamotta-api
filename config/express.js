//imorta a biblioteca express
var express = require('express');

//imorta a biblioteca do expressload (carrega as rotas automaticamente)
var load = require('express-load');

//carega o body parse que trata o recebimento via post
var bodyParser = require('body-parser');

//carega o body parse que trata o recebimento via post
var expressValidator = require('express-validator');

//carega o body parse que trata o recebimento via post
var md5 = require('md5');

session = require('express-session');

require("dotenv-safe").load();
jwt = require('jsonwebtoken');


require('../app/routes/auth')
//module eh a variavel que referencia o objeto em si, exports que a funcao que vc quer que retorne, 
module.exports = function(){

    var app = express();

    app.use(session({
        secret: '2C44-4D44-WppQ38S',
        resave: true,
        saveUninitialized: true,
        maxAge: Date.now() + (30 * 86400 * 1000)
    }));


    //faz a inser��o de recursos est�ticos, static � um middleware do express
    app.use(express.static('./app/public'));
    app.use(express.static('./'));
    
    //define uma string chamada 'view engine' e o nome da engine instalada 'EJS' (embeed javascript)
    app.set('view engine','ejs');
    
    //diz aonde ficam as views, caso não especifique, ele procura as views na pasta views que deve se encontrar na raiz do projeto
    app.set('views','./app/views');
    
    //recebe fun��es que ser�o aplicadas no requeest na ordem que definimos abaixo
    app.use(bodyParser.urlencoded({extended: true})); 
    //Caso não encontre um formul�rio enviado via form, procura um enviado via json
    app.use(bodyParser.json());
    
    app.use(expressValidator());
   
    //load('routes').into(app); com isso queremos dizer que "routes deve ser carregado dentro da app", podemos encadear outras informa��es junto
    load('routes',{cwd: 'app'}) //para n�o procurar no sistema inteiro o 'cwd' indica dentro de qual pasta ele deve procurar
    .then('infra') //significa que depois de carregar as rotas "Ent�o" carregue tudo dentro de infra
    .into(app);
    
    // se n�o existir a p�gina chama essa
    app.use(function(req,res,next){
        res.status(404).render('erros/404');
        next();
    })

    app.use(function(error,req,res,next){
        if(process.eventNames.NODE_ENV == 'production'){
            res.status(500).render('erros/500');
            return;
        }
        next(error);
    })

    return app;
}
