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
    const [imageUrls, setImageUrls] = useState([])
    const [quantity, setQuantity] = useState(1);
    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [preview, setPreview] = useState(false);
    const [counter, setCount] = useState(0)

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
            imageUrls,
            quantity,
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
        // if (!imageUrl.match(/\.(jpg|jpeg|png)$/)) errors.push('Please provide a valid image extension [png/jpg/jpeg]')

        setValidationErrors(errors)

    }, [price, quantity, imageUrls])

    const updatePreview = (e) => setPreview(!preview);

    let counterArr = []
    for (let i = 1; i <= counter; i++) {
        counterArr.push(i)
    }

    const addImageUrls = index => e => {
        console.log('index: ' + index);
        console.log('property name: ' + e.target.name);
        let newArr = [...imageUrls]; // copying the old datas array
        // a deep copy is not needed as we are overriding the whole object below, and not setting a property of it. this does not mutate the state.
        newArr[index] = e.target.value; // replace e.target.value with whatever you want to change it to

        setImageUrls(newArr);
    }

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

                <input
                    placeholder="Preview Image Url"
                    type="text"
                    value={imageUrls}
                    onChange={addImageUrls(0)}
                />

                {
                    !!counter && counterArr.map(i => (
                        <input
                            placeholder="Additional Image Url"
                            type="text"
                            value={imageUrls}
                            onChange={addImageUrls(i)}
                        />
                    ))
                }
                <button onClick={() => setCount((preCounter) => preCounter + 1)}>Push for additional image</button>

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
