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
                        return res.status(200).send({success:true,data:results}); 
                    }
                })        
            }

        })
        
    })

    app.get('/vendas/:id?',function(req,res){
        var connection = app.infra.dbConnection();
        var vendasBanco = new app.infra.vendasBanco(connection);
       
        var dados = {};
        vendasBanco.ver(req.params,function(erros,results){
            dados = results;

            vendasBanco.verVendaProduto(req.params,function(erros,resultado){
                var produtos = resultado;
            
                dados.push(produtos)

                return  res.status(200).send({success: true, data: dados});
            })
        })


        // return false;
    })

    app.put('/vendas',function(req,res){
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
           return res.status(400).send({success:false,data:erros}); 
       }

        vendasBanco.altera(req.body,function(err,results){
            if(err){
                return res.status(500).send({success:false,data:err}); 
            }else{         
                // console.log(vendas.length)
                vendasBanco.alteraVenda(vendas,function(erro,resultado){
                    if(erro){
                        return res.status(500).send({success:false,data:erro}); 
                    }else{
                        return res.status(200).send({success:true,data:resultado}); 
                    }
                })        
            }
        })
        
    })

    app.delete('/vendas/:id?',function(req,res){
        var connection = app.infra.dbConnection();
        var vendasBanco = new app.infra.vendasBanco(connection);

        vendasBanco.deletar(req.params,function(erros,results){
            if(erros){
                return  res.status(500).send({success: false, data: erros});
            }else{
                vendasBanco.deletarVendaProdutos(req.params,function(err,resultado){
                    if(err){
                        return  res.status(500).send({success: false, data: err});
                    }else{
                        return  res.status(200).send({success: true, data: results});
                    }
                })
            }
        })

    })
}