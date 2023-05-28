import React, { useEffect, useState } from 'react';
import './productTable.scss';
import dayjs from 'dayjs';
import { productService } from '../../../services/product.service';
import { utilsService } from '../../../services/utils.service';
import Loader from '../../../components/Tools/Loader';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
require('dayjs/locale/fr');

const ProductTable = ({ freezerId }) => {
	const localizedFormat = require('dayjs/plugin/localizedFormat');
	dayjs.extend(localizedFormat);

	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleEdit = product => {
		console.log('Edited Rows: ', product);
		productService
			.getProductById(product.id)
			.then(res => console.log(res.data.data))
			.catch(err => console.log(err));
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
	const itemsPerPage = 10;
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

	console.log('fist ' + firstPage);
	console.log('last ' + lastPage);
	console.log('current ' + currentPage);
	console.log('numbers ' + numbers.length);

	return (
		<main className='freezers-content-container'>
			{loading ? (
				<Loader />
			) : (
				<>
					{products.length === 0 ? (
						<div className='empty'>Votre congélateur est vide !</div>
					) : (
						<table>
							<thead>
								<tr>
									<th>Nom</th>
									<th>Quantité</th>
									<th>Date d'ajout</th>
									<th>Type de produit</th>
									<th></th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{items?.map(product => (
									<tr key={product.product_id}>
										<td>{utilsService.capitalize(product.name)}</td>
										<td>{product.quantity}</td>
										<td>
											{dayjs(product.adding_date)
												.locale('fr')
												.format('DD MMMM YYYY')}
										</td>
										<td>
											{utilsService.capitalize(product?.ProductType?.name)}
										</td>
										<td className='btn' onClick={() => handleEdit(product)}>
											{<EditIcon />}
										</td>
										<td
											className='btn'
											onClick={() => handleDelete(product.id)}
										>
											{<DeleteIcon />}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}

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
