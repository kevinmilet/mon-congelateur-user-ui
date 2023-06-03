import React from 'react';
import './productCard.scss';
import { utilsService } from '../../services/utils.service';
import Fruits from '../../assets/img/apple.png';
import Breads from '../../assets/img/buns.png';
import Aperitives from '../../assets/img/cocktail.png';
import Desserts from '../../assets/img/cupcake.png';
import Default from '../../assets/img/eating.png';
import Fishes from '../../assets/img/fish.png';
import Icecreams from '../../assets/img/ice-cream.png';
import Meat from '../../assets/img/meat.png';
import Homemade from '../../assets/img/piri-piri-chicken.png';
import Industrial from '../../assets/img/pizza.png';
import Snacks from '../../assets/img/vegan-burger.png';
import Vegetables from '../../assets/img/vegetable.png';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';
require('dayjs/locale/fr');

const ProductCard = ({ product, productType }) => {
	const localizedFormat = require('dayjs/plugin/localizedFormat');
	dayjs.extend(localizedFormat);

	let img;

	switch (productType.id) {
		case 1:
			img = Meat;
			break;
		case 2:
			img = Fishes;
			break;
		case 3:
			img = Fruits;
			break;
		case 4:
			img = Vegetables;
			break;
		case 5:
			img = Homemade;
			break;
		case 6:
			img = Industrial;
			break;
		case 7:
			img = Icecreams;
			break;
		case 8:
			img = Desserts;
			break;
		case 9:
			img = Snacks;
			break;
		case 10:
			img = Aperitives;
			break;
		case 11:
			img = Breads;
			break;
		case 12:
			img = Default;
			break;
		default:
			img = Default;
	}

	return (
		<article className='product-card'>
			<div className='img-container'>
				<img src={img} alt={productType.name} />
			</div>
			<div className='container'>
				<h4>
					<b>{utilsService.capitalize(product.name)}</b>
				</h4>
				<p>{utilsService.capitalize(productType.name)}</p>
				<small>
					Ajouté le{' '}
					{dayjs(product.adding_date).locale('fr').format('DD MMMM YYYY')}
				</small>
			</div>
			<div class='card-overlay'>
				<div class='edit-icon'>
					<EditIcon />
				</div>
				<div class='trash-icon'>
					<DeleteIcon />
				</div>
			</div>
		</article>
	);
};

export default ProductCard;
