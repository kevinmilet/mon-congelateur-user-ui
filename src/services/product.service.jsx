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

const createProduct = datas => {
	return Axios.put('/products', datas);
};

const updateProduct = datas => {
	return Axios.put(`/products/${datas.id}`, datas);
};

const deleteProduct = id => {
	return Axios.delete('/products/' + id);
};

const trashProduct = id => {
	return Axios.delete('/products/trash/' + id);
};

const untrashProduct = id => {
	Axios.post('/products/untrash/' + id);
};

export const productService = {
	getProductsByFreezerid,
	getProductsByUserId,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
	trashProduct,
	untrashProduct,
};
