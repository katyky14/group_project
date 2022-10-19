import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { getAllProductsThunk } from "../../store/product";
import Footer from '../Footer/footer.js';
import "./homepage.css"


function Products() {
    const dispatch = useDispatch()
    const history = useHistory();
    const productObj = useSelector(state => state.productState)
    const productArr = Object.values(productObj)
    const user = useSelector(state => state.session)


    useEffect(() => {
        dispatch(getAllProductsThunk())
    }, [dispatch])

    const redirect = () => {

        return <Redirect to={{ pathname: 'https://github.com/KatyKy14' }} />
    }

    return !!productArr.length && (
        <div id="homepage">
            <div id="header-container">
                <div id="orange-banner"></div>
                {user && (
                    <div id="Welcome">Welcome to Buy Ktsy {user.firstname}</div>
                )}
                <div id="white-space-div"></div>
            </div>
            <div id="product-container">
                {productArr.map(({ id, name, price, images }) => (
                    <div key={id} onClick={() => history.push(`/products/${id}`)} className="homepage-products">
                        <img id="previewImage" src={images.map(image => image.mainImage ? image.image_url : null)} alt={name} />
                        <div id="product-price">${price.toFixed(2)}</div>
                    </div>
                ))}
            </div>
            <Footer />
        </div >
    )

}

export default Products
