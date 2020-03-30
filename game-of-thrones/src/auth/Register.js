import React, { useState } from 'react';
import axios from 'axios';

const initialState = {
	username: '',
	password: ''
};

export const Register = props => {
	const [credentials, setCredentials] = useState(initialState);

	const handleChanges = e => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value
		});
		console.log(credentials);
	};

	const handleSubmit = e => {
		e.preventDefault();
		axios
			.post(
				'https://game-of-thrones-backend.herokuapp.com/api/auth/register',
				credentials
			)
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log('Error registering', err);
			});
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor='username'>Username</label>
				<input type='text' name='username' onChange={handleChanges} />

				<label htmlFor='password'>Password</label>
				<input type='text' name='password' onChange={handleChanges} />

				<label htmlFor='confirmPass'>Confirm Password</label>
				<input type='text' name='confirmPass' />
				<button>Register</button>
			</form>
		</div>
	);
};
