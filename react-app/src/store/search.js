const SEARCH_PRODUCTS = 'search/searchProducts'

const getSearchProducts = (payload) => {
    return {
        type: SEARCH_PRODUCTS,
        payload
    }
}

export const getSearchProductsThunk = (query) => async dispatch => {
    const responce = await fetch('/api/search');
    if (responce.ok) {
        const data = await responce.json();
        dispatch(getSearchProducts(data))
        return data
    }
}

const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case SEARCH_PRODUCTS:
            const searchedProducts = {}
            action.payload.forEach(product => {
                searchedProducts[product.id] = product
            });
            return searchedProducts
    }
}

export default searchReducer;
