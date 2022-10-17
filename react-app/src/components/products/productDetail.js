import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAProduct } from "../../store/product";

function ProductDetail() {
    const dispatch = useDispatch()
    const product = useSelector(state => state.productState)
    const { productId } = useParams()

    useEffect(() => {
        dispatch(getAProduct(productId))
    }, [dispatch, productId])

    return !product && (
        <div>
            <h1>Product Detail Page</h1>
            <div>
                {product[1].name}
            </div>
            <div>
                {product[1].price}
            </div>
            {/* <div>
                {product[1].reviews.map((review, i) => (
                    <div key={i}>{review.comment}</div>
                ))}
            </div> */}
            <div>
                {product[1].name}
            </div>
        </div>
    )
}

export default ProductDetail
