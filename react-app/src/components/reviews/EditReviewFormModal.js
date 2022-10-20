import React, { useState } from 'react';
import { Modal } from '../../context/Modal'
import EditReviewForm from './Edit-Review-Form';
import './ReviewForm.css'

function EditReviewFormModal({ productId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="Add-Review" onClick={() => setShowModal(true)}>Edit Review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditReviewForm setShowModal={setShowModal} productId={productId} />
                </Modal>
            )}
        </>
    );
}

export default EditReviewFormModal;
