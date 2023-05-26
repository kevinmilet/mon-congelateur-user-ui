import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { freezerService } from '../../../services/freezer.service';
import { utilsService } from '../../../services/utils.service';
import './freezerDetails.scss';
import ProductTable from '../Product/ProductTable';

const FreezerDetails = () => {
	const { id } = useParams();
	const [freezer, setFreezer] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		freezerService
			.getFreezerById(id)
			.then(response => {
				setFreezer(response.data.data);
			})
			.catch(error => console.error(error))
			.finally(setLoading(false));
	}, [id]);

	return (
		<main className='freezer-details-container'>
			{loading ? (
				<></>
			) : (
				<>
					<h1>
						{freezer.name ? (
							utilsService.capitalize(freezer.name)
						) : (
							<span className='skeleton'></span>
						)}
					</h1>
					<div className='table-container'>
						<ProductTable freezerId={freezer.id} />
					</div>
				</>
			)}
		</main>
	);
};

export default FreezerDetails;
