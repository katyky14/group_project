import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAProduct } from "../../store/product";
import { createReviews, deleteReview, getProductReview, loadProductReviews } from "../../store/review"
// import { useHistory } from "react-router-dom";

const isUserReviewCreator = (review, user) => user && user.id === review.userId;

function ProductDetail() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { productId } = useParams();


    let allProducts = useSelector(state => Object.values(state.productState));
    let allReviews = useSelector(state => Object.values(state.reviewState));
    let user = useSelector(state => state.session.user);
    const reviewofUser = allReviews.find(review => user && review.userId === user.id)
    console.log("reviewofUser",reviewofUser)
    const product = allProducts.find(product => product.id === +productId)
    // let allReviewsArr = Object.values(allReviews)
    console.log("PRODUCT DETAIL",product)
    console.log("REVIEW ARR", allReviews)



    // useEffect(() => {
    //     dispatch(getAProduct(productId))
    // }, [dispatch, productId])
    useEffect(() => {
        dispatch(getAProduct(productId))
        dispatch((loadProductReviews(productId)));

    }, [dispatch, productId]);

    // return !product && (
    //     <div>
    //         <h1>Product Detail Page</h1>
    //         <div>
    //             {product[1].name}
    //         </div>
    //         <div>
    //             {product[1].price}
    //         </div>
    //         {/* <div>
    //             {product[1].reviews.map((review, i) => (
    //                 <div key={i}>{review.comment}</div>
    //             ))}
    //         </div> */}
    //         <div>
    //             {product[1].name}
    //         </div>
    //     </div>
    // )
    return (
<div>
        <div className="left">
            {/* <div className="previewImage">{product.images.image_url}</div> */}
            {product && <div>
                {
                    allReviews.map((e) => {

                        return (

                            <div id="reviewList">

                                <div>{e.comment}</div>
                                {isUserReviewCreator(e, user) && <button className="delete-review"
                                    onClick={async (event) => {

                                        event.preventDefault()
                                        await dispatch(deleteReview(e.id))
                                        await dispatch(loadProductReviews(productId))
                                        return history.push(`/products/${product.id}`)
                                    }}>
                                    Delete Review

                                </button>}
                                {

                                    <button onClick={async () => {
                                        return history.push(`/${productId}/review/${e.id}/update`)
                                    }}>Update a  Review</button>
                                }

                            </div>

                        )

                    })
                }
            </div>

            }
            {

                <button onClick={async () => {
                    return history.push(`/${productId}/review/new`)
                }}>Create a Review</button>
            }



        </div>
        <div className="right">
          {
            product &&
            <div>
            <div className="ProductName">{product.name}</div>
            <div className="ReviewsLink">reviewsLink</div>
            <div className="Description">{product.description}</div>
            <div className="Price">${product.price}</div>
            <div className="AddToCartButton"><button>Add to Cart</button></div>
           <div><i class="fa-duotone fa-truck"></i>Hooray! This item ships free to the US.</div>
           <div>Cost to ship</div>
           <div>Free</div>
           <div>Etsy offsets carbon emissions from shipping and packaging on this purchase.</div>

            </div>
          }
        </div>
        </div>
    )
}

export default ProductDetail
