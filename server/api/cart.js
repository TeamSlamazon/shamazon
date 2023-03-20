const express = require('express')
const cartsRouter = express.Router()
const {getCartByUserId, getUserByToken, addProductToCart, destroyCartProduct} = require('../db')

cartsRouter.get('/health', async (req, res, next) => {
    res.send({ message: "Healthy Carts Route." })
  });

cartsRouter.get('/:userId', async (req, res) => {
    const {userId} = req.params
    const cart = await getCartByUserId({userId})
    res.send(cart)
})

cartsRouter.post("/:productId", async (req, res) =>{
    const { productId } = req.params;
    const user = await getUserByToken(req.headers.authorization);
    if (!user) {
        res.status(401).send({ error: "Unauthorized" });
        return;
    }
    const cart = await getCartByUserId({ userId: user.id});
    await addProductToCart({ cartId: cart.id, productId });
    const updatedCart = await getCartByUserId({ userId: user.id });
    res.send(updatedCart);
})

cartsRouter.delete("/:cpId", async (req, res) => {
        const {cpId} = req.params;
        const user = await getUserByToken(req.headers.authorization);
        if (!user) {
            res.status(401).send({ error: "Unauthorized" });
            return;
        }
        const cart = await getCartByUserId({ userId: user.id});
        await destroyCartProduct(cpId)
        const updatedCart = await getCartByUserId({ userId: user.id });
        res.send(updatedCart);

})


module.exports = cartsRouter