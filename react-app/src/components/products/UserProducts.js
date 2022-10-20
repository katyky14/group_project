import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { deleteProductThunk, getAllProductsThunk } from "../../store/product";

import './userProducts.css'
import EditProductFormModal from './EditProductFormModal'

function UserProducts() {
    const dispatch = useDispatch()
    const history = useHistory()
    const owner = useSelector(state => state.session.user.products)
    const ownerImages = useSelector(state => state.session.user.productsImages)
    console.log('owner', owner)
    console.log('images', ownerImages)

    return (
        <div className="user-listing-main">

            <h1 className="h1-your-listing"> Manage Your Listings</h1>
            <div className="user-listing-container">

                <div className="user-listings">
                    {owner.map(({ id, description, name, price, quantity }) => (
                        <div key={id}>
                            <div>Product Id: {id} </div>
                            <img
                                className="listing-img"
                                src={ownerImages[id]?.image_url} alt="img"></img>

                            <div>Product Name: {name}</div>

                            <div>
                                <div>Product Price: ${price} </div>
                                <div>Product Quantity: {quantity} </div>
                            </div>

                            <button className="one-button" onClick={() => history.push(`/products/${id}/edit`)}><NavLink activeClassName='active'
                                style={{ textDecoration: 'none' }}
                                to={`/products/${id}/edit`}> Edit Listing</NavLink></button>
                            <button onClick={() => dispatch(deleteProductThunk(id))}>Delete</button>
                            {/* {
                                <EditProductFormModal id={id}/>
                            } */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}


export default UserProducts;
