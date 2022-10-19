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
    console.log('1 hello in thunk do you see me?')
    console.log('the cart', cartData)
    const response = await fetch(`/api/cart/${productId}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "quantity": cartData.quantity
        })
    });
    console.log('2  hello in thunk do you see me?')
    if (response.ok) {
        const data = await response.json();
        dispatch(addOneCartItem(data));
        console.log('3 hello in thunk do you see me?')
        console.log('the data in cart thunk', data)
        return data;
    }
}


export const editProductThunk = (cartData, quantity) => async (dispatch) => {
    // console.log('in thunk cartData',(cartData))
    // console.log('thunk quantity ',(quantity))
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

    // console.log('in front', id)
    const response = await fetch(`/api/cart/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    });
    console.log('2 hello in thunk do you see me?')
    if (response.ok) {
        const data = await response.json();
        // console.log('3 hello in thunk do you see me?')
        // console.log('the data in thunk', data)
        dispatch(removeItem(data.id))
    }
}


// reducer


const cartReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_CART_ITEMS:
            const allCartProduct = {};
            // console.log('get all cart action payload', action.payload)
            // allCartProduct[action.payload.id] = action.payload
            action.payload.forEach(item => {
                // console.log('inside for each', item.id)
                allCartProduct[item.id] = item
            })
            //console.log('the allCartProduct in get all cart items reducer', allCartProduct)
            return allCartProduct



        case ADD_ONE_ITEM:
            const newItem = {};
            console.log('action payload in reducer', action.payload)
            newItem[action.payload.shoppingCart.id] = action.payload.shoppingCart
            console.log('the new item in add one item', newItem)
            const newStateForm = { ...state, ...newItem };
            console.log('in the reducer new state', newStateForm)
            return newStateForm



        case UPDATE_COUNT:
            const newState = {...state}
            // console.log('update in reducer', action.payload.shoppingCart)
            // console.log('the new state before', newState)
            newState[action.payload.shoppingCart[0].id] = action.payload.shoppingCart[0]

            // console.log('the new state', newState)
            return newState

        case REMOVE_ITEM:
            const newStateDelete = {...state}
            console.log('4 hello in thunk do you see me?')
            console.log('the state before delete', newStateDelete)
            console.log('in the reducer',action.payload)
            delete newStateDelete[action.payload];
            console.log('the delete state', newStateDelete)
            return newStateDelete;

        default:
            return state



    }
}

export default cartReducer
