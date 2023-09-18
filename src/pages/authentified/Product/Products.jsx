import React from 'react';
import './products.scss';
import SearchBar from '../../../components/Tools/SearchBar';

const Products = () => {
	return (
		<main className='products-list-container'>
			<h1>Mes produits</h1>
			<SearchBar />
		</main>
	);
};

export default Products;
