import Axios from './caller.service';

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

	return token;
};

const getToken = () => {
	return localStorage.getItem('token');
};

export const authService = {
	login,
	saveToken,
	logout,
	isLogged,
	getToken,
};
