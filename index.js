const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const limiter = require('./rateLimiter');
const checkBlockedIP = require('./checkBlockedIP');
const logRequest = require('./accessLog');
const adminRoutes = require('./admin');
const verifyCaptchaMiddleware = require('./verifyCaptchaMiddleware');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(limiter);
app.use(checkBlockedIP);
app.use((req, res, next) => {
  logRequest(req);
  next();
});

// Rotas principais
app.get('/', (req, res) => {
  res.send('Bem-vindo ao WebShield!');
});

// Rotas de administração
app.use('/admin', adminRoutes);

// Rota protegida que exige CAPTCHA
app.post('/protected-route', verifyCaptchaMiddleware, (req, res) => {
  res.send('Acesso permitido!');
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Servidor rodando na porta \${PORT}\`);
});