//A pasta teste é usado com o módulo mocha, que verifica funcionalidades do nosso sistema
//Testaremos dentro da nossa produtos controller: 
// - NOssa lista de JSON
// - Se nosso cadastro aceita json
// - Se nosso cadastro aceita urlencoded
var express = require('../config/express')();
var request = require('supertest')(express);
// var request = require('assert')();

//Descrve o cenário que estamos testando, no caso produtoscontroller
describe('#ProdutosController',function(){

    beforeEach(function(done){
        var conn = express.infra.dbConnection();
        conn.query("delete from produtos",function(ex,result){
            if(!ex){
                done();
            }
        })
    })

    //dado o cenário, o que ue quero verificar?
    it('#listagem json',function(done){
        request.get('/produtos')
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        .expect(200,done);
    });

    it('#cadastro de novo produto com dados inválidos',function(done){
        request.post('/produtos')
        .send({nome:"",descricao:"novo livro"})
        .expect(400,done);
    })

    it('#cadastro de novo produto com dados válidos',function(done){
        request.post('/produtos')
        .send({nome:"Produto novo",descricao:"novo produto",preco:2.50})
        .expect(302,done);
    })
});    
