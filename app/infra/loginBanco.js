function loginBanco(connection){
	this.connection = connection; 
}

loginBanco.prototype.lista =  function(login,callback){
  var md5 = require('md5');
  var senha = md5(login.senha);
  
	this.connection.query('select * from usuario where nome = "'+login.nome+'" and senha = "'+senha+'"',callback);
}	

module.exports = function(){
	return loginBanco;
}