const db = require('../data/db-config');

module.exports = {
	find,
	addUser,
	// remove,
	findById,
	addEpisode
};

function find() {
	return db('users').select('id', 'username');
}

function addUser(user) {
	return db('users').insert(user);
}

function findById(id) {
	return db('users')
		.where({ id })
		.select('watched');
}

function addEpisode(id, episode) {
	return db('users')
		.where({ id })
		.insert(episode);
}
