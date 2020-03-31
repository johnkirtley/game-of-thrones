import React, { useState, useEffect } from 'react';
import { Button, Grid, Container } from '@material-ui/core';
import Dropdown from 'react-dropdown';

import { Episodes } from './Episodes';

export const Home = props => {
	const [selectedSeason, setSelectedSeason] = useState('');
	const episodes = props.seasons[selectedSeason] || [];

	const handleChange = e => {
		setSelectedSeason(e.value);
	};

	return (
		<div>
			<h1>
				<img
					className='title'
					src='https://fontmeme.com/permalink/200306/bde143405de2a86298ff02a29c36c19b.png'
					alt='game-of-thrones-font'
					border='0'></img>
			</h1>
			<Grid className='sub-info'>
				<Grid item>
					<Button className='status' variant='outlined'>
						Show Status: {props.show.status}
					</Button>
				</Grid>
				<Grid item>
					<Button className='rating' variant='outlined'>
						Average Rating: {props.show.rating.average}
					</Button>
				</Grid>
			</Grid>
			{/* <Grid
				container
				direction='row'
				justify='center'
				id='genre-list'
				spacing={3}>
				{props.show.genres.map(genre => (
					<Grid item>
						<Button className='genre' variant='outlined'>
							{genre}
						</Button>
					</Grid>
				))}
			</Grid> */}
			<img
				className='main-image'
				src={props.show.image.original}
				alt={props.show.name}
			/>

			<div>
				<Button variant='contained' id='dropdown'>
					<Dropdown
						options={Object.keys(props.seasons)}
						onChange={handleChange}
						placeholder='Select a season'
						value={selectedSeason || 'Select a season'}
					/>
				</Button>
				<Episodes {...props} episodes={episodes} />
			</div>
		</div>
	);
};
