import React, { useState } from 'react';
import menuData from '../../utils/menuData';
import './header.scss';
import { Link } from 'react-router-dom';
import Logo from '../../assets/icons/congelateur.png';

const Header = () => {
	const [showLinks, setShowLinks] = useState(false);

	const handleShowLinks = () => {
		setShowLinks(!showLinks);
	};

	return (
		<header className='header'>
			<nav className={`navbar ${showLinks ? 'show-nav' : ''}`}>
				<div className='navbar-logo'>
					<img src={Logo} alt='Logo' className='logo' />
					<h3>Mon Congélateur</h3>
				</div>
				<ul className='navbar-links'>
					{menuData.map(item => (
						<li key={item.id} className={`navbar-item slide-${item.id}`}>
							<Link to={item.path} className='navbar-link'>
								{item.name}
							</Link>
						</li>
					))}
				</ul>
				<button className='navbar-burger' onClick={handleShowLinks}>
					<span className='burger-bar'></span>
				</button>
			</nav>
		</header>
	);
};

export default Header;
