import Mongoose from "mongoose";
import Category from "./category.js";
import SubCategory from "./sub_category.js";

const productSch = new Mongoose.Schema(
   {
      image: { type: String, required: true, unique: true },
      name: { type: String, required: true, unique: true },
      price: { type: Number, required: true },
      discountPrice: { type: Number },
      description: { type: String, required: true },
      color: { type: String, required: true },
      quantity: { type: Number, required: true },
      category: {
         type: Mongoose.Schema.Types.ObjectId,
         ref: Category,
         required: true,
      },
      subCategory: {
         type: Mongoose.Schema.Types.ObjectId,
         ref: SubCategory,
         required: true,
      },
   },
   { timestamps: true }
);

const productModel = Mongoose.model("Product", productSch);
export default productModel;
