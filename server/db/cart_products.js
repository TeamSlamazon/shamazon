const client = require('./client');

// async function addProductToCart({cartId, productId}) {
//     try {
//         const {rows} = await client.query(`
//         INSERT INTO cart_products("cart_id", "product_id")
//         VALUES($1, $2)
//         RETURNING *
//         `, [cartId, productId])
//         return rows;
//     } catch (error) {
//         throw error
//     }
// }

// async function updateCartProduct({id, ...fields}){
//     const setString = Object.keys(fields).map(
//         (key, index) => `"${ key }"=$${ index + 1 }`
//       ).join(', ');
//       try {
//         const {rows} = await client.query(`
//         UPDATE cart_products
//         SET ${ setString }
//         WHERE id=${ id }
//         RETURNING *
//         `, Object.values(fields))
//         return rows
//       } catch (error) {
//         throw error
//       }
// }

async function destroyCartProduct(id){
    try {
        const {rows} = await client.query(`
        DELETE FROM cart_products
        WHERE id=$1
        RETURNING *
        `, [id])
        return rows
    } catch (error) {
        throw error
    }
}

// async function getCartProductById(id){
//     try {
//         const {rows: [cart_product]} = await client.query(`
//         SELECT "cart_id", "product_id", quantity, id
//         FROM cart_products
//         WHERE id=$1
//         `, [id])
//         return cart_product;
//     }
//     catch (error){
//         console.log(error);
//     }
// }

async function getCartProductByCart({id}){
    try {
        const {rows} = await client.query(`
        SELECT "cart_id", "product_id", quantity, id
        FROM cart_products
        WHERE "cart_id"=$1;
        `,[id])
        return rows;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    
    destroyCartProduct,
    getCartProductByCart
}