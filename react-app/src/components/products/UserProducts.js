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
<<<<<<< HEAD
    const product = useSelector(state=>state.productState)

const logout = async (id)=>{
    await dispatch(deleteProductThunk(id))
      await dispatch(getAllProductsThunk())
    //   return history.push(`/products/owner`)
}
=======
    const product = useSelector(state => state.productState)

    // console.log('the owner in user products', owner)
    useEffect(() => {
        dispatch(getAllProductsThunk())
        dispatch(authenticate())
    }, [dispatch])

    const logout = async(id) => {
        await dispatch(deleteProductThunk(id))
        await dispatch(getAllProductsThunk())
        await dispatch(authenticate())
    }

    if(!owner) return null
>>>>>>> product-bug
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
                                        src={ownerImages.find(image => image.productId === id).image_url} alt="img"></img>
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
<<<<<<< HEAD
                                        <button className="one-button-user del-button-user" onClick={()=> logout(id)
                                         
                                        }>Delete</button>
=======
                                            {/* <button className="one-button-user" onClick={() => history.push(`/products/${id}/edit`)}><EditProductFormModal id={id}/></button> */}
                                        <button className="one-button-user del-button-user" onClick={() => logout(id)}>Delete</button>
>>>>>>> product-bug
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
