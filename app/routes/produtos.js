// var multer  = require('multer')

// var upload = multer({ dest: 'app/public/uploads/' }) #não precisa descomentar

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'app/public/uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
//   })
  
// var upload = multer({ storage: storage })

module.exports = function(app){
    //Rotas
    
    app.get('/produtos',function(req,res){
        
        var connection = app.infra.dbConnection();
        var produtosBanco = new app.infra.produtosBanco(connection);

        produtosBanco.lista(function(err,results,next){
            if(err){
                return res.status(400).send({success: false, data: err});
            }
            
            connection.end();
            return res.status(200).send({success: true, data: results});
        });
    })

    // app.post('/produtos',upload.single('avatar'),function(req,res){
    app.post('/produtos',function(req,res){
        var connection = app.infra.dbConnection();
        var produtosBanco = new app.infra.produtosBanco(connection);

        // var nome_imagem = req.file.originalname;
        // var caminho_imagem = req.file.destination;

        var dados_form = req.body;
        // var dados_form = {
        //     'nome' : req.body.nome,
        //     'preco' : req.body.preco,
        //     'descricao' : req.body.descricao,
        //     'status': req.body.status,
        //     'imagem' : caminho_imagem+'/'+nome_imagem
        // };

        req.assert('nome','Nome é obrigatório').notEmpty();
        req.assert('preco','Preco vazio').notEmpty();
        req.assert('preco','Formato inválido').isFloat();
        
        var erros = req.validationErrors();
        if(erros){
            return res.status(400).send({success: false, data: erros});
        }

        produtosBanco.salva(dados_form,function(err,results){
            if(err){
                return res.status(400).send({success: false, data: err});
            }else{
                return res.status(200).send({success: true, data: results});
            }
        })

    })

    app.get('/produtos/:id?',function(req,res){ 
        var connection = app.infra.dbConnection();
        var produtosBanco = new app.infra.produtosBanco(connection);

        produtosBanco.ver(req.params,function(err,results,next){
            if(err){
                return res.status(400).send({success: false, data: err});
            }else{
                connection.end();
                return res.status(200).send({success: true, data: results});
            }
        });
    })
    
    // app.post('/produtos/ver',upload.single('avatar'),function(req,res){
    app.put('/produtos',function(req,res){
        var connection = app.infra.dbConnection();
        var produtosBanco = new app.infra.produtosBanco(connection);
        
        // var nome_imagem = req.file.originalname;
        // var caminho_imagem = req.file.destination;

        var dados_form = req.body;
        // var dados_form = {
        //     'id' : req.body.id,
        //     'nome' : req.body.nome,
        //     'preco' : req.body.preco,
        //     'descricao' : req.body.descricao,
        //     'imagem' : '/'+caminho_imagem+'/'+nome_imagem
        // };
        
        req.assert('nome','Nome é obrigatório').notEmpty();
        req.assert('preco','Preco vazio').notEmpty();
        req.assert('preco','Formato inválido').isFloat();
        
        var erros = req.validationErrors();
        if(erros){
            return res.status(400).send({success: false, data: erros});
        }
        
        produtosBanco.altera(dados_form,function(err,results){
            if(err){
                return res.status(400).send({success: false, data: err});
            }else{
                return res.status(200).send({success: true, data: results});
            }
            
        })        
    })

}