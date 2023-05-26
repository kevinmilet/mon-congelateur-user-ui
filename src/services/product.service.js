import Axios from './caller.service';

const getProductsByFreezerid = id => {
	return Axios.get(`/products/freezer/${id}`);
};

const getProductsByUserId = id => {
	return Axios.get(`/products/user/${id}`);
};

const getProductById = id => {
	return Axios.get(`/products/${id}`);
};

export const productService = {
	getProductsByFreezerid,
	getProductsByUserId,
	getProductById,
};
