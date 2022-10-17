// TYPE
const GET_USER_REVIEWS = "Reviews/getUserReview"
const GET_PRODUCT_REVIEWS = "Reviews/getProductReview"

/************************************************************************************ */
// ACTION
export const getUserReviews = (reviews) => {
    return {
        type: GET_USER_REVIEWS,
        reviews
    }
}


export const getProductReview = (reviews)=>{
    return {
        type: GET_PRODUCT_REVIEWS,
        reviews
    }
}

/************************************************************************************ */

// THUNK ACTION CREATORS
export const loadUserReviews = () => async (dispatch) => {
    const response = await fetch("/api/reviews/user")
    if (response.ok) {
        const data = await response.json()
        dispatch(getUserReviews(data.Reviews))
        return { ...data }
    }
}

export const loadProductReviews = (product_id) =>async (dispatch) =>{
    const response = await fetch(`/api/products/${product_id}/reviews`);

    if(response.ok){
        const list = await response.json();
        console.log("LIST",list)
        dispatch(getProductReview(list))
    }
    return response;
}

/**************************************************************************************** */



// REVIEWS REDUCER
const reviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USER_REVIEWS: {
            const newState = {};
            action.reviews.forEach((review) => (newState[review.id] = review))
            return newState
        }
        case GET_PRODUCT_REVIEWS:{
            const newState ={};
            action.reviews.forEach(review => (newState[review.id] = review))
            return newState
        }

        
        default: {
            return state
        }
    }
}

export default reviewsReducer
