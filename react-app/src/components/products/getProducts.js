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
    const user = useSelector(state => state.session.user)


    useEffect(() => {
        dispatch(getAllProductsThunk())
    }, [dispatch])

    const FALLBACK_IMAGE = "https://demofree.sirv.com/nope-not-here.jpg";
    const imageOnLoadHandler = (event) => {
        // console.log(
        //     `The image with url of ${event.currentTarget.src} has been loaded`
        // );
        // if (event.currentTarget.className !== "error") {
        //     event.currentTarget.className = "success";
        // }
        if (event.currentTarget.className !== "error") {
            event.currentTarget.id = "previewImage";
        }
    };


    const imageOnErrorHandler = (event) => {
        event.currentTarget.src = FALLBACK_IMAGE;
        event.currentTarget.className = "error";
    };


    return !!productArr.length && (
        <div id="homepage">
            <div id="header-container">
                <div id="orange-banner"></div>
                {user ? (
                    <div id="Welcome">Welcome to Buy Ktsy {user.firstname}</div>
                ) : (<div id="Welcome">Welcome to Buy Ktsy</div>)}
                <div id="white-space-div"></div>
            </div>
            <div id="product-container">
                {productArr.map(({ id, name, price, images }) => (
                    <div key={id} onClick={() => history.push(`/products/${id}`)} className="homepage-products">
                        <img id="previewImage"
                            src={images.find(image => image.mainImage === true).image_url}
                            alt={name}
                            onLoad={imageOnLoadHandler}
                            onError={imageOnErrorHandler}
                        />
                        <div id="product-price">${price.toFixed(2)}</div>
                    </div>
                ))}
            </div>
            <Footer />
        </div >
    )
}

export default Products
