import Mongoose from "mongoose";
import Category from "./category.js";

const SubCategorySchema = new Mongoose.Schema(
   {
      name: { type: String, required: true },
      category: {
         type: Mongoose.Schema.Types.ObjectId,
         ref: Category,
         required: true,
      },
      description: { type: String, required: true },
   },
   { timestamps: true }
);

const SubCategory = Mongoose.model("SubCategory", SubCategorySchema);
export default SubCategory;
