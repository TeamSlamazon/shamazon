import React from 'react'

function Cart({cart}) {
  return (
    <div>
        <h2>My Cart:</h2>
        <ul>
            {cart.products?.map((product) => {
                return (
                <li key={product.id}>
                    {product.name} ({product.quantity})
                    <button>Remove from Cart</button>
                </li>
                )
            })}
        </ul>
    </div>
  )
}

export default Cart
