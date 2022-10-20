const SEARCH_PRODUCTS = 'search/searchProducts'

const getSearchProducts = (payload) => {
    return {
        type: SEARCH_PRODUCTS,
        payload
    }
}

export const getSearchProductsThunk = (search) => async dispatch => {
    console.log("in thunk query:" , search)
    const responce = await fetch('/api/search/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search })
    });
    console.log("thunk responce: ", responce)
    if (responce.ok) {
        const data = await responce.json();
        console.log("thunk data: ", data);
        console.log("thunk data.products: ", data.products);
        dispatch(getSearchProducts(data.products))
        return data
    }
}

const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case SEARCH_PRODUCTS:
            // const searchedProducts = {}
            // action.payload.forEach(product => {
            //     searchedProducts[product.id] = product
            // });
            let searchedProductArr = action.payload
            return searchedProductArr
        default:
            return state
    }
}

export default searchReducer;
