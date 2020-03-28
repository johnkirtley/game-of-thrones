const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/secret');
const Model = require('../users/model');

const router = express.Router();

router.post('/register', (req, res) => {
	const info = req.body;
	const rounds = process.env.HASHING_ROUNDS || 10;
	const hash = bcrypt.hashSync(info.password, rounds);

	info.password = hash;

	Model.addUser(info)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(err => {
			console.log('Error registering user', err);
		});
});

router.post('/login', (req, res) => {
	const { username, password } = req.body;

	Model.findBy({ username })
		.then(([user]) => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);
				res.status(200).json({ message: 'Logged In', token });
			} else {
				res.status(401).json({ message: 'Error logging in' });
			}
		})
		.catch(err => {
			console.log('Error logging in', err);
		});
});

const generateToken = user => {
	const payload = {
		username: user.username,
		password: user.password
	};

	const options = {
		expiresIn: '1hr'
	};

	return jwt.sign(payload, secret, options);
};

module.exports = router;
