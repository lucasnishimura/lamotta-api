//acesso ao drive de 
var mysql = require('mysql');

function createDBConnection(){

    if(!process.env.NODE_ENV){
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
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            // password: '979899', //usa em casa
            password: '', //usa no trampo
            database: 'lamotta_com_br' //usa em casa
            // database: 'estudo_teste' //usa para teste
        });
    }

    if(process.env.NODE_ENV == 'production'){
        // var url = process.env.CLEARDB_DATABASE_URL;
        // var grupos = url.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?/);
        var connection = mysql.createConnection({
            // host:grupos[3],
            // user:grupos[1],
            // password:grupos[2],
            // database:grupos[4]
            host: 'us-cdbr-iron-east-02.cleardb.net',
            user: 'b34708ba3d30af',
            password: '8fde8d5d', //usa no trampo
            database: 'heroku_272e0091bd44a58' //usa em casa
        });
    }

    return connection;
}

// wrapper, é uma função que embrulhaoutra função, pois assim a conexão só vai ser invocada quando chamar o objeto, e não será feito o tempo todo
module.exports = function(){
    return createDBConnection;
}