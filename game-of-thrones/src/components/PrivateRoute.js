import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props => {
				const token = window.localStorage.getItem('token');

				if (token) {
					return <Component {...props} />;
				} else {
					return <Redirect to='/login' />;
				}
			}}
		/>
	);
};
