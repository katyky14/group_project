import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";


import { authenticate } from "../../store/session";
import { editProductThunk, getAProduct } from "../../store/product";

import './editProduct.css'

function EditProductForm({ setShowMModal, id }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { productId } = useParams();
    // console.log("PRODUCT ID *****************",productId)
    const productData = useSelector(state => state.productState[productId])


    // const previewImg = productData?.images[0]?.image_url;
    // const additionalImg = productData?.images
    //  console.log('productData', productData)
    //  console.log(productData.id)
    //  console.log('the id in edit for product', productData)
    // console.log('preview image', additionalImg)  ownerObj.productsImages[productId ].image_url || ""


    const ownerObj = useSelector(state => state.session.user)
    const ownerProduct = ownerObj.products.find(product => product.id === Number(productId))
    const ownerImages = ownerObj.productsImages.find(image => image.productId === Number(productId) && image.mainImage === true)

    // console.log('the ownerImages', ownerImages)


    // console.log('the owner obj', ownerObj)

    // console.log('the owner product', ownerProduct)
    // console.log('the owner', ownerObj.productsImages[productId])
    // console.log('the owner obj in edit product', ownerProduct)
    const nonMainImageArr = ownerObj.productsImages.filter(image => image.mainImage !== true)
    const arrayUrls = nonMainImageArr.map(image => image.image_url)

    const [name, setName] = useState(ownerProduct.name || "");
    const [price, setPrice] = useState(ownerProduct.price || 0);
    const [description, setDescription] = useState(ownerProduct.description || "");
    const [previewImage, setPreviewImage] = useState(ownerImages.image_url || "");
    const [imageUrls, setImageUrls] = useState(arrayUrls);
    const [quantity, setQuantity] = useState(ownerProduct.quantity || 0);
    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [additionalUrls, setadditionalUrls] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)


    useEffect(() => {
        dispatch(getAProduct(+productId)).then(() => setIsLoaded(true))
        dispatch(authenticate())
    }, [dispatch, productId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (validationErrors.length) return alert("Cannot Submit Form")


        const productInformation = {
            id: productId,
            owner_id: ownerObj.id,
            name,
            price,
            description,
            image_url: previewImage,
            imageUrls,
            quantity,
        }


        let updatedProduct = await dispatch(editProductThunk(productInformation, ownerImages))
        if (updatedProduct) {
            history.push(`/products/${productId}`)
        }

    }


    useEffect(() => {
        const errors = []

        if (price < 0.20 || price > 50000) errors.push("Price must be between $0.20 and $50,000.00.")
        if (quantity < 1 || quantity > 999) errors.push("Quantity must be between 1 and 999.")
        // if (!imageUrl.match(/\.(jpg|jpeg|png)$/)) errors.push('Please provide a valid image extension [png/jpg/jpeg]')

        setValidationErrors(errors)

    }, [price, quantity, imageUrls])


    console.log('the image url in component', imageUrls)

    const addImageUrls = index => e => {
        e.preventDefault()
        // console.log('index: ' + index);
        // console.log('property name: ' + e.target.value);
        let newArr = [...imageUrls]; // copying the old datas array
        // a deep copy is not needed as we are overriding the whole object below, and not setting a property of it. this does not mutate the state.
        newArr[index] = e.target.value; // replace e.target.value with whatever you want to change it to

        setImageUrls(newArr);
    }

    // if (!productData) return null;

    return (
        <div className="edit-main-container-product-form">
            <div className="edit-new-listing-div">
                <h1 className="edit-h1-add-new-listing">Update Your Listing</h1>
            </div>
            <form className="edit-form-product" onSubmit={handleSubmit}>
                {/* {hasSubmitted && validationErrors.length > 0 && (
                    <ul>
                        {validationErrors.map((error, index) => <li key={index}>  {error}</li>)}
                    </ul>
                )} */}

                <div className="edit-first-block-product-form">

                    <div>

                        <h3 className="edit-h3-product-form">Photos</h3>

                        <p className="edit-subtitle-info-product">Add as many as you can so buyers can see every detail.</p>

                        <div className="edit-info-image-main-container">


                            <div className="edit-info-container">

                                <ul className="edit-ul-info-product">
                                    <li className="edit-info-1 edit-tips">Tips:</li>
                                    <li className="edit-info-1">Use natural light and no flash</li>
                                    <li className="edit-info-1">Include a common object for scale.</li>
                                    <li className="edit-info-1">Show the item being held, worn, or used</li>
                                </ul>
                            </div>

                            <div className="edit-img-input-container">

                                <input
                                    className="edit-product-img-preview edit-product-img"
                                    placeholder="Preview Image Url"
                                    type="text"
                                    value={previewImage}
                                    onChange={(e) => setPreviewImage(e.target.value)}
                                />

                                {
                                    imageUrls.length > 0 && imageUrls.map((data, i) => (
                                        <input
                                            className="edit-product-img-additionals edit-product-img"
                                            key={i}
                                            placeholder="Additional Image Url"
                                            type="text"
                                            value={data}
                                            onChange={addImageUrls(i)}
                                        />
                                    ))
                                }
                                {
                                    imageUrls.length < 7 &&
                                    <button className="edit-img-product-button" onClick={(e) => { e.preventDefault(); setImageUrls((preImageUrls) => [...preImageUrls, ""]) }}>
                                        <div className="edit-camera-icon-product">
                                            <span className="edit-icon-fa-camera"> <i class="fa-solid fa-camera"></i></span> Add additional images
                                        </div>
                                    </button>
                                }
                            </div>
                        </div>

                    </div>
                </div>



                <div className="edit-first-block-product-form">
                    <div>

                        <h3 className="edit-h3-product-form">Listing details</h3>
                        <p className="edit-subtitle-info-product">Tell the world all about your item and why they’ll love it.</p>

                        <div className="edit-listing-details-main">

                            <div className="edit-label-input-separator">

                                <div>

                                    <label className="edit-label-listing-product">Title</label>
                                </div>



                                <div>
                                    <input
                                        className="edit-input-details-product title-input"
                                        placeholder=""
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <p className="edit-listing-info1">Include keywords that buyers would see to search for your item</p>
                                </div>

                            </div>
                            <div className="edit-label-input-separator">
                                <div>

                                    <label className="edit-label-listing-product">Description</label>
                                </div>
                                <div>

                                    <textarea
                                        cols="30" rows="5"
                                        className="edit-input-details-product edit-description-input"
                                        placeholder=""
                                        type="textarea"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                    <div>
                                        <p className="edit-listing-info1">Start with a brief overview that describes your item's finest features'</p>
                                        <p className="edit-listing-info1">Not sure what else to say? Shoppers also like hearing about your process, and the story behind this item.</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>




                <div className="edit-first-block-product-form">


                    <div className="edit-listing-details-main">
                        <h3 className="edit-h3-product-form">Inventory and Pricing</h3>


                        <div>
                            <div>
                                <div className="edit-label-input-separator">

                                    <div>
                                        <label className="edit-price-listing-product">Price</label>
                                    </div>

                                    <div>
                                        <div className="edit-price-border-input">

                                            <input
                                                className="edit-input-price-product"
                                                placeholder="$0"
                                                type="number"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                required
                                            />
                                            {hasSubmitted && validationErrors.length > 0 && (<p className="error-product-form">{validationErrors[0]}</p>)}
                                        </div>
                                        <div>
                                            <p className="edit-listing-info1">Remember to factor in the costs of materials, labor, and other business expenses.</p>
                                        </div>
                                    </div>
                                </div>


                                <div className="edit-label-input-separator">

                                    <div>
                                        <label className="edit-price-listing-product" >Quantity</label>
                                    </div>

                                    <div>
                                        <div className="edit-price-border-input">

                                            <input
                                                className="edit-input-price-product edit-quanity"
                                                placeholder=""
                                                type="number"
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                                required
                                            />
                                            {hasSubmitted && validationErrors.length > 0 && (<p className="error-product-form">{validationErrors[1]}</p>)}
                                        </div>
                                        <div>
                                            <p className="edit-listing-info1">Let your customers know how many of these you made. </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="edit-button-container-product">

                    <button
                        className="edit-product-form-submit-button"
                        type="submit">Update Listing
                    </button>

                </div>

            </form>
        </div>
    )
}


export default EditProductForm;
