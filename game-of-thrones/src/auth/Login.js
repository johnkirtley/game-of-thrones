import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const initialState = {
	username: '',
	password: ''
};

export const Login = props => {
	const [credentials, setCredentials] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const isMounted = useRef(null);

	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);

	const handleChanges = e => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		setLoading(true);

		axios
			.post(
				'https://game-of-thrones-backend.herokuapp.com/api/auth/login',
				credentials
			)
			.then(res => {
				const token = res.data.token;
				const id = res.data.id;
				window.localStorage.setItem('token', token);
				window.localStorage.setItem('id', id);
				setLoading(false);
			})
			.catch(err => {
				console.log('Error logging in', err);
			})
			.finally(() => {
				if (isMounted.current) {
					setLoading(false);
				}
			});
	};

	return (
		<div>
			{loading ? <p>Loading...</p> : ''}
			<form onSubmit={handleSubmit}>
				<label htmlFor='username'></label>
				<input type='text' name='username' onChange={handleChanges} />

				<label htmlFor='password'>Password</label>
				<input type='text' name='password' onChange={handleChanges} />
				<button>Login</button>
			</form>
		</div>
	);
};
