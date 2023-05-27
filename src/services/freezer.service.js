import Axios from './caller.service';

const getFreezersByUserid = id => {
	return Axios.get(`/freezers/user/${id}`);
};

const getFreezerById = id => {
	return Axios.get(`/freezers/${id}`);
};

const createFreezer = datas => {
	return Axios.put(`/freezers`, datas);
};

const updateFreezer = id => {
	return Axios.patch(`/freezers/${id}`);
};

export const freezerService = {
	getFreezersByUserid,
	getFreezerById,
	createFreezer,
	updateFreezer,
};
