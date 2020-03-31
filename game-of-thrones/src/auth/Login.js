import React, { useState, useEffect, useRef } from 'react';
import Loader from 'react-loader-spinner';
import axios from 'axios';

const initialState = {
	username: '',
	password: ''
};

export const Login = props => {
	const [credentials, setCredentials] = useState(initialState);
	const [loading, setLoading] = useState(false);
	let isMounted = useRef(true);

	const handleChanges = e => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		await axios
			.post(
				'https://game-of-thrones-backend.herokuapp.com/api/auth/login',
				credentials
			)
			.then(res => {
				const token = res.data.token;
				const id = res.data.id;
				window.localStorage.setItem('token', token);
				window.localStorage.setItem('id', id);
				props.history.push('/progress');
			})
			.catch(err => {
				console.log('Error logging in', err);
			});
	};

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	});

	return (
		<div>
			{loading ? (
				<Loader type='Circles' color='#B5E5FA' height={50} width={50} />
			) : (
				''
			)}
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
