import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { addProductThunk } from "../../store/product";

import './productForm.css'

function CreateProductForm() {
    const dispatch = useDispatch();
    const history = useHistory()

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [previewImage, setPreviewImage] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
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
            previewImage,
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




    const addImageUrls = index => e => {
        e.preventDefault()
        console.log('index: ' + index);
        console.log('property name: ' + e.target.value);
        let newArr = [...imageUrls]; // copying the old datas array
        // a deep copy is not needed as we are overriding the whole object below, and not setting a property of it. this does not mutate the state.
        newArr[index] = e.target.value; // replace e.target.value with whatever you want to change it to

        setImageUrls(newArr);
    }

    return (
        <div className="main-container-product-form">
            <div className="new-listing-div">
                <h1 className="h1-add-new-listing">Add a new Listing</h1>
            </div>
            <form className="form-product" onSubmit={handleSubmit}>
                {/* {hasSubmitted && validationErrors.length > 0 && (
                    <ul>

                        {validationErrors.map((error, index) => <li key={index}>  {error}</li>)}
                    </ul>
                )} */}

                <div className="first-block-product-form">

                    <div>

                        <h3 className="h3-product-form">Photos</h3>

                        <p className="subtitle-info-product">Add as many as you can so buyers can see every detail.</p>

                        <div className="info-image-main-container">


                            <div className="info-container">

                                <ul className="ul-info-product">
                                    <li className="info-1 tips">Tips:</li>
                                    <li className="info-1">Use natural light and no flash</li>
                                    <li className="info-1">Include a common object for scale.</li>
                                    <li className="info-1">Show the item being held, worn, or used</li>
                                </ul>
                            </div>

                            <div className="img-input-container">

                                <input
                                    className="product-img-preview product-img"
                                    placeholder="Preview Image Url"
                                    type="text"
                                    value={previewImage}
                                    onChange={(e) => setPreviewImage(e.target.value)}
                                />

                                {
                                    imageUrls.length > 0 && imageUrls.map((data, i) => (
                                        <input
                                            className="product-img-additionals product-img"
                                            key={i}
                                            placeholder="Additional Image Url"
                                            type="text"
                                            value={data}
                                            onChange={addImageUrls(i)}
                                        />
                                    ))
                                }
                                <button className="img-product-button" onClick={(e) => { e.preventDefault(); setImageUrls((preImageUrls) => [...preImageUrls, ""]) }}>
                                    <div className="camera-icon-product">
                                        <span className="icon-fa-camera"> <i class="fa-solid fa-camera"></i></span> Add additional images
                                    </div>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>



                <div className="first-block-product-form">
                    <div>

                        <h3 className="h3-product-form">Listing details</h3>
                        <p className="subtitle-info-product">Tell the world all about your item and why they’ll love it.</p>

                        <div className="listing-details-main">

                            <div className="label-input-separator">

                                <div>

                                    <label className="label-listing-product">Title</label>
                                </div>



                                <div>
                                    <input
                                        className="input-details-product title-input"
                                        placeholder=""
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <p className="listing-info1">Include keywords that buyers would see to search for your item</p>
                                </div>

                            </div>
                            <div className="label-input-separator">
                                <div>

                                    <label className="label-listing-product">Description</label>
                                </div>
                                <div>

                                    <textarea
                                        cols="30" rows="5"
                                        className="input-details-product description-input"
                                        placeholder=""
                                        type="textarea"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                    <div>
                                        <p className="listing-info1">Start with a brief overview that describes your item's finest features'</p>
                                        <p className="listing-info1">Not sure what else to say? Shoppers also like hearing about your process, and the story behind this item.</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>




                <div className="first-block-product-form">


                    <div className="listing-details-main">
                        <h3 className="h3-product-form">Inventory and Pricing</h3>


                        <div>
                            <div>
                                <div className="label-input-separator">

                                    <div>
                                        <label className="price-listing-product">Price</label>
                                    </div>

                                    <div>
                                        <div className="price-border-input">

                                            <input
                                                className="input-price-product"
                                                placeholder="$0"
                                                type="number"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                required
                                            />
                                            {hasSubmitted && validationErrors.length > 0 && ( <p className="error-product-form">{validationErrors[0]}</p>)}
                                        </div>
                                        <div>
                                            <p className="listing-info1">Remember to factor in the costs of materials, labor, and other business expenses.</p>
                                        </div>
                                    </div>
                                </div>


                                <div className="label-input-separator">

                                    <div>
                                        <label className="price-listing-product" >Quantity</label>
                                    </div>

                                    <div>
                                        <div className="price-border-input">

                                            <input
                                                className="input-price-product quanity"
                                                placeholder=""
                                                type="number"
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                                required
                                            />
                                            { hasSubmitted && validationErrors.length > 0 && ( <p className="error-product-form">{validationErrors[1]}</p>)}
                                        </div>
                                        <div>
                                            <p className="listing-info1">Let your customers know how many of these you made. </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="button-container-product">

                    <button
                        className="product-form-submit-button"
                        type="submit">Add Listing
                    </button>

                </div>

            </form>
        </div>
    )


}


export default CreateProductForm;
