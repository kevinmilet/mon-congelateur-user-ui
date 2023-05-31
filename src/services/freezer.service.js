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

const updateFreezer = datas => {
	return Axios.patch(`/freezers/${datas.id}`, datas);
};

const deleteFreezer = id => {
	return Axios.delete('/freezers/' + id);
};

const trashFreezer = id => {
	return Axios.delete('/freezers/trash/' + id);
};

const untrashFreezer = id => {
	Axios.post('/freezers/untrash/' + id);
};

export const freezerService = {
	getFreezersByUserid,
	getFreezerById,
	createFreezer,
	updateFreezer,
	deleteFreezer,
	trashFreezer,
	untrashFreezer,
};
