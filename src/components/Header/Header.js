import React, { useState } from 'react';
import { authService } from '../../services/auth.service';
import './header.scss';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/icons/congelateur.png';

const Header = () => {
	const navigate = useNavigate();
	const [showLinks, setShowLinks] = useState(false);

	const handleShowLinks = () => {
		setShowLinks(!showLinks);
	};

	const logout = () => {
		console.log('logout');
		authService.logout();
		navigate('/');
	};

	return (
		<header className='header'>
			<nav className={`navbar ${showLinks ? 'show-nav' : ''}`}>
				<div className='navbar-logo'>
					<img src={Logo} alt='Logo' className='logo' />
				</div>
				<ul className='navbar-links'>
					<li className='navbar-item slide-1'>
						<Link to={'/monespace/home'} className='navbar-link'>
							Accueil
						</Link>
					</li>
					<li className='navbar-item slide-2'>
						<Link to={'/monespace/freezers'} className='navbar-link'>
							Mes congélateurs
						</Link>
					</li>
					<li className='navbar-item slide-3'>
						<Link to={'/monespace/products'} className='navbar-link'>
							Mes produits
						</Link>
					</li>
					<li className='navbar-item slide-4'>
						<Link to={'/monespace/account'} className='navbar-link'>
							Mon compte
						</Link>
					</li>
					<li className='navbar-item slide-5' onClick={logout}>
						<span className='navbar-link'>Déconnexion</span>
					</li>
				</ul>
				<button className='navbar-burger' onClick={handleShowLinks}>
					<span className='burger-bar'></span>
				</button>
			</nav>
		</header>
	);
};

export default Header;
