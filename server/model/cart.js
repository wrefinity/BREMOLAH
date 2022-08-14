import mongoose from "mongoose";

let productSchema  = new  mongoose.Schema({
   productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
   },
   name: { 
      type: String, 
      required: true, 
   },
   image: { 
      type: String, 
      required: true
   },
   quantity: { 
      type: Number, 
      required:true,
      min: [1, "quantity must not be less than one"]
   },
   total: {
      type: Number,
      required:true
   },
   price: {
      type: Number,
      required:true
   }
}, {timestamps:true})


const cartSch = new mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User",
      },
      products: [productSchema],
      subTotal:{
         default:0,
         type:Number
      }
   },
   { timestamps: true }
);

const cartModel = mongoose.model("Cart", cartSch);

export default cartModel;
