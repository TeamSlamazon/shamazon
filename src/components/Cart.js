import React from 'react'
import { Link } from 'react-router-dom'
import { fetchDestroyProduct } from '../fetch'

function Cart({cart, setCart}) {

    console.log(cart)

  return (
    <div>
        <h2>My Cart:</h2>
        <ul>
            {cart.products?.map((product) => {
                return (
                <li key={product.id}>
                    {product.name} ({product.quantity})
                    <button
                        onClick={async () => {
                            const updatedCart = await fetchDestroyProduct(product.id)
                            console.log("ucart", updatedCart)
                            setCart(updatedCart)
                            console.log('deleted item')
                            console.log('new cart: ', cart)
                        }}
                    >Remove from Cart</button>
                </li>
                )
            })}
        </ul>
          <Link to='/checkout'>Checkout</Link>
    </div>
  )
}

export default Cart
