import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './productTable.scss';
import { productService } from '../../../services/product.service';
import Loader from '../../../components/Tools/Loader';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ProductCard from '../../../components/Product/ProductCard';

const ProductTable = ({ freezerId }) => {
	const navigate = useNavigate();

	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

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

	const addProduct = () => {
		navigate('../../products/create');
	};

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
					<div className='btn-container'>
						<h4>Vous avez {products.length} article(s) dans ce congélateur</h4>
						<button className='add-btn' onClick={addProduct}>
							Ajouter un article
						</button>
					</div>
					<div className='products-grid'>
						{items.map(product => (
							<div className='freezer-item' key={product.product_id}>
								<ProductCard
									product={product}
									productType={product.ProductType}
									setProducts={setProducts}
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
