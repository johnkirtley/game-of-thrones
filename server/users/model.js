const db = require('../data/db-config');

module.exports = {
	find,
	addUser,
	// remove,
	// findById,
	findWatched,
	addWatched,
	findBy
};

function find() {
	return db('users')
		.select('id', 'username')
		.orderBy('id');
}

function addUser(user) {
	return db('users').insert(user, 'id');
}

// function findById(id) {
// 	return db('users')
// 		.where({ id })
// 		.select('watched');
// }

function findBy(filter) {
	return db('users').where(filter);
}

function addWatched(episode) {
	return db('watched').insert(episode);
}

function findWatched(id) {
	return db('users')
		.join('watched', 'users.id', 'watched.user_id')
		.select('watched.episode_name')
		.where('watched.user_id', id);
}
