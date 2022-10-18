import { useState } from "react";
import { Modal } from '../../context/Modal'
import LoginForm from '../auth/LoginForm'

function LoginFormModal({ showLoginModal, setShowLoginModal }) {

    return (
        <>
            {showLoginModal && (
                <Modal onClose={() => setShowLoginModal(false)}>
                    <LoginForm setShowLoginModal={setShowLoginModal} />
                </Modal>
            )}
        </>
    )
}

export default LoginFormModal;
