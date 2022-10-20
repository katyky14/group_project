import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SearchProducts() {
    const dispatch = useDispatch();
    const searchObj = useSelector(state => state.searchState)
    const searchArr = Object.values(searchObj)

    useEffect(() => {

    }, [dispatch])

    return (
        <div className="search-page">
            <div className="search-header">

            </div>
            <div className="search-results-container">
                {searchArr.map((result) => (
                    <div className="search-card-div">
                        <Link className="search-card-link">
                            <div className="search-card-base">
                                <div className="search-image-div"></div>
                                <div className="search-card-text-div"></div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchProducts;
