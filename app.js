require('dotenv').config();
const Server = require('./models/server');

const serverr = new Server();

serverr.listen();