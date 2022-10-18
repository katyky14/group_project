import { useState } from "react";
import { Modal } from '../../context/Modal'
import SignUpForm from "../auth/SignUpForm";

function SignUpFormModal({ showSignUpModal, setShowSignUpModal }) {

    return (
        <>
            {showSignUpModal && (
                <Modal onClose={() => setShowSignUpModal(false)}>
                    <SignUpForm setShowSignUpModal={setShowSignUpModal} />
                </Modal>
            )}
        </>
    )
}

export default SignUpFormModal;
