import Axios from './caller.service';

const getAllFreezerTypes = () => {
	return Axios.get('/freezertypes');
};

const getFreezerTypeById = id => {
	return Axios.get(`/freezertypes/${id}`);
};

export const freezerTypeService = {
	getAllFreezerTypes,
	getFreezerTypeById,
};
