function ProdutosBanco(connection){
	this.connection = connection; 
}

ProdutosBanco.prototype.lista =  function(callback){
	this.connection.query('select * from produtos order by id desc',callback);
}	

ProdutosBanco.prototype.salva =  function(produto,callback){
	this.connection.query('insert into produtos set ?',produto,callback);
}	

ProdutosBanco.prototype.ver =  function(produto,callback){
	this.connection.query('select * from produtos where id="'+produto.id+'"',callback);
}

ProdutosBanco.prototype.altera =  function(produto,callback){
	this.connection.query('update produtos set nome="'+produto.nome+'", preco="'+produto.preco+'", descricao="'+produto.descricao+'", sabor="'+produto.sabor+'" , status="'+produto.status+'" where id = '+produto.id,callback);
}	

module.exports = function(){
	return ProdutosBanco;
}