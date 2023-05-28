import React, { useState } from 'react';
import './login.scss';
import Avatar from '../../assets/img/avatar.png';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { authService } from '../../services/auth.service';
import Cookies from 'js-cookie';
import sha256 from 'sha256';

const Login = () => {
	const navigate = useNavigate();
	const [userInfos, setUserInfos] = useState({});

	const validationSchema = Yup.object()
		.shape({
			email: Yup.string()
				.required("L'email est requis")
				.email("L'email est invalide"),
			password: Yup.string().required('Le mot de passe est requis'),
			remember: Yup.boolean(),
		})
		.required();

	const { register, handleSubmit, formState } = useForm({
		defaultValues: {
			email: '',
			password: '',
			remember: false,
		},
		resolver: yupResolver(validationSchema),
	});

	const { errors } = formState;

	const onSubmit = credentials => {
		authService
			.login(credentials)
			.then(response => {
				authService.saveToken(response.data.jwt_token);

				const currentUser = authService.getPayload();
				setUserInfos(currentUser);

				if (credentials.remember) {
					console.log('ici');
					Cookies.set(
						'mon-congelateur',
						sha256(
							userInfos.account_id + userInfos.firstname + userInfos.lastname
						),
						{ expires: 30 }
					);
				}

				navigate('/monespace');
			})
			.catch(error => {
				console.error(error);
				handleError(error.response);
			});
	};

	const handleError = response => {
		document.getElementById('server-error').innerHTML = response.data.message;
	};

	return (
		<>
			<div className='login-title'>
				<h1>Bienvenue sur Mon Congélateur!</h1>
			</div>
			<div className='login-container'>
				<div className='login-form-container'>
					<div id='server-error'></div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='img-container'>
							<img src={Avatar} alt='Avatar' className='avatar' />
						</div>

						<div className='container'>
							<label htmlFor='email'>
								<b>Email</b>
								<span className='error-msg'>{errors.email?.message}</span>
							</label>
							<input
								type='email'
								placeholder='Entrez votre email'
								id='email'
								name='email'
								{...register('email')}
							/>

							<label htmlFor='password'>
								<b>Mot de passe</b>
								<span className='error-msg'>{errors.password?.message}</span>
							</label>
							<input
								type='password'
								placeholder='Entrez votre mot de passe'
								id='password'
								name='password'
								{...register('password')}
							/>

							{/* <input
								type='checkbox'
								name='remember'
								id='remember'
								className='remember'
								{...register('remember')}
							/>
							<label htmlFor='remember'>Se souvenir de moi</label> */}

							<input
								type='submit'
								value='Connexion'
								className='connexion-btn'
							/>
						</div>

						<div className='bottom-container'>
							<Link to='/forgot'>Mot de passe oublié?</Link>
							<Link to='/inscription'>Pas encore inscrit?</Link>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
