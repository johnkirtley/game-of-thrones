const express = require('express');
const Model = require('./model');

const router = express.Router();

// Add Episode To Saved List
router.post('/:id', (req, res) => {
	const { episode_name } = req.body;
	const { id } = req.params;

	Model.addWatched(id, episode_name)
		.then(response => {
			res.status(200).json({ message: 'Episode added' });
		})
		.catch(err => {
			console.log('Error adding episode', err);
		});
});

// Get All Users
router.get('/', (req, res) => {
	Model.find()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => {
			console.log('Could not get users', err);
		});
});

// Get Watched Episodes By User
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
