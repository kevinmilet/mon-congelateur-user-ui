import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
	let token = localStorage.getItem('token');

	if (token === null) {
		return <Navigate to='/' />;
	}
	return children;
};

export default AuthGuard;
