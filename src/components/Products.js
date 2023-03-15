// import { fetchProducts } from "../fetch";
import React from 'react';
import {Link} from "react-router-dom"
import { fetchAddProductToCart } from "../fetch"

const Products = (props) => {
    
    const products=props.products


    return (
        <div>
        {
            products.map(product => {
                return (
                        <ul key={ product.id }>
                            <div className="product">
                                <div className="image">
                                    <li key={product.id}><img src={product.picture} alt="product_image" width='225px'height='275px'/></li>
                                </div>

                                <div className="info">
                                    <div className="info_sub1">
                                        <li className='name'><Link to={`/products/${product.id}`}>{product.name}</Link></li>

                                        <li className='price'>${product.price}.00</li>
                                        <li className='shipping'>Shipping Details: {product.shipping}</li>
                                    </div>
                                </div>
                                <button
                                    onClick={async () => {
                                        const updatedCart = await fetchAddProductToCart(product.id)
                                        console.log('added to cart')
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </ul>
                )
            })
        }
        </div>
    )
}

export default Products
