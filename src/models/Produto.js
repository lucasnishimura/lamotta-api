const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  nome: String,
  preco: String,
  descricao: String,
  status: Boolean,  
  timestamps: true,
})

module.exports = mongoose.model('Produtos', ProductSchema);