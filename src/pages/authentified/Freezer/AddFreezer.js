import React, { useEffect, useState, useRef } from 'react';
import './addFreezer.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { freezerTypeService } from '../../../services/freezerTypes.service';
import { freezerService } from '../../../services/freezer.service';
import { utilsService } from '../../../services/utils.service';
import { useNavigate } from 'react-router-dom';

const AddFreezer = () => {
	const navigate = useNavigate();
	const [freezerTypes, setFreezerTypes] = useState([]);
	const [loading, setLoading] = useState(true);
	const cleanFlag = useRef(false);

	const validationSchema = Yup.object()
		.shape({
			name: Yup.string().required('Le nom est requis'),
			freezer_type_id: Yup.string().required('Le type est requis'),
		})
		.required();

	const { register, handleSubmit, formState } = useForm({
		defaultValues: {
			name: '',
			freezer_type_id: '',
		},
		resolver: yupResolver(validationSchema),
	});

	const { errors } = formState;

	const currentUserId = 1;

	const onSubmit = datas => {
		datas = {
			...datas,
			freezer_type_id: ~~datas.freezer_type_id,
			user_id: currentUserId,
		};

		freezerService
			.createFreezer(datas)
			.then(response => {
				if (response.status === 200) {
					navigate('/monespace/freezers');
				}
			})
			.catch(error => console.error(error));
	};

	useEffect(() => {
		if (cleanFlag.current === false) {
			freezerTypeService
				.getAllFreezerTypes()
				.then(response => {
					setFreezerTypes(response.data.data);
				})
				.catch(error => console.error(error))
				.finally(setLoading(false));
		}

		return () => (cleanFlag.current = true);
	}, []);

	return (
		<main className='add-freezer-container'>
			<h1>Ajouter un congélateur</h1>

			<div className='form-container'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='container'>
						<label htmlFor='name'>
							<b>Nom du congélateur</b>{' '}
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
							<b>Type de congélateur</b>
							<span className='error-msg'>
								{errors.freezer_type_id?.message}
							</span>
						</label>
						<select
							disabled={loading}
							id='freezer_type_id'
							name='freezer_type_id'
							placeholder='Selectionnez un type'
							{...register('freezer_type_id')}
						>
							<option defaultValue value='' />
							{freezerTypes?.map(item => (
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

export default AddFreezer;
