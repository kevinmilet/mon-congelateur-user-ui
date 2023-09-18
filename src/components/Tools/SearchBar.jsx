import React from 'react';
import './searchBar.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const SearchBar = () => {
	const validationSchema = Yup.object()
		.shape({
			search: Yup.string(),
		})
		.required();

	const { register, handleSubmit, formState } = useForm({
		defaultValues: {
			search: '',
		},
		resolver: yupResolver(validationSchema),
	});

	const { errors } = formState;

	const onSubmit = search => {
		console.log(search);
	};

	return (
		<form className='form-container' onSubmit={handleSubmit(onSubmit)}>
			<input
				type='text'
				className='searchTerm'
				placeholder='Tapez votre recherche...'
				name='search'
				id='search'
				{...register('search')}
			/>
			<button type='submit' className='searchButton'>
				Rechercher
			</button>
		</form>
	);
};

export default SearchBar;
