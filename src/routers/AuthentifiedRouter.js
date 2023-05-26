import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthentifiedLayout from '../pages/authentified/Layouts/AuthentifiedLayout';
import Home from '../pages/public/Home';
import About from '../pages/shared/About';
import Contact from '../pages/shared/Contact';
import NotFound from '../pages/shared/NotFound';
import Freezers from '../pages/authentified/Freezer/Freezers';
import Products from '../pages/authentified/Product/Products';
import Account from '../pages/authentified/User/Account';
import FreezerDetails from '../pages/authentified/Freezer/FreezerDetails';

const AuthentifiedRouter = () => {
	return (
		<Routes>
			<Route element={<AuthentifiedLayout />}>
				<Route index element={<Home />} />
				<Route path='home' element={<Home />} />
				<Route path='freezers'>
					<Route index element={<Freezers />} />
					<Route path='details/:id' element={<FreezerDetails />} />
				</Route>
				<Route path='products' element={<Products />} />
				<Route path='account' element={<Account />} />
				<Route path='about' element={<About />} />
				<Route path='contact' element={<Contact />} />
			</Route>
			<Route path='*' element={<NotFound />} />
		</Routes>
	);
};

export default AuthentifiedRouter;
