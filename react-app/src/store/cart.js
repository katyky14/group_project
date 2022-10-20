//type
const GET_CART_ITEMS = "Cart/getCartItems"
const ADD_ONE_ITEM = "Cart/addOneCartItem"

const UPDATE_COUNT = 'cart/UPDATE_COUNT'
const REMOVE_ITEM = 'Cart/REMOVE_ITEM'


//action
const getAllCartItem = payload => {
    return {
        type: GET_CART_ITEMS,
        payload
    }
}


const addOneCartItem = payload => {
    return {
        type: ADD_ONE_ITEM,
        payload
    }
}

const updateCount = (payload) => {
    return {
        type: UPDATE_COUNT,
        payload
    }

}

const removeItem = payload => {
    return {
        type: REMOVE_ITEM,
        payload
    }
}


//thunk action

export const getCartItemThunk = () => async dispatch => {
    // console.log('1 hello in thunk GET ALL do you see me?')
    const response = await fetch('/api/cart/')
    // console.log('2 hello in thunk GET ALL do you see me?')
    if (response.ok) {
        const data = await response.json();
        // console.log('3 hello in thunk GET ALL do you see me?')
        // console.log('all cart items in thunk', data.shoppingCart)
        dispatch(getAllCartItem(data.shoppingCart));
    }
}


export const addCartItemThunk = (cartData, productId) => async dispatch => {
    const response = await fetch(`/api/cart/${productId}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "quantity": cartData.quantity
        })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addOneCartItem(data));
        return data;
    }
}


export const editProductThunk = (cartData, quantity) => async (dispatch) => {

    const response = await fetch(`/api/cart/${cartData}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "quantity": quantity
        }),
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(updateCount(data))
        return data
    }
}


export const removeItemThunk = (id) => async dispatch => {

    const response = await fetch(`/api/cart/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(removeItem(data.id))
    }
}


// reducer


const cartReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_CART_ITEMS:
            const allCartProduct = {};
            action.payload.forEach(item => {
                allCartProduct[item.id] = item
            })
            return allCartProduct



        case ADD_ONE_ITEM:
            const newItem = {};
            newItem[action.payload.shoppingCart.id] = action.payload.shoppingCart
            const newStateForm = { ...state, ...newItem };
            return newStateForm



        case UPDATE_COUNT:
            const newState = { ...state }
            newState[action.payload.shoppingCart[0].id] = action.payload.shoppingCart[0]
            return newState

        case REMOVE_ITEM:
            const newStateDelete = { ...state }
            delete newStateDelete[action.payload];
            return newStateDelete;

        default:
            return state



    }
}

export default cartReducer
