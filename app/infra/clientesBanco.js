function ClientesBanco(connection){
	this.connection = connection; 
}

ClientesBanco.prototype.lista =  function(callback){
	this.connection.query('select * from clientes order by id desc',callback);
}	

ClientesBanco.prototype.salva =  function(produto,callback){
	this.connection.query('insert into clientes set ?',produto,callback);
}	

ClientesBanco.prototype.ver =  function(produto,callback){
	this.connection.query('select * from clientes where id = '+produto.id,callback);
}	

ClientesBanco.prototype.altera =  function(produto,callback){
	this.connection.query('update clientes set nome="'+produto.nome+'", email="'+produto.email+'", telefone="'+produto.telefone+'", status="'+produto.status+'" where id = '+produto.id,callback);
}	

module.exports = function(){
	return ClientesBanco;
}