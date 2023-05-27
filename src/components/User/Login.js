import React from 'react';
import './login.scss';
import Avatar from '../../assets/img/avatar.png';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { authService } from '../../services/auth.service';

const Login = () => {
	const navigate = useNavigate();
	//const [userInfos, setUserInfos] = useState({});

	const validationSchema = Yup.object()
		.shape({
			email: Yup.string()
				.required("L'email est requis")
				.email("L'email est invalide"),
			password: Yup.string().required('Le mot de passe est requis'),
		})
		.required();

	const { register, handleSubmit, formState } = useForm({
		defaultValues: {
			email: '',
		},
		resolver: yupResolver(validationSchema),
	});

	const { errors } = formState;

	const onSubmit = credentials => {
		authService
			.login(credentials)
			.then(response => {
				authService.saveToken(response.data.jwt_token);
				// setUserInfos(response.data.userName);
				navigate('/monespace');
			})
			.catch(error => console.error(error));
	};

	return (
		<>
			<div className='login-title'>
				<h1>Bienvenue sur Mon Congélateur!</h1>
			</div>
			<div className='login-container'>
				<div className='login-form-container'>
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
