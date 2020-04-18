import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import Dropdown from 'react-dropdown';

import { Episodes } from './Episodes';

export const Home = (props) => {
	const [selectedSeason, setSelectedSeason] = useState('');
	const episodes = props.seasons[selectedSeason] || [];

	const handleChange = (e) => {
		setSelectedSeason(e.value);
	};

	return (
		<div className='container'>
			<h1>Game of Thrones Episode Tracker</h1>
			<p>Must be logged in before adding episodes</p>
			{/* <h1>
				<img
					className='title'
					src='https://fontmeme.com/permalink/200306/bde143405de2a86298ff02a29c36c19b.png'
					alt='game-of-thrones-font'
					border='0'></img>
			</h1> */}
			{/* <Grid className='sub-info'>
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
			</Grid> */}

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
