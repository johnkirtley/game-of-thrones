import React, { useState } from 'react';
import parse from 'html-react-parser';
import {
	Button,
	Grid,
	Paper,
	Container,
	Snackbar,
	IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { axiosWithAuth } from '../utils/axiosWithAuth';

export const Episodes = ({ episodes }) => {
	const [open, setOpen] = useState(false);

	const addWatched = e => {
		setOpen(true);

		const id = window.localStorage.getItem('id');
		const newWatched = {
			episode_name: e.currentTarget.value,
			user_id: Number(id)
		};

		axiosWithAuth()
			.post(
				`https://game-of-thrones-backend.herokuapp.com/api/users/${id}`,
				newWatched
			)
			.then(res => {
				console.log(res);
				setTimeout(() => {
					setOpen(false);
				}, 1500);
			})
			.catch(err => {
				console.log('Error adding episode', err);
			});
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
	};

	const token = window.localStorage.getItem('token');

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
								{token ? (
									<>
										<Button
											id='watched-button'
											variant='contained'
											color='primary'
											onClick={addWatched}
											value={episode.name}>
											+ Watched
										</Button>
										<Snackbar
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'left'
											}}
											open={open}
											autoHideDuration={8000}
											onClose={handleClose}
											message='Episode Successfully Added!'
											action={
												<>
													<IconButton
														size='small'
														aria-label='close'
														color='inherit'
														onClick={handleClose}>
														<CloseIcon fontSize='small' />
													</IconButton>
												</>
											}
										/>
									</>
								) : (
									''
								)}
							</Paper>
						</Grid>
					);
				})}
			</Grid>
		</Container>
	);
};
