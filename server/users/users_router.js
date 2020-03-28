const express = require('express');
const Model = require('./model');

const router = express.Router();

router.post('/', (req, res) => {
	const episode = req.body;

	Model.addWatched(episode)
		.then(response => {
			res.status(200).json({ message: 'Episode added' });
		})
		.catch(err => {
			console.log('Error adding episode', err);
		});
});

router.get('/', (req, res) => {
	Model.find()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => {
			console.log('Could not get users', err);
		});
});

router.get('/:id/watched', (req, res) => {
	const { id } = req.params;

	Model.findWatched(id)
		.then(episodes => {
			res.status(201).json(episodes);
		})
		.catch(err => {
			console.log('Error getting episodes', err);
		});
});

module.exports = router;
