const SEARCH_PRODUCTS = 'search/searchProducts'

const getSearchProducts = (payload) => {
    return {
        type: SEARCH_PRODUCTS,
        payload
    }
}

export const getSearchProductsThunk = (search) => async dispatch => {
    const responce = await fetch('/api/search/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search })
    });
    if (responce.ok) {
        const data = await responce.json();
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
