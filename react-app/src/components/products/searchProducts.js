// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { getSearchProductsThunk } from '../../store/search'
import './searchProducts.css'

function SearchProducts() {
    // const dispatch = useDispatch();
    const searchArr = useSelector(state => state.searchState)
    // const searchArr = Object.values(searchObj)
    console.log(searchArr)
    // useEffect(() => {
    //     // dispatch(getSearchProductsThunk())
    // }, [dispatch])
    if (!searchArr) return null;

    const isEmptyObject = (obj) => {
        return JSON.stringify(obj) === '{}';
    }
    if (isEmptyObject(searchArr)) {
        return (
            <div className="no-results-header">
                <h2>No Results found</h2>
            </div>)
    }

    return (
        <div className="search-products-page">
            <div className="search-page-header">
                <h2>Search Results:</h2>
            </div>
            <div className="search-products-page-container">
                {searchArr.map((result) => (
                    <div className="search-products-card-div">
                        <Link to={`/products/${result.id}`} className="search-products-card-link">
                            <div className="search-products-card-base">
                                <div className="search-products-image-div">
                                    <img className="search-product-previewImage" src={result.images.map(image => image.mainImage ? image.image_url : null)} alt={result.name} />
                                </div>
                                <div className="search-products-card-text-div">
                                    <p className="search-products-card-text-name">{result.name}</p>
                                    <p className="search-products-card-text-price">${result.price}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchProducts;
