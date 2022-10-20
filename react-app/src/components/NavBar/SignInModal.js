import { Modal } from '../../context/Modal'
import LoginForm from '../auth/LoginForm'
import DemoUser from "./DemoUser";
import './SignInModal.css'

function LoginFormModal({ showLoginModal, setShowLoginModal }) {

    return (
        <>
            {showLoginModal && (
                <Modal onClose={() => setShowLoginModal(false)}>
                    <LoginForm setShowLoginModal={setShowLoginModal}/>
                    <div className="or-div">
                        <p className="or-line-break">Or</p>
                    </div>
                    <DemoUser setShowLoginModal={setShowLoginModal}/>
                </Modal>
            )}
        </>
    )
}

export default LoginFormModal;
