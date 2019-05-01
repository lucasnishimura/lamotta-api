var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port: 3000,
    path: '/produtos',
    headers:{
        'Accept' : 'application/json',
        'x-access-token' :'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQyOTc0MzA3LCJleHAiOjE1NDI5NzQzMzd9.Ph5pwl1t2g85dgQeYROVmHleo3lYIeHjpYos7MwS2dQ',
    }
};

http.get(configuracoes,function(res){
    res.on('data',function(body){
        console.log('corpo:'+body);
    });
});