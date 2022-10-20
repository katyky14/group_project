import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAProduct } from "../../store/product";
import { createReviews, deleteReview, getProductReview, loadProductReviews } from "../../store/review"
// import { useHistory } from "react-router-dom";
import './productDetail.css'


const isUserReviewCreator = (review, user) => user && user.id === review.userId;

function ProductDetail() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { productId } = useParams();


    let allProducts = useSelector(state => Object.values(state.productState));
    let allReviews = useSelector(state => Object.values(state.reviewState));
    let user = useSelector(state => state.session.user);
    const reviewofUser = allReviews.find(review => user && review.userId === user.id)
    console.log("reviewofUser", reviewofUser)
    const product = allProducts.find(product => product.id === +productId)
    // let allReviewsArr = Object.values(allReviews)
    console.log("PRODUCT DETAIL", product)
    console.log("REVIEW ARR", allReviews)



    // useEffect(() => {
    //     dispatch(getAProduct(productId))
    // }, [dispatch, productId])
    useEffect(() => {
        dispatch(getAProduct(productId))
        dispatch((loadProductReviews(productId)));


    }, [dispatch, productId]);

    return (
        <div>
            <div className="left">
                <img className="previewImage" src={product?.images[0].image_url} />




                <div className="stars">{allReviews.length}<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
                <div className="reviewTag">Reviews for this item
                    {

                        <button className="createButton" onClick={async () => {
                            return history.push(`/${productId}/review/new`)
                        }}>Create a Review</button>
                    }

                </div>

                {product && <div>
                    {
                        allReviews.map((e) => {

                            return (

                                <div id="reviewList">

                                    <div className="comments" >{e.comment}</div>
                                    <div className="profile"><i class="fa-solid fa-user"></i></div>
                                    <div className="buttons">
                                        <span>
                                            {isUserReviewCreator(e, user) && <button className="delete-review"
                                                onClick={async (event) => {

                                                    event.preventDefault()
                                                    await dispatch(deleteReview(e.id))
                                                    await dispatch(loadProductReviews(productId))
                                                    return history.push(`/products/${product.id}`)
                                                }}>
                                                Delete Review

                                            </button>}
                                        </span>
                                        <span>
                                            {

                                                <button className="updateButton" onClick={async () => {
                                                    return history.push(`/${productId}/review/${e.id}/update`)
                                                }}>Update a  Review</button>
                                            }
                                        </span>
                                    </div>
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
                        <div><button className="AddToCartButton">Add to Cart</button></div>
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
