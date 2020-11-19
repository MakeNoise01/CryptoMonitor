const server = require('express').Router();
const {verifyUser} = require('../controllers/security')
const { createUser, login, datos } = require('../controllers/user');

server.post('/create/user', createUser);

server.post('/login', login);

server.get('/datos', verifyUser, datos);


module.exports = server;