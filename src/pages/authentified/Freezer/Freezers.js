import React, { useState, useEffect } from 'react';
import FreezerCard from '../../../components/Freezer/FreezerCard';
import './freezers.scss';
import { freezerService } from '../../../services/freezer.service';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Tools/Loader';

const Freezers = () => {
	const navigate = useNavigate();
	const [freezers, setFreezers] = useState([]);
	const [loading, setLoading] = useState(true);

	const id = 1;

	useEffect(() => {
		freezerService
			.getFreezersByUserid(id)
			.then(response => {
				setFreezers(response.data.data);
			})
			.catch(error => console.error(error));

		setLoading(false);
	}, []);

	const handleClick = freezerId => {
		navigate(`./details/${freezerId}`);
	};

	return (
		<main className='freezers-container'>
			{loading ? (
				<Loader />
			) : (
				<>
					<h1>Mes congélateurs</h1>
					<div className='freezers-grid'>
						{freezers.map(freezer => (
							<div
								className='freezer-item'
								key={freezer.freezer_id}
								onClick={() => handleClick(freezer.id)}
							>
								<FreezerCard
									freezer={freezer}
									freezerType={freezer.FreezerType}
								/>
							</div>
						))}
					</div>
				</>
			)}
		</main>
	);
};

export default Freezers;
