import React from 'react';
import './addUser.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService } from '../../services/user.service';

const AddUser = () => {
	const navigate = useNavigate();

	const validationSchema = Yup.object()
		.shape({
			lastname: Yup.string()
				.trim()
				.matches(/^[A-Za-zéèàùûêâôöëç '-]+$/, 'Le format du nom est incorrect')
				.required('Le nom est requis'),
			firstname: Yup.string()
				.trim()
				.matches(
					/^[A-Za-zéèàùûêâôöëç '-]+$/,
					'Le format du prénom est incorrect'
				)
				.required('Le prénom est requis'),
			email: Yup.string()
				.trim()
				.required("L'email est requis")
				.email("L'email est invalide"),
			email_conf: Yup.string()
				.trim()
				.required("La confirmation d'email est requise")
				.test(
					'email_compare',
					'Les emails ne correspondent pas',
					function (email_conf) {
						return email_conf ? email_conf === this.parent.email : true;
					}
				),
			password: Yup.string()
				.required('Le mot de passe est requis')
				.min(8, 'Doit contenir au moins 8 caratères')
				.matches(
					"^[a-zA-Z0-9!*$@%&?,;:#()<>'\\/\\_éèàùûêâôöëç+-.]+$",
					'Doit contenir au moins 1 minuscule, 1 majuscule, 1 chiffre, 1 caractère spécial'
				),
			password_conf: Yup.string()
				.test(
					'password_compare',
					'Les mots de passe ne correspondent pas',
					function (password_conf) {
						return password_conf
							? password_conf === this.parent.password
							: true;
					}
				)
				.required('La confirmation du mot de passe est requise'),
		})
		.required();

	const { register, handleSubmit, formState } = useForm({
		defaultValues: {
			lastname: '',
			firstname: '',
			email: '',
			email_conf: '',
			password: '',
			password_conf: '',
		},
		resolver: yupResolver(validationSchema),
	});

	const { errors } = formState;

	const onSubmit = datas => {
		userService
			.createUser(datas)
			.then(response => {
				if (response.status === 200) {
					handleSuccess();
					setTimeout(() => {
						navigate('/');
					}, 5000);
				}
			})
			.catch(error => {
				console.error(error);
				handleError(error.response);
			});
	};

	const handleSuccess = () => {
		const elements = document.querySelectorAll('input');
		document.querySelector('.signup-btn').setAttribute('disabled', true);

		elements.forEach(el => el.setAttribute('disabled', true));

		document.getElementById('success').innerHTML =
			'Inscription réussie. Vous allez être redirigé dans 5 secondes ...';
	};

	const handleError = response => {
		document.getElementById('server-error').innerHTML = response.data.message;
	};

	return (
		<>
			<div className='login-title'>
				<h1>Inscrivez-vous à Mon Congélateur</h1>
			</div>

			<div className='login-container'>
				<div className='login-form-container'>
					<div id='success'></div>
					<div id='server-error'></div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='container'>
							<div className='row'>
								<div className='col'>
									<label htmlFor='lastname'>
										<b>Nom</b>
										<span className='error-msg'>
											{errors.lastname?.message}
										</span>
									</label>
									<input
										type='text'
										placeholder='Entrez votre nom'
										id='lastname'
										name='lastname'
										{...register('lastname')}
									/>
								</div>

								<div className='col'>
									<label htmlFor='firstname'>
										<b>Prénom</b>
										<span className='error-msg'>
											{errors.firstname?.message}
										</span>
									</label>
									<input
										type='text'
										placeholder='Entrez votre prénom'
										id='firstname'
										name='firstname'
										{...register('firstname')}
									/>
								</div>
							</div>

							<div className='row'>
								<div className='col'>
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
								</div>

								<div className='col'>
									<label htmlFor='email_conf'>
										<b>Confirmation Email</b>
										<span className='error-msg'>
											{errors.email_conf?.message}
										</span>
									</label>
									<input
										type='email'
										placeholder='Confirmez votre email'
										id='email_conf'
										name='email_conf'
										{...register('email_conf')}
									/>
								</div>
							</div>

							<div className='row'>
								<div className='col'>
									<label htmlFor='password'>
										<b>Mot de passe</b>
										<span className='error-msg'>
											{errors.password?.message}
										</span>
									</label>
									<input
										type='password'
										placeholder='Entrez votre mot de passe'
										id='password'
										name='password'
										{...register('password')}
									/>
								</div>

								<div className='col'>
									<label htmlFor='password_conf'>
										<b>Confirmation Mot de passe</b>
										<span className='error-msg'>
											{errors.password_conf?.message}
										</span>
									</label>
									<input
										type='password'
										placeholder='Confirmez votre mot de passe'
										id='password_conf'
										name='password_conf'
										{...register('password_conf')}
									/>
								</div>
							</div>

							<input type='submit' value='Inscription' className='signup-btn' />
						</div>

						<div className='bottom-container'>
							<Link to='/'>Déjà inscrit?</Link>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default AddUser;
