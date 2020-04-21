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
