import React from 'react';
import {fetchSingleView} from "../fetch";
import {useParams} from "react-router-dom";


const SingleProduct = (props) => {

    const products = props.products;
    const id = useParams().id;
    const product = products.find(product => product.id*1 === id*1);

    return (
            <div>
            <div><img src={product.picture} alt="product_image" width='225px'height='275px'/></div>
            <div>{product.name}</div>
            <div>Price: ${product.price}</div>
            <div>Description: {product.description}</div>
            <div>Shipping: {product.shipping}</div>
            <div>Weight: {product.weight}lb</div>
            
            </div>
    )
}

export default SingleProduct;