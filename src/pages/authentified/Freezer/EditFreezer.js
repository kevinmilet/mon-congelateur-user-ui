import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { freezerService } from '../../../services/freezer.service';
import { utilsService } from '../../../services/utils.service';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { freezerTypeService } from '../../../services/freezerTypes.service';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const EditFreezer = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [freezerTypes, setFreezerTypes] = useState([]);
	const [freezer, setFreezer] = useState([]);
	const [loading, setLoading] = useState(true);
	const cleanFlag = useRef(false);

	const validationSchema = Yup.object()
		.shape({
			name: Yup.string().required('Le nom est requis'),
			freezer_type_id: Yup.string().required('Le type est requis'),
		})
		.required();

	const { register, handleSubmit, formState, setValue } = useForm({
		defaultValues: {
			name: '',
			freezer_type_id: '',
		},
		resolver: yupResolver(validationSchema),
	});

	const { errors } = formState;

	const onSubmit = datas => {
		datas = {
			...datas,
			freezer_type_id: ~~datas.freezer_type_id,
			id: ~~id,
		};

		console.log(datas);

		freezerService
			.updateFreezer(datas)
			.then(response => {
				if (response.status === 200) {
					navigate('/monespace/freezers');
				}
			})
			.catch(error => console.error(error));
	};

	useEffect(() => {
		if (cleanFlag.current === false) {
			freezerService
				.getFreezerById(id)
				.then(response => {
					setFreezer(response.data.data);
				})
				.catch(error => console.error(error))
				.finally(
					freezerTypeService
						.getAllFreezerTypes()
						.then(response => {
							setFreezerTypes(response.data.data);
						})
						.catch(error => console.error(error))
				);
			setLoading(false);
		}

		let name = freezer.name;
		let freezerType = freezer.freezer_type_id;

		setValue('name', utilsService.capitalize(name !== undefined ? name : ''));
		setValue('freezer_type_id', freezerType);

		return () => (cleanFlag.current = true);
	}, [freezer?.freezer_type_id, freezer?.name, id, setValue]);

	return (
		<main className='edit-freezer-container'>
			<h1>Modifier votre congélateur</h1>

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

export default EditFreezer;
