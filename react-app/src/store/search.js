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
    }
}
