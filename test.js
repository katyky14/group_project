
// {
//     "name": "bracelet",
//     "description": "this is an awesome bracelet made by Tony",
//     "price": 20.00,
//     "image": "https://media.tiffany.com/is/image/Tiffany/EcomBrowseM/tiffany-infinitybracelet-30036298_1019247_ED_M.jpg?&op_usm=1.0,1.0,6.0&$cropN=0.1,0.1,0.8,0.8&defaultImage=NoImageAvailableInternal&",
//     "quantity": 2,
//     "owner_id": 1
// }



// #Get products by search
// @product_routes.route('/:search')
// def get_product_by_search(search):
//     products = Product.query.filter(Product.name.like(f"%{search}%"))
//     return {'products': [product.to_dict_relationship() for product in products ]}

// branch - getProduct-component



/*
 return (
        <div>
            <h1>CART ITEMS</h1>
            <div>
                <div>
                    <h1>Product Item</h1>
                    {filter.length && cartArr.map(item => (

                        <div key={item.id}>

                            <div>
                            <div>{item.id} ProductId {item.productId} </div>
                            <button onClick={() => {
                                dispatch(removeItemThunk(item.productId))
                            }}> Delete</button>
                            </div>

                        </div>

                    ))}
                </div>

            </div>
        </div>
    )



*/
