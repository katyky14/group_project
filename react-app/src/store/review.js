// TYPE
const GET_USER_REVIEWS = "Reviews/getUserReview"

// ACTION
export const getUserReviews = (reviews) => {
    return {
        type: GET_USER_REVIEWS,
        reviews
    }
}

// THUNK ACTION CREATORS
export const loadUserReviews = () => async (dispatch) => {
    const response = await fetch("/api/reviews/user")
    if (response.ok) {
        const data = await response.json()
        dispatch(getUserReviews(data.Reviews))
        return { ...data }
    }
}

// REVIEWS REDUCER
const reviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USER_REVIEWS: {
            const newState = {};
            action.reviews.forEach((review) => (newState[review.id] = review))
            return newState
        }
        default: {
            return state
        }
    }
}

export default reviewsReducer
