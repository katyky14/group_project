import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllProductsThunk } from "../../store/product";
import "./homepage.css"


function Products() {
    const dispatch = useDispatch()
    const history = useHistory();
    const productObj = useSelector(state => state.productState)
    const productArr = Object.values(productObj)


    useEffect(() => {
        dispatch(getAllProductsThunk())
    }, [dispatch])

    return !!productArr.length && (
        <div id="homepage">
            <div id="product-container">
                {productArr.map(({ id, name, price, images }) => (
                    <div key={id} onClick={() => history.push(`/products/${id}`)} className="homepage-products">
                        <img id="previewImage" src={images.map(image => image.mainImage ? image.image_url : null)} alt={name} />
                        <div id="product-price">${price.toFixed(2)}</div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default Products
