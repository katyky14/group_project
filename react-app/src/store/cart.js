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
    const response = await fetch('/api/cart/')

    if (response.ok) {
        const data = await response.json();
        console.log('all cart items in thunk', data.shoppingCart)
        dispatch(getAllCartItem(data.shoppingCart));
    }
}


export const addCartItemThunk = (cartData, productId) => async dispatch => {
    // console.log('the cart', cartData)
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
        console.log('the data in cart thunk', data)
        return data;
    }
}


export const editProductThunk = (cartData, quantity) => async (dispatch) => {
    console.log('in thunk cartData',(cartData))
    console.log('thunk quantity ',(quantity))
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
        return { ...data }
    }
}


export const removeItemThunk = (id) => async dispatch => {
    const response = await fetch(`/api/cart/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
        const data = await response.json();
        console.log('the data in thunk', data)
        dispatch(removeItem(id))
    }
}


// reducer


const cartReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_CART_ITEMS:
            const allCartProduct = {};
            // allCartProduct[action.payload.id] = action.payload
            action.payload.forEach(item => {
                allCartProduct[item.id] = item
            })

            return allCartProduct



        case ADD_ONE_ITEM:
            const newItem = {};
            newItem[action.payload.id] = action.payload
            const newStateForm = { ...state, ...newItem };
            // console.log('in the reducer', newStateForm)
            return newStateForm



        case UPDATE_COUNT:
            const newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState

        case REMOVE_ITEM:
            const newStateDelete = { ...state }
            // console.log('in the reducer',action.payload)
            delete newStateDelete[action.payload];
            return newStateDelete;

        default:
            return state



    }
}

export default cartReducer
