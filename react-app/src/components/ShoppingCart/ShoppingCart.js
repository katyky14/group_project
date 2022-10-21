import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCartItemThunk, removeItemThunk, editProductThunk } from "../../store/cart";
import { getAllProductsThunk } from "../../store/product";
import './ShoppingCart.css'


const GetCartItems = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const cartObj = useSelector(state => state.cartState)
  // const user = useSelector(state => state.session.user)
  const cartArr = Object.values(cartObj);
  //console.log('component for obj', cartObj)
  // console.log('in the component for all cart items', cartArr)
  const products = useSelector(state => state.productState)
  const productArr = Object.values(products)

  const [isLoaded, setIsLoaded] = useState(false)


  useEffect(() => {
    dispatch(getCartItemThunk()).then(() => setIsLoaded(true))
    dispatch(getAllProductsThunk()).then(() => setIsLoaded(true))
  }, [dispatch])


  const FALLBACK_IMAGE = "https://demofree.sirv.com/nope-not-here.jpg";
  const imageOnLoadHandler = (event) => {
    // console.log(
    //   `The image with url of ${event.currentTarget.src} has been loaded`
    // );
    if (event.currentTarget.className !== "error-cart") {
      event.currentTarget.className = "cartItemImage";
    }
  };

  const imageOnErrorHandler = (event) => {
    event.currentTarget.src = FALLBACK_IMAGE;
    event.currentTarget.className = "error-cart";
  };

  const options = (max, amountCarted) => {
    let optionsArr = []
    for (let i = 1; i <= max; i++) {
      if (i !== amountCarted) {
        optionsArr.push(<option value={i}>{i}</option>)
      }
      else if (i === amountCarted) {
        optionsArr.push(<option value={i} selected={true}>{i}</option>)
      }

    }
    return optionsArr
  }

  const selectQuantity = async (productId, itemQuantity) => {
    await dispatch(editProductThunk(productId, itemQuantity))
  }

  return isLoaded && (
    <div id="shoppingCartPage">
      <div>
        <div>
          {!!cartArr.length && (
            <h2 id="shoppingCarth2">{cartArr.length} {cartArr.length === 1 ? "item" : "items"} in your cart</h2>
          )}
        </div>
        <div id="protection">
          <span id="protect-Bold">Buy ktsy Purchase Protection:</span> &nbsp; Shop confidently on Buy ktsy knowing if something goes wrong with an order, we've got your back.
        </div>
        <div id="emptyCart">
          {!cartArr.length && (
            <h2 id="shoppingCarth2">Your cart is empty</h2>
          )}
        </div>
        {cartArr.map(item => (
          <div className="cartItemsContainer" key={item.id}>
            {productArr.filter(product => product.id === item.productId)?.map(product =>
              <div key={product.id} className="cartItemDescriptions">
                <img
                  onLoad={imageOnLoadHandler}
                  onError={imageOnErrorHandler}
                  className="cartItemImage" src={product.images[0]?.image_url} onClick={() => history.push(`/products/${product.id}`)} />
                <div id="itemNameContainer">
                  <div id="item-texts" onClick={() => history.push(`/products/${product.id}`)}>
                    {product.name}<br /><br />
                    {product.description}<br /><br /><br /><br />
                  </div>
                  <p id="remove"
                    onClick={async () =>
                      await dispatch(removeItemThunk(item.productId))
                    }>
                    Remove
                  </p>
                </div>
                <div>
                  <div>
                    <select
                      id="quantitySelect"
                      onChange={(e) => selectQuantity(product.id, +e.target.value)}
                    >
                      {options(product.quantity, item.quantity)}
                    </select>
                  </div>
                  {/* <div><br />
                    <button
                      disabled={item.quantity === productArr.find(product => product.id === item.productId)?.quantity}
                      onClick={async () => await dispatch(editProductThunk(item.productId, item.quantity + 1))}>
                      +
                    </button>
                    <button
                      disabled={item.quantity === 0}
                      onClick={async () => await dispatch(editProductThunk(item?.productId, item.quantity - 1))}
                    > -
                    </button>
                  </div> */}
                </div>
                <div id="priceContainer">
                  <div id="cartItemPrice">
                    ${item.quantity === 1 ? product.price.toFixed(2) : (product.price * item.quantity).toFixed(2)}
                  </div>
                  <div id="priceEach">
                    (${product.price.toFixed(2)} each)
                  </div>
                </div>
              </div>
            )}
            <hr></hr>
          </div>
        ))}
      </div>
    </div>
  )


}


export default GetCartItems
