import React, { useState, useContext } from 'react';
import parse from 'html-react-parser';
import WatchedContext from '../contexts/WatchedContext';
import { Button, Grid, Paper, Container } from '@material-ui/core';
import { axiosWithAuth } from '../utils/axiosWithAuth';

export const Episodes = ({ episodes }) => {
	// const addWatched = e => {
	//   if (!e.value) {
	//     setWatched({
	//       ...watched,
	//       [e.target.value]: true
	//     });
	//   }
	// NEED TO SET NOTIFICATION IF ALREADY ADDED
	// };

	const addWatched = async e => {
		const id = window.localStorage.getItem('id');
		const newWatched = await {
			episode_name: e.target.value,
			user_id: Number(id)
		};

		axiosWithAuth()
			.post(
				`https://game-of-thrones-backend.herokuapp.com/api/users/${id}`,
				newWatched
			)
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log('Error adding episode', err);
			});
	};

	console.log('episodes', episodes);

	return (
		<Container>
			<Grid container justify='center' spacing={3}>
				{episodes.map(episode => {
					return (
						<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
							<Paper key={episode.id} id='episode-card'>
								<h2 className='episode-name'>{episode.name}</h2>
								<img
									src={episode.image.original}
									alt={episode.name}
									className='episode-image'
								/>
								<div className='episode-summary'>{parse(episode.summary)}</div>
								<button onClick={addWatched} value={episode.name}>
									Watched
								</button>
							</Paper>
						</Grid>
					);
				})}
			</Grid>
		</Container>
	);
};
