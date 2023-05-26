import axios from 'axios';
import { authService } from './auth.service';

// Paramétrage de base
const Axios = axios.create({
	baseURL: 'https://myfreezer-api.kevin-milet.fr',
});

export default Axios;

// Intercepteur pour la mise en place du token dans la requête
Axios.interceptors.request.use(request => {
	if (authService.isLogged() !== null) {
		request.headers.Authorization = 'Bearer ' + authService.getToken();
	}

	return request;
});
