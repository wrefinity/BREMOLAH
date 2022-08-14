import Mongoose from "mongoose";

const CategorySchema = new Mongoose.Schema(
   {
      name: { type: String, require: true, unique: true },
      description: { type: String, required: true },
   },
   { timestamps: true }
);

const Category = Mongoose.model("Category", CategorySchema);
export default Category;
