module.exports = function(app){
    
    app.get('/clientes',function(req,res){
        var connection = app.infra.dbConnection();
        var clientesBanco = new app.infra.clientesBanco(connection);

        clientesBanco.lista(function(erros,resultados){
            if(erros){
                console.log(erros)
                console.log('Erro no banco de dados');
                return res.status(500).send({success: true, data: erros});
            }

            connection.end();
            return res.status(200).send({success: true, data: resultados});
        })
    })
    
    app.post('/clientes',function(req,res){
        var connection = app.infra.dbConnection();
        var clientesBanco = new app.infra.clientesBanco(connection);
        
        var dados_form = req.body;
        req.assert('nome','Nome é obrigatório').notEmpty();       
        req.assert('email','Email é obrigatório').notEmpty();       
        req.assert('telefone','Telefone é obrigatório').notEmpty();       
        
        var erros = req.validationErrors();

        if(erros){
            return res.status(400).send({success: false, data: erros});
        }

        clientesBanco.salva(dados_form,function(err,results){
            if(!err){
                return res.status(200).send({auth:true,data: results}); 
            }else{
                return res.status(400).send({auth:false, data: err}); 
            }
        })        
    })

    app.get('/clientes/:id?',function(req,res){
        var connection = app.infra.dbConnection();
        var clientesBanco = new app.infra.clientesBanco(connection);
    
        dados_cliente = req.params;
        
        clientesBanco.ver(dados_cliente,function(erros,resultados){
            if(erros){
                return res.status(400).send({success: false, data: erros});
            }

            connection.end();
            return res.status(200).send({success: true, data: resultados});
        })

    })

    app.put('/clientes',function(req,res){
        var connection = app.infra.dbConnection();
        var clientesBanco = new app.infra.clientesBanco(connection);
        
        req.assert('nome','Nome é obrigatório').notEmpty();       
        req.assert('email','Email é obrigatório').notEmpty();       
        req.assert('telefone','Telefone é obrigatório').notEmpty();       
        var erros = req.validationErrors();
        
        if(erros){
            return res.status(400).send({success: false, data: erros});
        }

        var dados_form = req.body;

        clientesBanco.altera(dados_form,function(err,results){
            if(err){
                return res.status(400).send({success:false,data: err}); 
            }
            return res.status(200).send({success:true,data: results}); 
        })        
    })
}