const express = require('express');
const BlockedIP = require('./BlockedIP');
const fs = require('fs');

const router = express.Router();

// Rota para listar IPs bloqueados
router.get('/blocked-ips', async (req, res) => {
  const blockedIPs = await BlockedIP.find();
  res.json(blockedIPs);
});

// Rota para desbloquear IP
router.delete('/unblock-ip/:ip', async (req, res) => {
  const { ip } = req.params;
  await BlockedIP.deleteOne({ ip });
  res.json({ message: \`IP \${ip} desbloqueado.\` });
});

// Rota para visualizar logs
router.get('/access-logs', (req, res) => {
  fs.readFile('access.log', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao ler logs.' });
    }
    res.send(\`<pre>\${data}</pre>\`); // Formatação simples para visualização
  });
});

module.exports = router;