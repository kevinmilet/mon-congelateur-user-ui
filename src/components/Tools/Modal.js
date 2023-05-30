import React, { useState } from 'react';
import './modal.scss';
import Close from '../../assets/icons/close.png';

const Modal = () => {
	const [modal, setModal] = useState(false);

	const toggleModal = () => {
		setModal(!modal);
	};

	return (
		<>
			<button className='btn-modal' onClick={toggleModal}>
				Open
			</button>

			{modal && (
				<div className='overlay'>
					<div className='modal'>
						<div className='modal-title'>
							<h2>Hello Modale</h2>
						</div>
						<div className='modal-content'>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Adipisci obcaecati recusandae rerum dolor asperiores ullam nemo,
								magnam deleniti iusto laborum doloribus dignissimos nam labore
								perspiciatis fuga ipsa optio facilis magni.
							</p>
							<button className='close-modal' onClick={toggleModal}>
								<img src={Close} alt='Close Button' />
							</button>
						</div>
						<div className='modal-footer'>
							<button className='footer-btn' onClick={toggleModal}>
								Fermer
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
