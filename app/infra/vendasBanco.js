function VendasBanco(connection){
	this.connection = connection; 
}

VendasBanco.prototype.lista =  function(callback){
	this.connection.query('select a.*,date_format(a.data,"%d/%m/%Y") as data,date_format(a.encomenda,"%d/%m/%Y") as encomenda,c.nome from vendas as a left join clientes as c on a.cliente_id = c.id',callback);
}	

VendasBanco.prototype.salva =  function(produto,callback){
	this.connection.query('insert into vendas set ?',produto,callback);
}	

VendasBanco.prototype.salvaVenda =  function(produto,callback){
	for (var index = 0; index < produto.total; index++) {
		// const element = array[index];
		this.connection.query('insert into venda_produto (venda_id,produto_id,quantidade) VALUES ('+produto.venda_id+','+produto.vendas[index].produto_id+','+produto.vendas[index].quantidade+')',callback);
	}
}

VendasBanco.prototype.ver =  function(produto,callback){
	this.connection.query('select a.*,c.nome,date_format(a.data,"%d/%m/%Y") as data, date_format(a.encomenda,"%d/%m/%Y") as encomenda from vendas as a left join clientes as c ON a.cliente_id = c.id where a.id = '+produto.id,callback);
}	

VendasBanco.prototype.verVendaProduto =  function(produto,callback){
	this.connection.query('select a.*,p.preco from venda_produto as a INNER JOIN produtos as p ON p.id = a.produto_id where venda_id = '+produto.id,callback);
}		

VendasBanco.prototype.altera =  function(produto,callback){
	this.connection.query('update vendas set cliente_id="'+produto.cliente_id+'", data="'+produto.data+'", encomenda="'+produto.encomenda+'", pagamento="'+produto.pagamento+'", tipo_venda="'+produto.tipo_venda+'" ,status="'+produto.status+'", valor="'+produto.valor+'" where id = '+produto.id,callback);
}	

VendasBanco.prototype.alteraVenda =  function(produto,callback){
	for (var index = 0; index < produto.length; index++) {
		this.connection.query('update venda_produto set venda_id="'+produto[index].venda_id+'", produto_id="'+produto[index].produto_id+'", quantidade="'+produto[index].quantidade+'" where id="'+produto[index].id+'" ',callback);
	}
}	

VendasBanco.prototype.deletar =  function(produto,callback){
	this.connection.query('delete from vendas where id = '+produto.id,callback);
}	

VendasBanco.prototype.deletarVendaProdutos =  function(produto,callback){
	this.connection.query('delete from venda_produto where venda_id = '+produto.id,callback);
}	

module.exports = function(){
	return VendasBanco;
}