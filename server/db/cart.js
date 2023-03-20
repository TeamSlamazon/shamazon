const client = require('./client');

async function createCart(user_id){
    try {
        const {rows:cart} = await client.query(`
        INSERT INTO carts (user_id)
        VALUES($1)
        RETURNING *
        `, [user_id]);
        return cart;
    }
    catch(error){
        console.log(error)
    }
}

const getCartByUserId = async ({userId}) => {
    const {rows: [cart]} = await client.query(`
    SELECT * FROM carts
    WHERE user_id = $1
    `, [userId])
    const {rows:products} = await client.query(`
    SELECT * FROM cart_products
    LEFT JOIN products ON cart_products.product_id = products.id
    WHERE cart_products.cart_id = $1
    `, [cart.id])
    cart.products = products
    return cart
}

const addProductToCart = async ({ cartId, productId}) => {

    const {rows: check} = await client.query(`
        SELECT * FROM cart_products
        WHERE cart_id = $1 and product_id = $2
    `, [cartId, productId])

    if (check.length) {
        await client.query(`
            UPDATE cart_products SET quantity = quantity + 1 
            WHERE cart_id = $1 and product_id = $2
        `, [cartId, productId]);
        return
    }

    const {rows: added} = await client.query(`
        INSERT INTO cart_products(product_id, cart_id)
        VALUES($1, $2)
        RETURNING *
    `, [productId, cartId])
    return added
}
    const updateCart = async ({}) => {
        try {
                const setFields = Object.keys(fields).map(
                (key, index) => `"${ key }"=$${ index + 1 }`
                ).join(', ');

                const {rows: cart} = await client.query(`
                UPDATE carts
                SET ${setFields}
                WHERE id = ${id}
                RETURNING *
            `, Object.values(fields))
            return cart
            
        } catch (error) {
            
        }
    }

    const deleteCart = async (id) => {
        try {
            const {rows} = await client.query(`
            DELETE FROM cart_products
            WHERE cart_id = ${id}
            RETURNING *
            `)
            return rows;
        } catch (error) {
            console.error(error);
        }
      }

module.exports = {
    deleteCart,
    createCart,
    updateCart,
    getCartByUserId,
    addProductToCart
}