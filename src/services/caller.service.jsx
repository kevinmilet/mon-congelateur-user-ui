import axios from 'axios';
import { authService } from './auth.service';

// Paramétrage de base
const Axios = axios.create({
	baseURL: 'https://myfreezer-api.kevin-milet.fr',
});

// Intercepteur pour la mise en place du token dans la requête
Axios.interceptors.request.use(request => {
	if (authService.isLogged() !== null) {
		request.headers.Authorization = 'Bearer ' + authService.getToken();
	}

	return request;
});

// Intercepteur pour rediriger vers la connexion si on a été déconnecté
Axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		if (error.response.status === 401) {
			if (
				error.response.data.message === 'Wrong password' ||
				error.response.data.message === "This account does'nt exist"
			) {
				return Promise.reject(error);
			}
			authService.logout();
			console.info('Vous avez été déconnecté...');
			window.location = '/';
		} else {
			return Promise.reject(error);
		}
	}
);

export default Axios;
