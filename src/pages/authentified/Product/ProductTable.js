import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import dayjs from 'dayjs';
import { productService } from '../../../services/product.service';
import { utilsService } from '../../../services/utils.service';
import Loader from '../../../components/Tools/Loader';
require('dayjs/locale/fr');

const ProductTable = ({ freezerId }) => {
	const localizedFormat = require('dayjs/plugin/localizedFormat');
	dayjs.extend(localizedFormat);

	const [products, setProducts] = useState([]);
	const [selectedRows, setSelectedRows] = React.useState(false);
	const [loading, setLoading] = useState(true);

	const columns = [
		{
			name: 'Nom',
			selector: row => utilsService.capitalize(row?.name),
			sortable: true,
		},
		{
			name: 'Quantité',
			selector: row => row?.quantity,
			sortable: true,
		},
		{
			name: "Date d'ajout",
			selector: row =>
				dayjs(row.adding_date).locale('fr').format('DD MMMM YYYY'),
			sortable: true,
		},
		{
			name: 'Type de produit',
			selector: row => utilsService.capitalize(row?.ProductType?.name),
			sortable: true,
		},
	];

	const paginationComponentOptions = {
		rowsPerPageText: 'Produits par pages',
		rangeSeparatorText: 'sur',
		selectAllRowsItem: true,
		selectAllRowsItemText: 'Toutes',
	};

	const customStyles = {
		table: {
			style: {
				color: '#212738ff',
				borderRadius: '16px',
			},
		},
		rows: {
			style: {
				'&:hover': {
					backgroundColor: 'rgba(213, 86, 114, .5)',
					cursor: 'pointer',
				},
			},
		},
		head: {
			style: {
				fontSize: '16px',
				fontWeight: 800,
				color: '#212738ff',
			},
		},
		noData: {
			style: {
				padding: '30px',
			},
		},
	};

	const handleChange = ({ selectedRows }) => {
		console.log('Selected Rows: ', selectedRows);
		setSelectedRows(selectedRows);
	};

	const handleClick = row => {
		console.log('Selected Row id: ', row);
	};

	useEffect(() => {
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
	}, [freezerId]);

	return (
		<div>
			{products.length > 0 ? (
				<DataTable
					columns={columns}
					data={products}
					selectableRows
					customStyles={customStyles}
					onSelectedRowsChange={handleChange}
					pagination
					paginationPerPage={10}
					paginationRowsPerPageOptions={[5, 10, 15, 20]}
					paginationComponentOptions={paginationComponentOptions}
					onRowClicked={row => handleClick(row)}
					noDataComponent='Votre congélateur est vide !!!'
					progressPending={loading}
					progressComponent={<Loader />}
				/>
			) : (
				'Votre congélateur est vide !!!'
			)}
		</div>
	);
};

export default ProductTable;
