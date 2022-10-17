

// TYPES
const GET_PRODUCTS = "Products/getProducts"
const ADD_PRODUCTS = "products/addProducts"

// ACTIONS
const getAllProducts = payload => {
    return {
        type: GET_PRODUCTS,
        payload
    }
}

const addOneProduct = payload => {
    return {
        type: ADD_PRODUCTS,
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


export const addProductThunk = (productData) => async (dispatch) => {

    const response = await fetch('/api/products', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
    });



    if (response.ok) {
        const data = await response.json();
        console.log("THIS IS DATA: ", data)
        console.log("THIS IS DATA.product.id: ", data.product.id)
        const imageResponse = await fetch(`/api/products/${data.product.id}/images`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "main_image": productData.mainImage,
                "image_url": productData.files
            })
        })

        dispatch(addOneProduct(data));
        return data;
    }

    // return response.json()
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

        // case ADD_PRODUCTS:
        //     if (!state[action.payload.id]) {
        //         const newStateForm = { ...state }
        //         newStateForm[action.payload.id] = action.payload
        //         return newStateForm
        //     }

        //     return {
        //         ...state,
        //         [action.payload.id]: {
        //             ...state[action.payload.id],
        //             ...action.payload
        //         }
        //     }

        case ADD_PRODUCTS: {
            const newProduct = {};
            newProduct[action.payload.id] = action.payload
            const newStateForm = { ...state, ...newProduct };
            return newStateForm;
        }


        default:
            return state
    }
}

export default productReducer
