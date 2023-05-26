import React from 'react';
import './freezerCard.scss';
import Congelateur from '../../assets/img/freezer.png';
import { utilsService } from '../../services/utils.service';

const FreezerCard = ({ freezer, freezerType }) => {
	return (
		<article className='card'>
			<div className='img-container'>
				<img src={Congelateur} alt='Congélateur' />
			</div>
			<div className='container'>
				<h4>
					<b>{utilsService.capitalize(freezer.name)}</b>
				</h4>
				<p>{utilsService.capitalize(freezerType.name)}</p>
			</div>
		</article>
	);
};

export default FreezerCard;
