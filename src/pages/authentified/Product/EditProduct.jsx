import React, { useState, useEffect, useRef } from 'react';
import './editProduct.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { productService } from '../../../services/product.service';
import { productTypeService } from '../../../services/productTypes.service';
import { freezerService } from '../../../services/freezer.service';
import { utilsService } from '../../../services/utils.service';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import dayjs from 'dayjs';
require('dayjs/locale/fr');

const EditProduct = () => {
	const localizedFormat = require('dayjs/plugin/localizedFormat');
	dayjs.extend(localizedFormat);
	const { id } = useParams();
	const navigate = useNavigate();
	const [product, setProduct] = useState([]);
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
			freezer_id: Yup.string().required('Le congélateur est requis'),
		})
		.required();

	const { register, handleSubmit, formState, setValue } = useForm({
		defaultValues: {
			name: '',
			product_type_id: '',
			quantity: '',
			adding_date: '',
			freezer_id: '',
		},
		resolver: yupResolver(validationSchema),
	});

	const { errors } = formState;

	const currentUserId = 1;

	useEffect(() => {
		if (cleanFlag.current === false) {
			productService
				.getProductById(id)
				.then(response => {
					setProduct(response.data.data);
				})
				.catch(error => console.error(error))
				.finally(
					productTypeService
						.getAllProductTypes()
						.then(res => {
							setProductTypes(res.data.data);
						})
						.catch(err => console.error(err))
						.finally(
							freezerService
								.getFreezersByUserid(currentUserId)
								.then(res => {
									setUserFreezers(res.data.data);
								})
								.catch(err => console.error(err))
						)
				);
			setLoading(false);
		}

		let name = product.name;
		let productType = product.product_type_id;
		let quantity = product.quantity;
		let adding = product.adding_date;
		let freezer = product.freezer_id;

		setValue('name', utilsService.capitalize(name !== undefined ? name : ''));
		setValue('product_type_id', productType);
		setValue('quantity', quantity);
		setValue('adding_date', dayjs(adding).locale('fr').format('YYYY-MM-DD'));
		setValue('freezer_id', freezer);

		return () => (cleanFlag.current = true);
	}, [
		id,
		product.adding_date,
		product.freezer_id,
		product.name,
		product.product_type_id,
		product.quantity,
		setValue,
	]);

	const onSubmit = datas => {
		datas = {
			...datas,
			product_type_id: ~~datas.product_type_id,
			id: ~~id,
			freezer_id: ~~datas.freezer_id,
			quantity: ~~datas.quantity,
		};

		console.log(datas);

		productService
			.updateProduct(datas)
			.then(response => {
				if (response.status === 200) {
					navigate(-1);
				}
			})
			.catch(error => console.error(error));
	};

	return (
		<main className='edit-product-container'>
			<h1>Modifier votre produit</h1>

			{loading ? (
				<></>
			) : (
				<>
					<div className='form-container'>
						<div className='goBack' onClick={() => navigate(-1)}>
							<ArrowBackIosIcon />
						</div>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='container'>
								<label htmlFor='name'>
									<b>Nom du produit</b>{' '}
									<span className='error-msg'>{errors.name?.message}</span>
								</label>
								<input
									type='text'
									placeholder='Entrez un nom'
									id='name'
									name='name'
									{...register('name')}
								/>

								<label htmlFor='freezer_type_id'>
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
									{productTypes?.map(item => (
										<option
											value={item.id}
											key={item.id}
											selected={item.id === product.product_type_id}
										>
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
									<span className='error-msg'>
										{errors.adding_date?.message}
									</span>
								</label>
								<input
									type='date'
									id='adding_date'
									name='adding_date'
									{...register('adding_date')}
								/>

								<label htmlFor='freezer_id'>
									<b>Congélateur</b>
									<span className='error-msg'>
										{errors.freezer_id?.message}
									</span>
								</label>
								<select
									disabled={loading}
									id='freezer_id'
									name='freezer_id'
									placeholder='Selectionnez un congélateur'
									{...register('freezer_id')}
								>
									{userFreezers?.map(item => (
										<option
											value={item.id}
											key={item.id}
											selected={item.id === product.freezer_id}
										>
											{utilsService.capitalize(item.name)}
										</option>
									))}
								</select>

								<div className='btn-container'>
									<input type='submit' value='Modifier' className='add-btn' />
								</div>
							</div>
						</form>
					</div>
				</>
			)}
		</main>
	);
};

export default EditProduct;
