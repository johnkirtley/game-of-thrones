import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { fetchShow } from '../api/fetchShow';
import Loader from 'react-loader-spinner';
import { Paper } from '@material-ui/core';
import { Line } from 'rc-progress';

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
		<div className='watched-container'>
			<h2>Overall Progress</h2>
			{isLoading ? (
				<Loader type='Circles' color='#B5E5FA' height={50} width={50} />
			) : (
				''
			)}
			<p>{Math.floor((watched.length / maxEpisodes) * 100)}% Complete</p>
			<Line
				className='progress-bar'
				percent={watched.length}
				strokeWidth='4'
				strokeColor='green'
				trailWidth='2'
				percent={(watched.length / maxEpisodes) * 100}
			/>
			{/* <progress value={watched.length} max={maxEpisodes}>
				15%
			</progress> */}
			{watched.map(episode => (
				<Paper elevation={2} variant='outlined' className='watched-episode'>
					{episode.episode_name}
				</Paper>
			))}
		</div>
	);
};
