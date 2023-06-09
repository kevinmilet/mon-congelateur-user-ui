import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../../components/Header/Header';

const HomeLayout = () => {
	return (
		<div className='authentified-layout'>
			<Header />
			<Outlet />
		</div>
	);
};

export default HomeLayout;
