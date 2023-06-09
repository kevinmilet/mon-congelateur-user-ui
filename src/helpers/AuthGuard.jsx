import { Navigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

const AuthGuard = ({ children }) => {
	if (!authService.isLogged()) {
		return <Navigate to='../' />;
	}

	return children;
};

export default AuthGuard;
