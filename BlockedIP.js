const mongoose = require('mongoose');

const blockedIPSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: '1d' } // Exclui após 1 dia
});

module.exports = mongoose.model('BlockedIP', blockedIPSchema);