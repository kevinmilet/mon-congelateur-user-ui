import React from 'react';
import { Link } from 'react-router-dom';
import AddUser from '../../components/User/AddUser';
import './signup.scss';

const Signup = () => {
	return (
		<main className='signup-container'>
			<AddUser />
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

export default Signup;
