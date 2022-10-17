import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { addProductThunk } from "../../store/product";

function CreateProductForm() {
    const dispatch = useDispatch();
    const history = useHistory()

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [mainImage, setMainImage] = useState(true);
    const [imageUrl, setImageUrl] = useState("")
    const [quantity, setQuantity] = useState(1);
    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const ownerObj = useSelector(state => state.session.user)


    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (validationErrors.length) return alert("Cannot Submit Form")

        const productInformation = {
            owner_id: ownerObj.id,
            name,
            price,
            description,
            mainImage,
            imageUrl,
            quantity
        }

        let createdProduct = await dispatch(addProductThunk(productInformation))
        console.log('the product', createdProduct)

        if (createdProduct) {
            history.push(`/products/${createdProduct.product.id}`)
        }


        // setValidationErrors([]);

        // return dispatch(addProductThunk(productInformation)).catch(
        //     async (res) => {
        //         console.log(" do you see me?")
        //         const data = await res.json();
        //         console.log('the data', data)
        //         if (data && data.errors) {
        //             setValidationErrors([data.errors[0].message])
        //             console.log('the errors')
        //         }
        //     }
        // )

    }


    useEffect(() => {
        const errors = []

        if (price < 0.20 || price > 50000) errors.push("Price must be between $0.20 and $50,000.00.")
        if (quantity < 1 || quantity > 999) errors.push("Quantity must be between 1 and 999.")
        if (!imageUrl.match(/\.(jpg|jpeg|png)$/)) errors.push('Please provide a valid image extension [png/jpg/jpeg]')

        setValidationErrors(errors)

    }, [price, quantity, imageUrl])


    return (
        <div>
            <h1>Add Listing</h1>
            <form onSubmit={handleSubmit}>
                {hasSubmitted && validationErrors.length > 0 && (
                    <ul>
                        {validationErrors.map((error, index) => <li key={index}>{error}</li>)}
                    </ul>
                )}

                <input
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    placeholder="Price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />

                <input
                    placeholder="Description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <div >
                    <p>Main Image</p>
                    <label>
                        <input
                        type="radio"
                        name='true'
                        value='true'
                        checked={mainImage === true}
                        onChange={e  => setMainImage(e.target.value)}
                        />
                       true
                    </label>
                </div>
                <div>
                    <label>
                        <input type="radio"
                        id='false'
                        name='false'
                        value='false'
                        checked={mainImage === false }
                        onChange={e  => setMainImage(e.target.value)}/>
                        false
                    </label>
                </div>
                <input
                    placeholder="Image"
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                />

                <input
                    placeholder="Quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
                <button>Add Listing</button>
            </form>
        </div>
    )


}


export default CreateProductForm;
