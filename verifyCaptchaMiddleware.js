const verifyCaptcha = require('./captcha');

const verifyCaptchaMiddleware = async (req, res, next) => {
  const token = req.body.captcha; // Supondo que o token seja enviado no corpo da requisição
  const isValid = await verifyCaptcha(token);

  if (!isValid) {
    return res.status(403).json({ message: 'CAPTCHA inválido. Tente novamente.' });
  }

  next();
};

module.exports = verifyCaptchaMiddleware;