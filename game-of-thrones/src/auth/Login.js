import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import axios from 'axios';

import { TextField, Button } from '@material-ui/core';

const initialState = {
	username: '',
	password: '',
};

export const Login = (props) => {
	const [credentials, setCredentials] = useState(initialState);
	const [loading, setLoading] = useState(false);
	let isMounted = useRef(true);

	const handleChanges = (e) => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		await axios
			.post(
				'https://game-of-thrones-backend.herokuapp.com/api/auth/login',
				credentials
			)
			.then((res) => {
				const token = res.data.token;
				const id = res.data.id;
				window.localStorage.setItem('token', token);
				window.localStorage.setItem('id', id);
				props.history.push('/progress');
			})
			.catch((err) => {
				console.log('Error logging in', err);
			});
	};

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	});

	return (
		<div className='form-container'>
			{loading ? (
				<Loader type='Circles' color='#FFFFF' height={50} width={50} />
			) : (
				''
			)}
			<form onSubmit={handleSubmit}>
				<div>
					<TextField
						htmlFor='username'
						label='Username'
						type='text'
						name='username'
						onChange={handleChanges}
					/>
				</div>
				<div>
					<TextField
						htmlFor='password'
						label='Password'
						type='password'
						name='password'
						onChange={handleChanges}
					/>
				</div>
				<Button id='login-button' variant='contained' type='submit'>
					Login
				</Button>
				<div>
					<Link id='login-button' to='/register'>
						Need To Register For An Account?
					</Link>
				</div>
			</form>
		</div>
	);
};
