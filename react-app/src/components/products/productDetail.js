import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProductsThunk } from "../../store/product";
import { deleteReview, loadProductReviews } from "../../store/review"
import './productDetail.css'
import AddReviewModal from '../reviews/ReviewFormModal'
import EditReviewFormModal from "../reviews/EditReviewFormModal";
import CartForm from "../ShoppingCart/CartForm";

const isUserReviewCreator = (review, user) => user && user.id === review.userId;

function ProductDetail() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { productId } = useParams();

    let allProducts = useSelector(state => Object.values(state.productState));
    // let allReviews = useSelector(state => Object.values(state.reviewState));
    let user = useSelector(state => state.session.user);
    // const reviewofUser = allReviews.find(review => user && review.userId === user.id)
    // console.log("reviewofUser", reviewofUser)
    const product = allProducts.find(product => product.id === +productId)
    // let allReviewsArr = Object.values(allReviews)
    console.log("PRODUCT DETAIL", product)
    // console.log("REVIEW ARR", allReviews)



    // useEffect(() => {
    //     dispatch(getAProduct(productId))
    // }, [dispatch, productId])
    useEffect(() => {
        dispatch((getAllProductsThunk()))
        // dispatch((loadProductReviews(productId)));


    }, [dispatch,])// productId]);

    const avgRatingStars = (reviews) => {
        let sum = 0;
        for (let i = 0; i < reviews.length; i++) {
            let rating = reviews[i].rating;
            sum += rating;
        }
        const average = sum / reviews.length
        return getRating(average)
    }

    const getRating = (rating) => {
        if (rating === 5) {
            return (< span ><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /></span >)
        }
        else if (rating > 4 && rating < 5) {
            return (< span ><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-regular fa-star-half-stroke" /></span >)
        }
        else if (rating === 4) {
            return (< span ><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-regular fa-star" /></span >)
        }
        else if (rating > 3 && rating < 4) {
            return (< span ><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-regular fa-star-half-stroke" /><i class="fa-regular fa-star" /></span >)
        }
        else if (rating === 3) {
            return (< span ><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-regular fa-star" /><i class="fa-regular fa-star" /></span >)
        }
        else if (rating > 2 && rating < 3) {
            return (< span ><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-regular fa-star-half-stroke" /><i class="fa-regular fa-star" /><i class="fa-regular fa-star" /></span >)
        }
        else if (rating === 2) {
            return (< span ><i class="fa-solid fa-star" /><i class="fa-solid fa-star" /><i class="fa-regular fa-star" /><i class="fa-regular fa-star" /><i class="fa-regular fa-star" /></span >)
        }
        else if (rating > 1 && rating < 2) {
            return (< span ><i class="fa-solid fa-star" /><i class="fa-solid fa-star-half-stroke" /><i class="fa-regular fa-star" /><i class="fa-regular fa-star" /><i class="fa-regular fa-star" /></span >)
        }
        else if (rating === 1) {
            return (< span ><i class="fa-solid fa-star" /><i class="fa-regular fa-star" /><i class="fa-regular fa-star" /><i class="fa-regular fa-star" /><i class="fa-regular fa-star" /></span >)
        }
    }

    const getDate = (date) => {
        if (date.length === 11) {
            const month = date.slice(2, 5)
            const day = date.slice(0, 1)
            const year = date.slice(6)
            return `${month} ${day}, ${year}`
        }
        else if (date.length === 12) {
            const month = date.slice(3, 6)
            const day = date.slice(0, 2)
            const year = date.slice(7)
            return `${month} ${day}, ${year}`
        }
    }

    return !!allProducts.length && (
        <div id="product-detail-page">
            <div className="left">
                <img className="previewImage" src={product.images[0].image_url} />
                <div className="stars">{product.reviews.length} reviews {avgRatingStars(product.reviews)}</div>
                <div className="reviewTag">Reviews for this item
                    {/* {

                        <button className="createButton" onClick={async () => {
                            return history.push(`/${productId}/review/new`)
                        }}>Create a Review</button>
                    } */}
                    <AddReviewModal productId={+productId} />
                </div>

                {product && <div>
                    {
                        product.reviews.map((e) => {

                            return (

                                <div id="reviewList">

                                    <div className="comments" >
                                        {getRating(e.rating)}<br /><br />
                                        {e.comment}
                                    </div>
                                    <div className="profile">
                                        <i class="fa-solid fa-user" />{" "}
                                        {getDate(e.createdAt.slice(5, 17))}
                                    </div>
                                    {isUserReviewCreator(e, user) && <div className="buttons">
                                        <span>
                                            <button className="delete-review"
                                                onClick={async (event) => {

                                                    event.preventDefault()
                                                    await dispatch(deleteReview(e.id))
                                                    await dispatch(loadProductReviews(productId))
                                                    return history.push(`/products/${product.id}`)
                                                }}>
                                                Delete Review

                                            </button>

                                        </span>
                                        <span>
                                            {
                                                <EditReviewFormModal productId={+productId} product={product} />
                                                // <button className="updateButton" onClick={async () => {
                                                //     return history.push(`/${productId}/review/${e.id}/update`)
                                                // }}>Update a  Review</button>
                                            }
                                        </span>
                                    </div>}
                                </div>
                            )

                        })
                    }
                </div>

                }






            </div>
            <div className="right">
                {
                    product &&
                    <div>
                        <div className="ProductName">{product.name}</div>
                        {/* <div className="ReviewsLink">reviewsLink</div> */}
                        <div className="Description">{product.description}</div>
                        <div className="Price">${product.price}</div>
                        <div>
                            {/* <button className="AddToCartButton">Add to Cart</button> */}
                            <CartForm productId={+productId} />
                        </div>
                        <div className="truck"><i class="fa-solid fa-truck"></i>   Hooray! This item ships free to the US.</div>
                        <div className="cost">Cost to ship</div>
                        <div className="free">Free</div>
                        <div className="emission">Etsy offsets carbon emissions from shipping and packaging on this purchase.</div>

                    </div>
                }
            </div>
            {/* <footer>
                <div className="footerSingle" >
                    <p >© 2022 Ktsy, Inc.</p>
                </div>
            </footer> */}
        </div>

    )
}

export default ProductDetail
