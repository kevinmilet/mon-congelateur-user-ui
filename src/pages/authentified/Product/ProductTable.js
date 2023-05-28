import React, { useEffect, useState } from 'react';
import './productTable.scss';
import dayjs from 'dayjs';
import { productService } from '../../../services/product.service';
import Loader from '../../../components/Tools/Loader';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ProductCard from '../../../components/Product/ProductCard';
require('dayjs/locale/fr');

const ProductTable = ({ freezerId }) => {
	const localizedFormat = require('dayjs/plugin/localizedFormat');
	dayjs.extend(localizedFormat);

	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleEdit = product => {
		console.log('Edited Rows: ', product);
	};

	const handleDelete = productId => {
		console.log('Deleted Rows: ', productId);
	};

	const handleClick = row => {
		console.log('Selected Row id: ', row);
	};

	useEffect(() => {
		if (freezerId !== undefined) {
			productService
				.getProductsByFreezerid(freezerId)
				.then(response => {
					setProducts(response.data.data);
				})
				.catch(error => console.error(error))
				.finally(
					setTimeout(() => {
						setLoading(false);
					}, '1000')
				);
		}
	}, [freezerId]);

	// Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 6;
	const lastPage = currentPage * itemsPerPage;
	const firstPage = lastPage - itemsPerPage;
	const items = products.slice(firstPage, lastPage);
	const npage = Math.ceil(products.length / itemsPerPage);
	const numbers = [...Array(npage + 1).keys()].slice(1);

	const prevPage = () => {
		if (currentPage !== firstPage) {
			setCurrentPage(currentPage - 1);
		}
	};

	const nextPage = () => {
		if (currentPage !== lastPage) {
			setCurrentPage(currentPage + 1);
		}
	};

	const changePage = id => {
		setCurrentPage(id);
	};

	return (
		<main className='freezers-content-container'>
			{loading ? (
				<Loader />
			) : (
				<>
					<h4>Vous avez {products.length} article(s) dans ce congélateur</h4>
					<div className='products-grid'>
						{items.map(product => (
							<div
								className='freezer-item'
								key={product.product_id}
								onClick={() => handleClick(product.id)}
							>
								<ProductCard
									product={product}
									productType={product.ProductType}
								/>
							</div>
						))}
					</div>

					{products.length >= itemsPerPage && (
						<nav className='pagination-container'>
							<ul className='pagination'>
								<li
									className={`page-item ${
										currentPage === firstPage + 1 ? 'disabled' : ''
									}`}
								>
									<p className='page-link' onClick={prevPage}>
										<ArrowBackIosIcon />
									</p>
								</li>
								{numbers.map((n, i) => (
									<li
										className={`page-item ${currentPage === n ? 'active' : ''}`}
										key={i}
									>
										<p className='page-link' onClick={() => changePage(n)}>
											{n}
										</p>
									</li>
								))}
								<li
									className={`page-item ${
										currentPage === numbers.length ? 'disabled' : ''
									}`}
								>
									<p className='page-link' onClick={nextPage}>
										<ArrowForwardIosIcon />
									</p>
								</li>
							</ul>
						</nav>
					)}
				</>
			)}
		</main>
	);
};

export default ProductTable;
