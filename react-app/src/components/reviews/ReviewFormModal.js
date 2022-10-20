import React, { useState } from 'react';
import { Modal } from '../../context/Modal'
import AddReview from './Review-Form';
import './ReviewForm.css'

function AddReviewModal({ productId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="Add-Review" onClick={() => setShowModal(true)}>Add Review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddReview setShowModal={setShowModal} productId={productId} />
                </Modal>
            )}
        </>
    );
}

export default AddReviewModal;
