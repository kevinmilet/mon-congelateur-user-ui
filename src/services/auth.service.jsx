import Axios from './caller.service';
// eslint-disable-next-line no-unused-vars
import jwtDecode, { JwtPayload } from 'jwt-decode';

const login = credentials => {
	return Axios.post('/auth/login', credentials);
};

const saveToken = token => {
	localStorage.setItem('token', token);
};

const logout = () => {
	localStorage.removeItem('token');
};

const isLogged = () => {
	const token = localStorage.getItem('token');
	return !!token;
};

const getToken = () => {
	return localStorage.getItem('token');
};

const getPayload = () => {
	const user = {
		id: 0,
		account_id: '',
		firstname: '',
		lastname: '',
		email: '',
		is_admin: false,
		is_active: false,
	};

	const token = localStorage.getItem('token');

	if (token !== null) {
		const decodedToken = jwtDecode(token);

		user.id = decodedToken.id;
		user.account_id = decodedToken.account_id;
		user.firstname = decodedToken.firstname;
		user.lastname = decodedToken.lastname;
		user.email = decodedToken.email;
		user.is_active = decodedToken.is_active;
		user.is_admin = decodedToken.is_admin;

		return user;
	}
};

export const authService = {
	login,
	saveToken,
	logout,
	isLogged,
	getToken,
	getPayload,
};
