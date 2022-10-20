import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addCartItemThunk, editProductThunk, getCartItemThunk } from "../../store/cart";


const CartForm = ({ productId }) => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const history = useHistory()


    const user = useSelector(state => state.session.user)
    const cartObj = useSelector(state => state.cartState)
    const cartArr = Object.values(cartObj);
    const idProduct = cartArr.find(item => item.productId === +productId)
    // const quantityValue = cartArr.find(item => item.quantity)
    // console.log('idProduct', idProduct)
    // console.log('the quantity in cart form', quantityValue)

    // if (!cartArr || !cartArr.length) return (
    //     <div> No items in the cart. Select items to purchase</div>
    // )

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newQuantity = idProduct?.quantity + 1

        const cartInformation = {
            userId: user.id,
            productId,
            quantity
        }

        await dispatch(getCartItemThunk())
        if (idProduct) dispatch(editProductThunk(cartInformation['productId'], newQuantity));
        else dispatch(addCartItemThunk(cartInformation, productId));

        return history.push(`/shopping-carts`)
        // history.push('/shopping-carts')

    }

    //    console.log('the product Id', idProduct.quantity)

    useEffect(() => {
        dispatch(getCartItemThunk())
    }, [dispatch])




    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button className="AddToCartButton" type="submit" >Add to cart</button>
            </form>
        </div>
    )
}


export default CartForm
