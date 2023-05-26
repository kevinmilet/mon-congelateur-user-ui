import Axios from './caller.service';

const getFreezersByUserid = id => {
	return Axios.get(`/freezers/user/${id}`);
};

const getFreezerById = id => {
	return Axios.get(`/freezers/${id}`);
};

export const freezerService = {
	getFreezersByUserid,
	getFreezerById,
};
