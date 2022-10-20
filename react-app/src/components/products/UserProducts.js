import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { deleteProductThunk, getAllProductsThunk } from "../../store/product";

import './userProducts.css'
import EditProductFormModal from './EditProductFormModal'

const StyledNavLink3 = (props) => {
    return <NavLink {...props} className={`${props.className} my-navlink-style3`} />
}

function UserProducts() {
    const dispatch = useDispatch()
    const history = useHistory()
    const owner = useSelector(state => state.session.user.products)
    const ownerImages = useSelector(state => state.session.user.productsImages)
    console.log('owner', owner)
    console.log('images', ownerImages)

    return (
        <>
            <div className="user-listing-main">
                <div className="h1-your-listing">
                    <h1> Manage Your Listings</h1>
                </div>

                <div className="user-listings">
                    {owner.map(({ id, name, price, quantity }) => (
                        <div key={id}>
                            <div className="listing-container" >
                                <div>Product Id: {id} </div>
                                <img
                                    className="listing-img"
                                    src={ownerImages[id]?.image_url.length ? ownerImages[id]?.image_url : "https://cdn.pixabay.com/photo/2016/11/29/03/07/crown-1866986_960_720.jpg"} alt="img"></img>

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
                                            className="one-button-user"
                                            to={`/products/${id}/edit`}> Edit Listing</StyledNavLink3></button>
                                        <button className="one-button-user del-button-user" onClick={() => dispatch(deleteProductThunk(id))}>Delete</button>
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
