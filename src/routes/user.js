const server = require('express').Router();
const { createUser } = require('../controllers/user');

server.post('/', createUser);

module.exports = server;