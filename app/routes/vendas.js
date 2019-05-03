module.exports = function(app){
    app.get('/vendas',function(req,res){

        var connection = app.infra.dbConnection();
        var vendasBanco = new app.infra.vendasBanco(connection);
    
       vendasBanco.lista(function(erros,resultados){
            if(erros){
                return res.status(400).send({success: false, data: erros});
            }else{
                return res.status(200).send({success: true, data: resultados});
            }
        })
    })

    app.post('/vendas',function(req,res){
        var connection = app.infra.dbConnection();
        var vendasBanco = new app.infra.vendasBanco(connection);

        var vendas = req.body.vendas;
        delete req.body.vendas

        req.assert('valor','Valor é obrigatório').notEmpty();       
        req.assert('pagamento','Tipo de pagamento é obrigatório').notEmpty();       
        req.assert('tipo_venda','Tipo de venda é obrigatório').notEmpty();       
        req.assert('data','Data da venda é obrigatória').notEmpty();       
        req.assert('data','Data da venda não está no formato').isISO8601('yyyy-mm-dd');           
        
        var erros = req.validationErrors();
       if(erros){
           return res.status(400).json({success:false,data:erros}); 
       }

        vendasBanco.salva(req.body,function(err,results){
            if(err){
                return res.status(500).json({success:false,data:err}); 
            }else{
                var dados_insert = {
                    'venda_id' : results.insertId,
                    'vendas' : vendas,
                    'total' : vendas.length
                }
          
                vendasBanco.salvaVenda(dados_insert,function(erro,results){
                    if(erro){
                        return res.status(500).json({success:false,data:erro}); 
                    }else{
                        return res.status(200).json({success:true,data:results}); 
                    }
                })        
            }

        })
        
    })

    app.post('/vendas/ver',auth,function(req,res){
        var connection = app.infra.dbConnection();
        var vendasBanco = new app.infra.vendasBanco(connection);

        var data = req.body.data.split('/');
        var dados_form = {
            cliente_id: req.body.cliente_id,
            valor: req.body.valor,
            data: data[2]+'-'+data[1]+'-'+data[0],
            status: req.body.status,
            id: req.body.id
        }
        var vendas = req.body.vendas;
        vendasBanco.altera(dados_form,function(err,results){
            var dados_insert = {
                'venda_id' : req.body.id,
                'vendas' : req.body.vendas,
                'total' : vendas.length
            }
      
            vendasBanco.alteraVenda(dados_insert,function(err,results){
                if(err){
                    console.log('Erro ao vincular os produtos com a venda');
                    return res.status(500).send({auth:false}); 
                }
            })        
        })

        res.format({
            html: function(){
                res.redirect('/vendas');
            },
            json: function(){
                return res.status(200).send({auth:true}); 
            }
        })

        
    })

    app.get('/vendas/ver/:id?',function(req,res){
        var connection = app.infra.dbConnection();
        var vendasBanco = new app.infra.vendasBanco(connection);
        var clientesBanco = new app.infra.clientesBanco(connection);
        var produtosBanco = new app.infra.produtosBanco(connection);

        var clientes = {}
        clientesBanco.todos(function(err,resultados){
            clientes = resultados;
        })

        var todosProdutos = {}
        produtosBanco.todos(function(err,resultados){
            todosProdutos = resultados;
        })

        let vendasInfo = []
        vendasBanco.ver(req.params,function(erros,results){
            vendasInfo = results[0];
        })
        
        var vendaProdutoInfo = {}
        vendasBanco.verVendaProduto(req.params,function(erros,results){
            vendaProdutoInfo = results;
            vendasInfo.total = results.length;
            res.format({
                html: function(){
                    res.render("vendas/ver",{
                        errosValidacao:{},
                        clientes:clientes,
                        venda:vendasInfo,
                        produtos: vendaProdutoInfo,
                        todosProdutos: todosProdutos
                    });   
                },
                json: function(){
                    res.json(results);
                }
            })
        })
    })

    app.get('/vendas/inserir',auth,function(req,res){
        var connection = app.infra.dbConnection();
        var clientesBanco = new app.infra.clientesBanco(connection);

        var dados_filtro = {
            id:'',
            nome: '',
            cliente: '',
            empresa: ''
       }
        

        clientesBanco.lista(dados_filtro,function(erros,resultados){
            res.render('vendas/inserir',{errosValidacao:{},produtoInfo:{},clientes:resultados});
        })

    })
}