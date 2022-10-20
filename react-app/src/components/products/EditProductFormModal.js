import { useState } from "react"

import EditProductForm from "./EditProductForm"
import {Modal} from '../../context/Modal'

function EditProductFormModal({id}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit Product</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditProductForm id={id} />
                </Modal>

            )}
        </>
    )
}

export default EditProductFormModal;
