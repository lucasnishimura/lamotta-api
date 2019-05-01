var app = require('./config/express')(); //o ponto na frente do caminho diz que ele vai procurar o arquivo a partir da raiz
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set("io",io);

var porta = process.env.PORT || 3000;

// var server = http.listen(porta, function () {

//     var host = server.address().address;
//     var port = server.address().port;

//     console.log('Servidor rodando em http://%s:%s', host, port);

// });


http.listen(porta,function(){
    console.log("Servidor rodando")
})

