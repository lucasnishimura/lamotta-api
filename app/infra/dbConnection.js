//acesso ao drive de 
var mysql = require('mysql');

function createDBConnection(){

    if(!process.env.NODE_ENV){
        //conecta no banco de dados acionando o método createconnection, e como parametro são os dados de conexão 
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '979899', //usa em casa
            // password: '', //usa no trampo
            database: 'lamotta' //usa em casa
            // database: 'estudo' //usa no trampo
        });
    }

    if(process.env.NODE_ENV == 'teste'){
        //conecta no banco de dados acionando o método createconnection, e como parametro são os dados de conexão 
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            // password: '979899', //usa em casa
            password: '', //usa no trampo
            database: 'lamotta_com_br' //usa em casa
            // database: 'estudo_teste' //usa para teste
        });
    }

    return connection;
}

// wrapper, é uma função que embrulhaoutra função, pois assim a conexão só vai ser invocada quando chamar o objeto, e não será feito o tempo todo
module.exports = function(){
    return createDBConnection;
}