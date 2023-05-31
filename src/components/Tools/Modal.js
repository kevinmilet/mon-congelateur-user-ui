import React, { useState } from 'react';
import './modal.scss';
import Close from '../../assets/icons/close.png';

const Modal = ({ openModal, setOpenModal, content, action }) => {
	const toggleModal = () => {
		setOpenModal(false);
	};

	return (
		<>
			{/* <button className='btn-modal' onClick={toggleModal}>
				Open
			</button> */}

			{openModal && (
				<div className='overlay'>
					<div className='modal'>
						<div className='modal-content'>
							<p>{content}</p>
							<button className='close-modal' onClick={toggleModal}>
								<img src={Close} alt='Close Button' />
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
