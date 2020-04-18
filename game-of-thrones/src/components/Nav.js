import React from 'react';
import { Link } from 'react-router-dom';

export const Nav = () => {
	const clearToken = () => {
		window.localStorage.clear();
	};
	return (
		<div class='navbar-desktop'>
			<ul>
				<Link to='/'>Home</Link>
				<Link to='/progress'>Track Progress</Link>
				<Link to='/login' onClick={clearToken}>
					Logout
				</Link>
			</ul>
		</div>
	);
};
