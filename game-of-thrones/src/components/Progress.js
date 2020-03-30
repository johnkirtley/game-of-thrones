import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

export const Progress = () => {
	const [watched, setWatched] = useState([]);

	const id = window.localStorage.getItem('id');

	useEffect(() => {
		axiosWithAuth()
			.get(
				`https://game-of-thrones-backend.herokuapp.com/api/users/${id}/watched`
			)
			.then(res => {
				console.log(res.data);
				setWatched(res.data);
			})
			.catch(err => {
				console.log('Error getting watched list', err);
			});
	}, []);

	return (
		<div>
			<h2>Progress</h2>
			{watched.map(episode => (
				<p>{episode.episode_name}</p>
			))}
		</div>
	);
};
