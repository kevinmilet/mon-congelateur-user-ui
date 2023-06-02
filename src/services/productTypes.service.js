import Axios from './caller.service';

const getAllProductTypes = () => {
	return Axios.get('/producttypes');
};

const getProductTypeById = id => {
	return Axios.get(`/producttypes/${id}`);
};

export const freezerTypeService = {
	getAllProductTypes,
	getProductTypeById,
};
