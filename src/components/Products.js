// import { fetchProducts } from "../fetch";
import React, {useState} from 'react';
import {Link} from "react-router-dom"
import { fetchAddProductToCart } from "../fetch"

const Products = ({products, setCart, searchTerm, setSearchTerm, fullSearch, setFullSearch, user}) => {
    


    const productMatches = (product, text) => {
        if (product.name.includes(text)) {
            return true
        }
    }

    const filteredProducts = products.filter(product => productMatches(product, fullSearch));
    const productsToDisplay = fullSearch.length ? filteredProducts : products;

    return (
        <div>
        {
            productsToDisplay.map(product => {
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
                                { user.id ?
                                <button
                                    onClick={async () => {
                                        const updatedCart = await fetchAddProductToCart(product.id)
                                        setCart(updatedCart)
                                        
                                    }}
                                >
                                    Add to Cart
                                </button> : null
                                }
                            </div>
                        </ul>
                )
            })
        }
        </div>
    )
}

export default Products
