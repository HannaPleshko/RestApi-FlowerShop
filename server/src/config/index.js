const { config } = require('dotenv');

config();

const { PORT } = process.env;

module.exports = { PORT };
