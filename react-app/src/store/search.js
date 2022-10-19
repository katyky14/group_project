const SEARCH_PRODUCTS = 'search/searchProducts'

const getSearchProducts = (payload) => {
    return {
        type: SEARCH_PRODUCTS,
        payload
    }
}
