import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { productTypeService } from '../../../services/productTypes.service';
import { productService } from '../../../services/product.service';
import { utilsService } from '../../../services/utils.service';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
	const navigate = useNavigate();
	const [productTypes, setProductTypes] = useState([]);
	const [loading, setLoading] = useState(true);
	const cleanFlag = useRef(false);

	const validationSchema = Yup.object()
		.shape({
			name: Yup.string().required('Le nom est requis'),
			product_type_id: Yup.string().required('Le type est requis'),
		})
		.required();

	const { register, handleSubmit, formState } = useForm({
		defaultValues: {
			name: '',
			product_type_id: '',
		},
		resolver: yupResolver(validationSchema),
	});

	const { errors } = formState;

	const currentUserId = 1;

	const onSubmit = datas => {
		// datas = {
		// 	...datas,
		// 	product_type_id: ~~datas.product_type_id,
		// 	user_id: currentUserId,
		// };
		// productService
		// 	.createFreezer(datas)
		// 	.then(response => {
		// 		if (response.status === 200) {
		// 			navigate('/monespace/freezers');
		// 		}
		// 	})
		// 	.catch(error => console.error(error));
	};

	useEffect(() => {
		// if (cleanFlag.current === false) {
		// 	productTypeService
		// 		.getAllFreezerTypes()
		// 		.then(response => {
		// 			setFreezerTypes(response.data.data);
		// 		})
		// 		.catch(error => console.error(error))
		// 		.finally(setLoading(false));
		// }
		// return () => (cleanFlag.current = true);
	}, []);
	return (
		<main className='add-freezer-container'>
			<h1>Ajouter un Article</h1>

			<div className='form-container'>
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
