import React from 'react';
import { Link } from 'react-router-dom';

export const Nav = () => {
	const clearToken = () => {
		window.localStorage.clear();
	};
	return (
		<div>
			<ul>
				<Link to='/'>Home</Link>
				<Link to='/progress'>Progress Tracker</Link>
				<Link to='/login' onClick={clearToken}>
					Logout
				</Link>
			</ul>
		</div>
	);
};
