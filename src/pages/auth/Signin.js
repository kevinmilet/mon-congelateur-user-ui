import React from 'react';
import Login from '../../components/User/Login';
import './signin.scss';
import { Link } from 'react-router-dom';

const Signin = () => {
	return (
		<main className='signin-container'>
			<Login />
			<div className='footer'>
				<div>
					<Link to='/about'>A propos</Link>
				</div>
				<div>
					<Link to='/contact'>Nous contacter</Link>
				</div>
			</div>
		</main>
	);
};

export default Signin;
