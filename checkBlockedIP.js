const BlockedIP = require('./BlockedIP');

const checkBlockedIP = async (req, res, next) => {
  const clientIP = req.ip;
  const blockedIP = await BlockedIP.findOne({ ip: clientIP });

  if (blockedIP) {
    return res.status(403).json({ message: 'IP bloqueado.' });
  }

  next();
};

module.exports = checkBlockedIP;