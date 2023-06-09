import Axios from './caller.service';

const createUser = datas => {
	return Axios.put('/users', datas);
};

const trashUser = userId => {
	return Axios.delete(`/users/trash/${userId}`);
};

const untrashUser = userId => {
	return Axios.post(`/users/untrash/${userId}`);
};

const updateUser = userId => {
	return Axios.put(`/users/${userId}`);
};

export const userService = {
	createUser,
	trashUser,
	untrashUser,
	updateUser,
};
