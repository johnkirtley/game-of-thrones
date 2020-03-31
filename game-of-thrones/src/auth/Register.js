import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { TextField, Button } from '@material-ui/core';

const initialState = {
	username: '',
	password: ''
};

export const Register = props => {
	const [credentials, setCredentials] = useState(initialState);
	const [confirmPass, setConfirmPass] = useState('');

	const handleChanges = async e => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value
		});

		console.log(credentials);
	};

	const handleConfirm = e => {
		setConfirmPass({
			...confirmPass,
			[e.target.name]: e.target.value
		});
	};

	useEffect(() => {
		console.log(confirmPass);
	}, [confirmPass]);

	const handleSubmit = async e => {
		e.preventDefault();

		const password = credentials.password;
		const confirm = confirmPass.confirmPass;

		if (password === confirm) {
			await axios
				.post(
					'https://game-of-thrones-backend.herokuapp.com/api/auth/register',
					credentials
				)
				.then(res => {
					props.history.push('/login');
				})
				.catch(err => {
					console.log('Error registering', err);
				});
		} else {
			alert('Passwords dont match');
		}
	};

	return (
		<div className='form-container'>
			<form onSubmit={handleSubmit} autoComplete='off'>
				<div>
					<TextField
						htmlFor='username'
						label='Username'
						name='username'
						onChange={handleChanges}
						required
					/>
				</div>
				<div>
					<TextField
						htmlFor='password'
						label='Password'
						type='password'
						name='password'
						onChange={handleChanges}
						required
					/>
				</div>
				<div>
					<TextField
						htmlFor='confirmPass'
						label='Confirm Password'
						type='password'
						name='confirmPass'
						onChange={handleConfirm}
						required
					/>
				</div>
				<Button id='register-button' variant='contained' type='submit'>
					Register
				</Button>
				<div>
					<Link to='/login'>Have An Account Already?</Link>
				</div>
			</form>
		</div>
	);
};
