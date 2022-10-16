import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsThunk } from "../../store/product";


function Products() {
    const dispatch = useDispatch()
    const productObj = useSelector(state => state.productState)
    const productArr = Object.values(productObj)



    useEffect(() => {
        dispatch(getAllProductsThunk())
    }, [dispatch])

    return !!productArr.length && (
        <div>
            <h1>Products</h1>
            <div>
                {productArr.map(({ id, price, images }) => (
                    <div key={id}>
                        <img style={{ width: 300, height: 500 }} src={images.map(image => image.mainImage ? image.image_url : null)} alt={"Preview Spot"} />
                        <div>${price.toFixed(2)}</div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default Products
