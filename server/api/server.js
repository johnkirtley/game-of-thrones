const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const restricted = require('../auth/auth_middleware');
const usersRouter = require('../users/users_router');
const authRouter = require('../auth/auth_router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/users', restricted, usersRouter);
server.use('/api/auth', authRouter);

module.exports = server;
