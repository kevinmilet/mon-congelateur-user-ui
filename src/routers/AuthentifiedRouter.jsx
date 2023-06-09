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
import EditAccount from '../pages/authentified/User/EditAccount';
import FreezerDetails from '../pages/authentified/Freezer/FreezerDetails';
import AddFreezer from '../pages/authentified/Freezer/AddFreezer';
import EditFreezer from '../pages/authentified/Freezer/EditFreezer';
import AddProduct from '../pages/authentified/Product/AddProduct';
import EditProduct from '../pages/authentified/Product/EditProduct';

const AuthentifiedRouter = () => {
	return (
		<Routes>
			<Route element={<AuthentifiedLayout />}>
				<Route index element={<Home />} />
				<Route path='home' element={<Home />} />
				<Route path='freezers'>
					<Route index element={<Freezers />} />
					<Route path='details/:id' element={<FreezerDetails />} />
					<Route path='create' element={<AddFreezer />} />
					<Route path='edit/:id' element={<EditFreezer />} />
				</Route>
				<Route path='products'>
					<Route index element={<Products />} />
					<Route path='create' element={<AddProduct />} />
					<Route path='edit/:id' element={<EditProduct />} />
				</Route>
				<Route path='account'>
					<Route index element={<Account />} />
					<Route path='edit' element={<EditAccount />} />
				</Route>
				<Route path='about' element={<About />} />
				<Route path='contact' element={<Contact />} />
			</Route>
			<Route path='*' element={<NotFound />} />
		</Routes>
	);
};

export default AuthentifiedRouter;
