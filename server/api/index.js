const app = require('../server'); // Adjust the path if necessary
const serverless = require('serverless-http');

module.exports = serverless(app);
