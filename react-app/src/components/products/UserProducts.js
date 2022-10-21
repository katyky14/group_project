import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { deleteProductThunk, getAllProductsThunk } from "../../store/product";

import './userProducts.css'
import EditProductFormModal from './EditProductFormModal'

import { authenticate } from "../../store/session";

const StyledNavLink3 = (props) => {
    return <NavLink {...props} className={`${props.className} my-navlink-style3`} />
}

function UserProducts() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session)
    const owner = useSelector(state => state.session.user?.products)
    const ownerImages = useSelector(state => state.session.user.productsImages)
    const product = useSelector(state => state.productState)
    owner.map(({ id, name, price, quantity, ownerId }) => {
        console.log('MAPPING')
        console.log(id)
        console.log(ownerImages.find(image => image.productId === id && image.mainImage === true).image_url)
    })
    console.log(ownerImages)

    // console.log('the owner in user products', owner)
    useEffect(() => {
        dispatch(getAllProductsThunk())
        dispatch(authenticate())
    }, [dispatch])

    const FALLBACK_IMAGE = "https://demofree.sirv.com/nope-not-here.jpg";
    // const imageOnLoadHandler = (event) => {
    //     // console.log(
    //     //     `The image with url of ${event.currentTarget.src} has been loaded`
    //     // );
    //     if (event.currentTarget.className !== "error") {
    //         event.currentTarget.className = "success";
    //     }
    // };


    const imageOnErrorHandler = (event) => {
        event.currentTarget.src = FALLBACK_IMAGE;
        event.currentTarget.className = "error";
    };

    const deleteProduct = async(id) => {
        await dispatch(deleteProductThunk(id))
        await dispatch(getAllProductsThunk())
        await dispatch(authenticate())
    }

    const isEmptyObject = (obj) => {
        return JSON.stringify(obj) === '{}';
    }

    if (!owner || isEmptyObject(owner)) return null
    return (
        <>
            <div className="user-listing-main">
                <div className="h1-your-listing">
                    <h1> Manage Your Listings</h1>
                </div>

                <div className="user-listings">
                    {owner.map(({ id, name, price, quantity, ownerId }) => (
                        <div key={id}>
                            <div className="listing-container" >
                                {/* <div>Product Id: {id} </div>
                                <div> Owner id: {ownerId}</div> */}
                                {

                                    < img
                                        className="listing-img"
                                        // onLoad={imageOnLoadHandler}
                                        onError={imageOnErrorHandler}
                                        src={ownerImages.find(image => image.productId === id && image.mainImage === true)?.image_url} alt="img"></img>
                                }

                                <div className="listing-info-and-buttons">
                                    <div>
                                        <div className="title-info">{name}</div>

                                        <div className="span-user-main-div">
                                            <span>{quantity} in stock </span>
                                            <span className="span-separator-user">|</span>
                                            <span className="price-span-user">Price: ${price} </span>
                                        </div>
                                    </div>

                                    <div className="button-user-listing-main">
                                        <button className="one-button-user" onClick={() => history.push(`/products/${id}/edit`)}><StyledNavLink3
                                            to={`/products/${id}/edit`}> Edit Listing</StyledNavLink3></button>
                                        {/* <button className="one-button-user" onClick={() => history.push(`/products/${id}/edit`)}><EditProductFormModal id={id}/></button> */}
                                        <button className="one-button-user del-button-user" onClick={() => deleteProduct(id)}>Delete</button>
                                    </div>
                                </div>
                                {/* {
                                <EditProductFormModal id={id}/>
                            } */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}


export default UserProducts;
