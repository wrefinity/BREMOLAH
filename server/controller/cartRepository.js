import Cart from "../model/cart.js";


export const cartCreator = async (userId) => {
    const carts = await Cart.find({userId}).populate({
        path:"products.productId",
        select:"productId, price, image, name, total, quantity"
    })

    return carts[0];
}


export const addCart = async (payload) =>{
    const newCart = await Cart.create(payload);
    return newCart
}