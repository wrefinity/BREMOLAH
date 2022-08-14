import mongoose from "mongoose";
import Cart from "../model/cart.js";
import { cartCreator, addCart } from "./cartRepository.js";
import {productFinderById} from "./productRepository.js";


export const createCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    const quantity = Number.parseInt(req.body.quantity);

    let cartGetter = await cartCreator(userId);

    let productDetails = await productFinderById(productId);
    if (!productDetails) 
      return res.status(400).json("Invalid request");
 

    // If Cart Exists
    if (cartGetter) {
      //check if index exists
      const indexFound = cartGetter.products.findIndex(
        (pro) => pro.productId.id == productId
      );
    
      if (indexFound !== -1 && cartGetter.products[indexFound].quantity > 0) {
        return res.status(210).json("Product already in cart");
      }else if (indexFound === -1){

            cartGetter.products.push({
              productId: productId,
              quantity: quantity,
              price: productDetails.price,
              name: productDetails.name,
              image: productDetails.image,
              total: parseInt(productDetails.price * quantity),
            });
            cartGetter.subTotal = cartGetter.products
              .map((pro) => pro.total)
              .reduce((acc, next) => acc + next);
          }
          const updatedCart = await cartGetter.save();
          return res.status(200).json(updatedCart);
 
      
    } else {
      const cartData = {
         userId:userId,
         products: [{
             productId,
             quantity: quantity,
             price: productDetails.price,
             name: productDetails.name,
             image: productDetails.image,
             total: parseInt(productDetails.price * quantity),
         }],
         subTotal: parseInt(productDetails.price * quantity)
     }
     const carted = await addCart(cartData)
     res.status(200).json(carted);

    }

  } catch (er) {
    if (er.code === 11000)
      return res.status(210).json("Product already in cart");
  }
};

export const updateCart = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No product with the id: ${id}`);
  try {
    updatedCart = await Cart.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (er) {
    return res.status(500).json({ message: er.message });
  }
};

export const addCarted = async (req, res) => {
  const productId  = req.params.id;
  const {tagger}  = req.body;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(productId))
    return res.status(404).send(`No product with the id: ${productId}`);

  try {
      let productDetails = await productFinderById(productId);
      if (!productDetails) 
        return res.status(404).json({message: "Invalid request"});
      
      let cartGetter = await cartCreator(userId);
      const indexFound = cartGetter.products.findIndex(
        (product) => product.productId.id == productId
      );
      if (indexFound !== -1 && tagger.toLowerCase() === "increment") {
        cartGetter.products[indexFound].quantity =
          cartGetter.products[indexFound].quantity + 1;
        cartGetter.products[indexFound].total =
          cartGetter.products[indexFound].quantity * productDetails.price;
        cartGetter.products[indexFound].price = productDetails.price;
        cartGetter.subTotal = cartGetter.products
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);
      }else{

        if (indexFound !== -1 && cartGetter.products[indexFound].quantity > 0) {
            cartGetter.products[indexFound].quantity =
              cartGetter.products[indexFound].quantity - 1;
            cartGetter.products[indexFound].total =
              cartGetter.products[indexFound].quantity * productDetails.price;
            cartGetter.products[indexFound].price = productDetails.price;
            cartGetter.subTotal = cartGetter.products
              .map((item) => item.total)
              .reduce((acc, next) => acc + next);

        }

      }
      await cartGetter.save();
      let cart = await cartCreator(userId)
      cart && res.status(200).json(cart.products);


  } catch (er) {
    return res.status(210).json(er.message);
  }
};

export const deleteCart = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  console.log("the id is " + id)
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json(`No product with the id: ${id}`);
  try {

   let cartGetter = await cartCreator(userId);
   if(cartGetter){
      const indexFound = cartGetter.products.findIndex(pro => pro._id == id);
      if (indexFound !== -1) {
         cartGetter.products.splice(indexFound, 1);
         if (cartGetter.products.length == 0) {
           cartGetter.subTotal = 0;
         } else {
           cartGetter.subTotal = cartGetter.products
             .map((item) => item.total)
             .reduce((acc, next) => acc + next);
         }
       }

      await cartGetter.save();
      res.status(200).json("Product removed successfully");
   }

      //-
  } catch (er) {
    return res.status(500).json(er.message);
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
   let cart = await cartCreator(userId)
   if (!cart)
      return res.status(400).json({message:"Cart Not Found"})
   res.status(200).json(cart.products);
  } catch (er) {
    return res.status(500).json({ message: er.message });
  }
};


export const emptyCart = async (req, res) => {
      try {
          const userId = req.user.id;
          let cart = await cartCreator(userId);
          cart.products = [];
          cart.subTotal = 0
          await cart.save();
          res.status(200).json({message: "Cart Has been emptied"})
      } catch (err) {
          res.status(400).json({ message: er.message });
      }
   }



//check if index exists
// const indexFound = cartGetter.products.findIndex(
//   (pro) => pro.productId.id == productId
// );
// //------this removes an item from the the cart if the quantity is set to zero,We can use this method to remove an item from the list  -------
// if (indexFound !== -1 && quantity <= 0) {
//   cartGetter.products.splice(indexFound, 1);
//   if (cartGetter.products.length == 0) {
//     cartGetter.subTotal = 0;
//   } else {
//     cartGetter.subTotal = cartGetter.products
//       .map((item) => item.total)
//       .reduce((acc, next) => acc + next);
//   }
// }
// //----------check if product exist,just add the previous quantity with the new quantity and update the total price-------
// else if (indexFound !== -1) {
//   cartGetter.products[indexFound].quantity =
//     cartGetter.products[indexFound].quantity + quantity;
//   cartGetter.products[indexFound].total =
//     cartGetter.products[indexFound].quantity * productDetails.price;
//   cartGetter.products[indexFound].price = productDetails.price;
//   cartGetter.subTotal = cartGetter.products
//     .map((item) => item.total)
//     .reduce((acc, next) => acc + next);
// }

// //----Check if Quantity is Greater than 0 then add item to items Array ----
// else if (indexFound === -1) {
//   cartGetter.products.push({
//     productId: productId,
//     quantity: quantity,
//     price: productDetails.price,
//     name: productDetails.name,
//     image: productDetails.image,
//     total: parseInt(productDetails.price * quantity),
//   });
//   cartGetter.subTotal = cartGetter.products
//     .map((pro) => pro.total)
//     .reduce((acc, next) => acc + next);
// }
// const updatedCart = await cartGetter.save();
// return res.status(200).json(updatedCart);

