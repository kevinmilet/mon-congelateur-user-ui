import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from '../pages/shared/About';
import Contact from '../pages/shared/Contact';
import NotFound from '../pages/shared/NotFound';
import PublicLayout from '../pages/public/Layouts/PublicLayout';
import Signin from '../pages/auth/Signin';
import Forgot from '../pages/public/forgot';
import Signup from '../pages/public/Signup';

const PublicRoute = () => {
	return (
		<Routes>
			<Route element={<PublicLayout />}>
				<Route index element={<Signin />} />
				<Route path='/connexion' element={<Signin />} />
				<Route path='/inscription' element={<Signup />} />
				<Route path='/about' element={<About />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/forgot' element={<Forgot />} />
			</Route>
			<Route path='*' element={<NotFound />} />
		</Routes>
	);
};

export default PublicRoute;
