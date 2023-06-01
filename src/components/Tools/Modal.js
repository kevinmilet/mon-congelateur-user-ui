import React from 'react';
import './modal.scss';
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ openModal, setOpenModal, content, action }) => {
	const toggleModal = () => {
		setOpenModal(false);
	};

	return (
		<>
			{openModal && (
				<div className='overlay'>
					<div className='modal'>
						<div className='modal-content'>
							<p>{content}</p>
							<button className='close-modal' onClick={toggleModal}>
								<CloseIcon />
							</button>
						</div>
						<div className='modal-footer'>
							<button className='btn-cancel' onClick={toggleModal}>
								Annuler
							</button>
							<button className='btn-confirm' onClick={action}>
								Confirmer
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
