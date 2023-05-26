import AuthGuard from './helpers/AuthGuard';
import AuthentifiedRouter from './routers/AuthentifiedRouter';
import PublicRouter from './routers/PublicRouter';
import './styles/global.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/*' element={<PublicRouter />} />
				<Route
					path='/monespace/*'
					element={
						<AuthGuard>
							<AuthentifiedRouter />
						</AuthGuard>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
