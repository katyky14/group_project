// TYPES
const GET_PRODUCTS = "Products/getProducts"

// ACTIONS
const getAllProducts = payload => {
    return {
        type: GET_PRODUCTS,
        payload
    }
}

// THUNK ACTION CREATOR
export const getAllProductsThunk = () => async dispatch => {
    const response = await fetch('/api/products')
    if (response.ok) {
        const data = await response.json()
        dispatch(getAllProducts(data.products))
    }
}


// REDUCER
const productReducer = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
        case GET_PRODUCTS:
            const allProducts = {}
            action.payload.forEach(product => {
                allProducts[product.id] = product
            })
            newState = { ...state, allProducts }
            return allProducts
        default:
            return state
    }
}

export default productReducer
