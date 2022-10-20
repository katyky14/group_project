import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductThunk, getAllProductsThunk } from "../../store/product";
import UpdatedProductForm from "./EditProductForm";


function UserProducts() {
    const dispatch = useDispatch()
    const owner = useSelector(state => state.session.user.products)

    return (
        <div>
            <h1> Current user listings</h1>
            {owner.map(({id, description, name}) => (
                <div key={id}>
                    <div>{description} </div>

                <button><UpdatedProductForm/></button>
                <button onClick={() => dispatch(deleteProductThunk(id))}>Delete</button>

                </div>

            ))}


        </div>
    )

}


export default UserProducts;
