import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

// Utilities
import { fetchShow } from './api/fetchShow';
import { formatSeasons } from './utils/formatSeasons';

// Components
import { Nav } from './components/Nav';
import { Home } from './components/Home';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { PrivateRoute } from './components/PrivateRoute';
import { Progress } from './components/Progress';

// Styling
import './App.css';

// Reinstall UUID for unique keys. Was causing problems that uninstalling fixed.

export const App = () => {
	const [show, setShow] = useState();
	const [seasons, setSeasons] = useState([]);

	useEffect(() => {
		fetchShow().then(res => {
			setShow(res.data);
			setSeasons(formatSeasons(res.data._embedded.episodes));
		});
	}, []);

	if (!show) {
		return <h2>Fetching data...</h2>;
	}

	return (
		<main role='main'>
			<div className='App'>
				<Nav />
				<Switch>
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
					<PrivateRoute path='/progress' component={Progress} />
					<Route
						path='/'
						render={props => <Home {...props} show={show} seasons={seasons} />}
					/>
				</Switch>
			</div>
		</main>
	);
};
