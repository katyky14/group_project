import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCartItemThunk, removeItemThunk, editProductThunk } from "../../store/cart";
import { getAllProductsThunk, getAProduct } from "../../store/product";


const GetCartItems = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const cartObj = useSelector(state => state.cartState)
    // const user = useSelector(state => state.session.user)
    const cartArr = Object.values(cartObj);
    // console.log('component for obj', cartObj)
    // console.log('in the component for all cart items', cartArr)
    const products = useSelector(state => state.productState)
    const productArr = Object.values(products)



    useEffect(() => {
        dispatch(getCartItemThunk())
        dispatch(getAllProductsThunk())
    }, [dispatch])

    return (
        <div>
            <div>
                {cartArr.map(item => (

                    <div key={item.id}>
                        {console.log('item id', item.productId)}
                        <div>Product ID {item.productId} </div>
                        <div>Item Id {item.id} </div>
                        <div> {item.quantity}</div>
                    {/* <input
                    type="number"
                    value={item.productId}
                    onChange={(e) => setCount(e.target.value)}
                    onBlur={() => dispatch(editProductThunk(item.productId, item.quantity++))}
                  /> */}
                  <button
                    disabled={item.quantity === productArr.find(product => product.id === item.productId)?.quantity}
                    onClick={() => dispatch(editProductThunk(item.productId, item.quantity++))}>
                    +
                  </button>
                  <button
                  disabled={item.quantity === 0}
                    onClick={() => dispatch(editProductThunk(item.productId, item.quantity-=1))}
                  > -
                  </button>
                  <button
                    onClick={() =>
                     { dispatch(removeItemThunk(item.productId))
                        // history.push(`/shopping-carts`)
                    }}>
                    Remove
                  </button>
                  </div>
                ))}
            </div>
        </div>
  )


}


export default GetCartItems
