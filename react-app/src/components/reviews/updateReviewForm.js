import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {loadProductReviews,createReviews,deleteReview,updateReview} from "../../store/review"
import { getAProduct } from "../../store/product";


/*********************************************************************************** */
export const UpdateReviewForm =()=>{
const dispatch = useDispatch();
const history = useHistory();

/*****************************************useState****************************************** */
const [comment, setComment] = useState("");
const [rating, setRating] = useState(0);
const [validations, setValidations] = useState([])
const[show,setShow]=useState(false);

const updateReviews = (e) => setComment(e.target.value);
const updateStars = (e) => setRating(e.target.value);

let {productId,reviewId} = useParams();

let allProducts = useSelector(state => Object.values(state.productState));
// console.log("ALLPRODUCTS" ,allProducts)
let allReviews = useSelector(state => Object.values(state.reviewState));
console.log("ALLREVIEWS",allReviews)
let user = useSelector(state=>state.session.user);

const reviewofUser = allReviews.find(review=> user && review.userId === user.id)
const product = allProducts.find(product => product.id === +productId)
console.log("PRODUCT",product)
/***************************************useEffect******************************************** */
useEffect(() => {
    dispatch(getAProduct(productId))
    dispatch((loadProductReviews(productId)));
   
  }, [dispatch]);

useEffect(() => {
    const errors = [];
    if (!comment.length) errors.push("Review text is required");
    if (rating <= 0) errors.push("Stars must between 1 to 5");
    if(reviewofUser) errors.push("User already has a review");
    setValidations(errors)
  }, [comment, rating]);




/***************************************handleSubmit and onCancel func******************************************** */
// const onCancel = ()=>{
// setShow(false)
// }

const handleSubmit = async (e)=>{
    e.preventDefault();
    const payload={id:reviewId,comment,rating};
    let newReview = await dispatch(updateReview(payload))
    dispatch(loadProductReviews(product.id))
console.log("NEW UPDATE REVIEW " , newReview)
console.log(payload.id.reviews,"PAYLOAD ID REVIEW")
    // if(newReview){
    //     onCancel()
    // }
}

/***************************************render func******************************************** */
return (
    <form className="create-review-text" onSubmit={handleSubmit}>
      <ul className="errorsReview">
        {
          validations.map((error, index) => (
            <li key={index}>{error}</li>
          ))
        }
      </ul>
      <input id="reviewInput"
        type="text"
        placeholder="Write a review"
        required
        value={comment}
        onChange={updateReviews}
      />
      
      <input id="reviewInput"
        type="number"
        placeholder="rating"
        min="0"
        max="5"
        value={rating}
        onChange={updateStars}
      />
      <button className="editButton" type="submit">Submit review</button>
      {/* <button className="cancelEdit" type="button" onClick={onCancel}>Cancel</button> */}

    </form>
  )
}