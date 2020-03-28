const jwt = require('jsonwebtoken');
const { secret } = require('../config/secret');

module.exports = (req, res, next) => {
	const { authorization } = req.headers;

	if (authorization) {
		jwt.verify(authorization, secret, (err, decodedToken) => {
			if (err) {
				res.status(401).json({ message: 'Invalid Credentials' });
			} else {
				next();
			}
		});
	} else {
		res.status(401).json({ message: 'Not authorized' });
	}
};
