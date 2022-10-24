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
import Footer from "../Footer/footer";

const isUserReviewCreator = (review, user) => user && user.id === review.userId;
// user.id !== product.ownerId


function ProductDetail() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { productId } = useParams();

    let allProducts = useSelector(state => Object.values(state.productState));
    console.log(allProducts, "*******allproducts")
    let user = useSelector(state => state.session.user);
    const product = allProducts.find(product => product.id === +productId)
    // console.log("PRODUCT DETAIL", product)

    let allReviews = useSelector(state => Object.values(state.reviewState));
    const shouldshowbutton = user && product && product.reviews && product.reviews.find(review => review.userId === user.id)
    const isOwner = product && user && product.ownerId === user.id;


    // console.log("REviewOF USER",shouldshowbutton)
    // console.log("alreviews",allReviews)

    useEffect(() => {
        dispatch((getAllProductsThunk()))
    }, [dispatch,])

    const FALLBACK_IMAGE = "https://demofree.sirv.com/nope-not-here.jpg";
    const imageOnLoadHandler = (event) => {
        // console.log(
        //     `The image with url of ${event.currentTarget.src} has been loaded`
        // );
        if (event.currentTarget.className !== "error") {
            event.currentTarget.className = "previewImage";
        }
    };


    const imageOnErrorHandler = (event) => {
        event.currentTarget.src = FALLBACK_IMAGE;
        event.currentTarget.className = "error-detail";
    };

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
    if (!product) return null

    return !!allProducts.length && (

        <div className="detail-main-container">
            <div className="left">
                <img
                    className="previewImage"
                    src={product.images[0].image_url}
                    onLoad={imageOnLoadHandler}
                    onError={imageOnErrorHandler}
                />
                <div className="stars-review-main-div">

                    <div className="stars">{product.reviews.length} reviews {avgRatingStars(product.reviews)}</div>
                    <div className="reviewTag">Reviews for this item
                        {user && !shouldshowbutton && !isOwner && <AddReviewModal productId={+productId} />}

                    </div>
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
                                    {isUserReviewCreator(e, user) && !isOwner && <div className="buttons">
                                        <span>
                                            <button className="delete-review"
                                                onClick={async (event) => {

                                                    event.preventDefault()
                                                    await dispatch(deleteReview(e.id))
                                                    await dispatch(getAllProductsThunk())
                                                    // return history.push(`/products/${product.id}`)
                                                }}>
                                                Delete Review

                                            </button>

                                        </span>
                                        <span>
                                            {
                                                <EditReviewFormModal productId={+productId} product={product} />
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
                        {
                            user && user.id !== product.ownerId &&

                            <div>
                                <CartForm productId={+productId} />
                            </div>
                        }
                        <div className="truck"><i class="fa-solid fa-truck"></i>   Hooray! This item ships free to the US.</div>
                        <div className="cost">Cost to ship</div>
                        <div className="free">Free</div>
                        <div className="emission">Buy-Ktsy offsets carbon emissions from shipping and packaging on this purchase.</div>

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
// testing comment
export default ProductDetail
