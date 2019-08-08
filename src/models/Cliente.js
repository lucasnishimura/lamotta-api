const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  nome: String,
  email: String,
  telefone: String,
  status: Boolean,  
  timestamps: true,
})

module.exports = mongoose.model('Clientes', ClientSchema);