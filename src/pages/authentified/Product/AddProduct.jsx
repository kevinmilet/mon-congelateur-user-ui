import React, { useEffect, useState, useRef } from 'react';
import './addProduct.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { productTypeService } from '../../../services/productTypes.service';
import { productService } from '../../../services/product.service';
import { freezerService } from '../../../services/freezer.service';
import { utilsService } from '../../../services/utils.service';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const AddProduct = () => {
	const navigate = useNavigate();
	const [productTypes, setProductTypes] = useState([]);
	const [userFreezers, setUserFreezers] = useState([]);
	const [loading, setLoading] = useState(true);
	const cleanFlag = useRef(false);

	const validationSchema = Yup.object()
		.shape({
			name: Yup.string().required('Le nom est requis'),
			product_type_id: Yup.string().required('Le type est requis'),
			quantity: Yup.string().required('La quantité est requise'),
			adding_date: Yup.string().required("La date d'ajout est requise"),
		})
		.required();

	const { register, handleSubmit, formState } = useForm({
		defaultValues: {
			name: '',
			product_type_id: '',
			quantity: '',
			adding_date: '',
		},
		resolver: yupResolver(validationSchema),
	});

	const { errors } = formState;

	const currentUserId = 1;

	const onSubmit = datas => {
		datas = {
			...datas,
			product_type_id: ~~datas.product_type_id,
			quantity: ~~datas.quantity,
			user_id: currentUserId,
			freezer_id: ~~datas.freezer_id,
		};

		productService
			.createProduct(datas)
			.then(response => {
				if (response.status === 200) {
					navigate('/monespace/freezers');
				}
			})
			.catch(error => console.error(error));
	};

	useEffect(() => {
		if (cleanFlag.current === false) {
			productTypeService
				.getAllProductTypes()
				.then(response => {
					setProductTypes(response.data.data);
				})
				.catch(error => console.error(error))
				.finally(
					freezerService
						.getFreezersByUserid(currentUserId)
						.then(res => {
							setUserFreezers(res.data.data);
						})
						.catch(err => console.error(err))
				);
			setLoading(false);
		}
		return () => (cleanFlag.current = true);
	}, []);

	return (
		<main className='add-product-container'>
			<h1>Ajouter un Article</h1>

			<div className='form-container'>
				<div className='goBack' onClick={() => navigate(-1)}>
					<ArrowBackIosIcon />
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='container'>
						<label htmlFor='name'>
							<b>Nom du produit</b>
							<span className='error-msg'>{errors.name?.message}</span>
						</label>
						<input
							type='text'
							placeholder='Entrez un nom'
							id='name'
							name='name'
							{...register('name')}
						/>

						<label htmlFor='product_type_id'>
							<b>Type de produit</b>
							<span className='error-msg'>
								{errors.product_type_id?.message}
							</span>
						</label>
						<select
							disabled={loading}
							id='product_type_id'
							name='product_type_id'
							placeholder='Selectionnez un type'
							{...register('product_type_id')}
						>
							<option defaultValue value='' />
							{productTypes?.map(item => (
								<option value={item.id} key={item.id}>
									{utilsService.capitalize(item.name)}
								</option>
							))}
						</select>

						<label htmlFor='quantity'>
							<b>Quantité</b>
							<span className='error-msg'>{errors.quantity?.message}</span>
						</label>
						<input
							type='number'
							placeholder='Entrez une quantité'
							id='quantity'
							name='quantity'
							min='0'
							{...register('quantity')}
						/>

						<label htmlFor='adding_date'>
							<b>Date d'ajout</b>
							<span className='error-msg'>{errors.adding_date?.message}</span>
						</label>
						<input
							type='date'
							id='adding_date'
							name='adding_date'
							{...register('adding_date')}
						/>

						<label htmlFor='freezer_id'>
							<b>Congélateur</b>
							<span className='error-msg'>{errors.freezer_id?.message}</span>
						</label>
						<select
							disabled={loading}
							id='freezer_id'
							name='freezer_id'
							placeholder='Selectionnez un congélateur'
							{...register('freezer_id')}
						>
							<option defaultValue value='' />
							{userFreezers?.map(item => (
								<option value={item.id} key={item.id}>
									{utilsService.capitalize(item.name)}
								</option>
							))}
						</select>

						<div className='btn-container'>
							<input type='submit' value='Ajouter' className='add-btn' />
						</div>
					</div>
				</form>
			</div>
		</main>
	);
};

export default AddProduct;
