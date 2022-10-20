// TYPE
const GET_USER_REVIEWS = "Reviews/getUserReview"
export const GET_PRODUCT_REVIEWS = "Reviews/getProductReview"
export const CREATE_ONE = "reviews/CREATE_ONE";
export const REMOVE_ONE = 'reviews/REMOVE_ONE';
export const EDIT_REVIEW = "spots/EDIT_SPOT";//updating a review
/************************************************************************************ */
// ACTION
export const getUserReviews = (reviews) => {
    return {
        type: GET_USER_REVIEWS,
        reviews
    }
}


const getProductReview = (reviews) => {
    return {
        type: GET_PRODUCT_REVIEWS,
        reviews
    }
}
const postReviews = (review) => ({
    type: CREATE_ONE,
    review
});
const remove = (id) => ({
    type: REMOVE_ONE,
    // itemId,
    id
})
const editReview = (review) => ({
    type: EDIT_REVIEW,
    review
});

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

export const loadProductReviews = (product_id) => async (dispatch) => {
    const response = await fetch(`/api/products/${product_id}/reviews`);

    if (response.ok) {
        const list = await response.json();
        console.log("LIST", list)
        dispatch(getProductReview(list.Reviews))
    }
    return response;
}

export const createReviews = (data) => async dispatch => {
    console.log("CREATE REVIEWS DATA", data)
    const { productId } = data
    const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const newReview = await response.json();
        dispatch(postReviews(newReview));
        return newReview
    }
}
export const deleteReview = (reviewId) => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const { id } = await response.json();
        dispatch(remove(id));
    }
}
export const updateReview = (payload) => async (dispatch) => {
    console.log("PAYLOAD", payload)
    const { reviewId } = payload
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const review = await response.json();
        dispatch(editReview(review));
        return review;
    }
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
        case GET_PRODUCT_REVIEWS: {
            const newState = {};
            action.reviews.forEach(review => (newState[review.id] = review))
            return newState
        }
        case CREATE_ONE: {
            if (!state[action.review.id]) {
                const newState = { ...state, [action.review.id]: action.review };
                return newState;
            }

        }
            return {
                ...state,
                [action.review.id]: {
                    ...state[action.review.id],
                    ...action.review
                }
            };
        case REMOVE_ONE:
            const newState = { ...state };
            delete newState[action.spotId];
            return newState;
        case EDIT_REVIEW:
            if (!state[action.review.id]) {
                const newState = { ...state, [action.review.id]: action.review };
                return newState;
            }
            return {
                ...state,
                [action.review.id]: {
                    ...state[action.review.id],
                    ...action.review
                }
            };
        default: {
            return state
        }
    }
}

export default reviewsReducer
