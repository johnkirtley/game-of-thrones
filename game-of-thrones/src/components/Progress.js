import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { fetchShow } from '../api/fetchShow';

export const Progress = props => {
	const [watched, setWatched] = useState([]);
	const [maxEpisodes, setMaxEpisodes] = useState();

	useEffect(() => {
		fetchShow().then(res => {
			setMaxEpisodes(res.data._embedded.episodes.length);
		});
	}, []);

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
			<label htmlFor='progress'>Your Progress</label>
			<progress value={watched.length} max={maxEpisodes}>
				15%
			</progress>
			{watched.map(episode => (
				<p>{episode.episode_name}</p>
			))}
		</div>
	);
};
