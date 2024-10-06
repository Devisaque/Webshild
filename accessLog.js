const fs = require('fs');

const logRequest = (req) => {
  const logEntry = \`\${new Date().toISOString()} - \${req.method} \${req.url} - IP: \${req.ip}\n\`;
  fs.appendFileSync('access.log', logEntry);
};

module.exports = logRequest;