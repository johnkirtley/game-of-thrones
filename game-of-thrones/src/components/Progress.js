import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { fetchShow } from '../api/fetchShow';
import Loader from 'react-loader-spinner';

export const Progress = props => {
	const [watched, setWatched] = useState([]);
	const [maxEpisodes, setMaxEpisodes] = useState();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		fetchShow().then(res => {
			setMaxEpisodes(res.data._embedded.episodes.length);
		});
	}, []);

	const id = window.localStorage.getItem('id');

	useEffect(() => {
		setIsLoading(true);

		axiosWithAuth()
			.get(
				`https://game-of-thrones-backend.herokuapp.com/api/users/${id}/watched`
			)
			.then(res => {
				setTimeout(() => {
					setWatched(res.data);
					setIsLoading(false);
				}, 1000);
			})
			.catch(err => {
				console.log('Error getting watched list', err);
			});
	}, [id]);

	return (
		<div>
			<h2>Overall Progress</h2>
			{isLoading ? (
				<Loader type='Circles' color='#B5E5FA' height={50} width={50} />
			) : (
				''
			)}
			<progress value={watched.length} max={maxEpisodes}>
				15%
			</progress>
			{watched.map(episode => (
				<p>{episode.episode_name}</p>
			))}
		</div>
	);
};
