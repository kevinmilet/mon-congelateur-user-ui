import React, { useState, useEffect, useRef } from 'react';
import './editFreezer.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { freezerService } from '../../../services/freezer.service';
import { utilsService } from '../../../services/utils.service';
import './freezerDetails.scss';
import ProductTable from '../Product/ProductTable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '../../../components/Tools/Modal';

const FreezerDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [freezer, setFreezer] = useState([]);
	const [loading, setLoading] = useState(true);
	const [openModal, setOpenModal] = useState(false);
	const [content, setContent] = useState('');
	const cleanFlag = useRef(false);

	useEffect(() => {
		if (cleanFlag.current === false) {
			freezerService
				.getFreezerById(id)
				.then(response => {
					setFreezer(response.data.data);
				})
				.catch(error => console.error(error))
				.finally(setLoading(false));
		}
		return () => (cleanFlag.current = true);
	}, [id]);

	const onDeleteClick = id => {
		setContent('Etes-vous sûr de vouloir supprimer ce congélateur?');
		setOpenModal(true);
	};

	const onEditClick = id => {
		navigate('../edit/' + id);
	};

	const deleteFreezer = id => {
		setLoading(true);
		freezerService
			.deleteFreezer(id)
			.then(navigate('../freezers'))
			.catch(err => console.error(err));
		setOpenModal(false);
		setLoading(false);
	};

	return (
		<>
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
						<div>
							<ProductTable freezerId={freezer.id} />
						</div>
						<div className='btn-container'>
							<button
								className='edit-btn'
								title='Modifier le congélateur'
								onClick={() => onEditClick(freezer.id)}
							>
								{<EditIcon />}
							</button>
							<button
								className='delete-btn'
								title='Supprimer le congélateur'
								onClick={() => onDeleteClick(freezer.id)}
							>
								{<DeleteIcon />}
							</button>
						</div>
					</>
				)}
			</main>
			<Modal
				openModal={openModal}
				setOpenModal={setOpenModal}
				action={() => deleteFreezer(freezer.id)}
				content={content}
			/>
		</>
	);
};

export default FreezerDetails;
