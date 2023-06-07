import React, { useState, useEffect, useRef } from 'react';
import './editProduct.scss';
import { useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '../../../components/Tools/Modal';
import { productService } from '../../../services/product.service';

const EditProduct = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [product, setProduct] = useState([]);
	const [loading, setLoading] = useState(true);
	const [openModal, setOpenModal] = useState(false);
	const [content, setContent] = useState('');
	const cleanFlag = useRef(false);

	useEffect(() => {
		if (cleanFlag.current === false) {
			productService
				.getProductById(id)
				.then(response => {
					setProduct(response.data.data);
				})
				.catch(error => console.error(error))
				.finally(setLoading(false));
		}
		return () => (cleanFlag.current = true);
	}, [id]);

	return (
		<>
			<button onClick={() => navigate(-1)}>Go Back</button>
			<div>{product.name}</div>
		</>
	);
};

export default EditProduct;
