var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port: 3000,
    path: '/clientes/listar',
    method: 'post',
    headers:{
        'Accept' : 'application/json',
        'Content-type': 'application/json',
        'x-access-token' :'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQzMzIyOTczLCJleHAiOjE1NDMzMjMyNzN9.NQ1_F-6YnBydipsmK88SegGVFQ1PGLtfBhvixZ1hbVo',
    }
};

var client = http.request(configuracoes,function(res){
    // console.log(res.statusCode)
    res.on('data',function(body){
        console.log('Corpo:'+body)
    });
});
var produto = {
    nome: '',
    id: '',
    cliente: '',
    empresa: ''
};

//só dispara a requisição aqui
client.end(JSON.stringify(produto));