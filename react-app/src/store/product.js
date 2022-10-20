

// TYPES
const GET_PRODUCTS = "Products/getProducts"
const Get_PRODUCT_BY_ID = "Products/getProductByID"
const ADD_PRODUCTS = "products/addProducts"
const EDIT_PRODUCT = "product/editProduct"
const DELETE_PRODUCT = "product/deleteProduct"

// ACTIONS
const getAllProducts = payload => {
    return {
        type: GET_PRODUCTS,
        payload
    }
}

const getThisProduct = payload => {
    return {
        type: Get_PRODUCT_BY_ID,
        payload
    }
}

const addOneProduct = payload => {
    return {
        type: ADD_PRODUCTS,
        payload
    }
}

const editProduct = payload => {
    return {
        type: EDIT_PRODUCT,
        payload
    }
}

const deleteProduct = (id) => {
    return {
        type: DELETE_PRODUCT,
        id
    }
}


// THUNK ACTION CREATOR
// GET ALL PRODUCTS THUNK
export const getAllProductsThunk = () => async dispatch => {
    const response = await fetch('/api/products/')
    if (response.ok) {
        const data = await response.json()
        dispatch(getAllProducts(data.products))
    }
}

// GET A PRODUCT'S DETAILS THUNK
export const getAProduct = (id) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getThisProduct(data.oneProduct))
        return { ...data };
    }
};

// ADD A PRODUCT THUNK
export const addProductThunk = (productData) => async (dispatch) => {

    const response = await fetch('/api/products', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
    });

    if (response.ok) {
        const data = await response.json();
        // FETCH TO BACKEND TO ADD A PRODUCT IMAGE TO IMAGE TABLE IN DB
        const imageResponse = await fetch(`/api/products/${data.product.id}/images`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "image_url": productData.previewImage,
                "main_image": true
            })
        })
        for (let i = 0; i < productData.imageUrls.length; i++) {
            let additionalImage = await fetch(`/api/products/${data.product.id}/images`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "image_url": productData.imageUrls[i],
                    "main_image": false
                })
            })
        }
        const imageData = await imageResponse.json();


        dispatch(addOneProduct(data));
        return data;
    }

    // return response.json()
}

export const editProductThunk = (productData) => async (dispatch) => {

    const response = await fetch(`/api/products/${productData.id}`, {

        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            productData
        }),
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(editProduct(data))
        // return { ...data }
        return data
    }
}

// DELETE PRODUCT THUNK
export const deleteProductThunk = (productId) => async dispatch => {

    const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(deleteProduct(data.id));
        return { ...data }
    };
}



// REDUCER
const productReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_PRODUCTS: {
            const allProducts = {}
            action.payload.forEach(product => {
                allProducts[product.id] = product
            })
            const newState = { ...state, allProducts }
            return allProducts
        }
        case Get_PRODUCT_BY_ID: {
            const newState = {};
            newState[action.payload.id] = action.payload
            return newState;
        }

        case ADD_PRODUCTS: {
            const newProduct = {};
            newProduct[action.payload.id] = action.payload
            const newStateForm = { ...state, ...newProduct };
            return newStateForm;
        }
        case EDIT_PRODUCT: {
            const newState = { ...state };
            newState[action.payload.id] = action.payload
            return newState;
        }
        case DELETE_PRODUCT: {
            const newState = { ...state }
            delete newState[action.id];
            return newState;
        }
        default:
            return state
    }
}

export default productReducer
