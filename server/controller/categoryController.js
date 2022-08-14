import mongoose from "mongoose";
import Category from "../model/category.js";

export const createCategory = async (req, res) => {
   const category = new Category(req.body);
   try {
      await category.save();
      res.status(200).json(category);
   } catch (er) {
      if (er.code === 11000) {
         res.status(210).json({ message: "category already exist" });
      } else {
         res.status(210).json({ message: "Internal server error" });
      }
   }
};

export const updateCategory = async (req, res) => {
   const { id } = req.params;

   if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No product with the id: ${id}`);
   try {
      const updatedCategory = await Category.findByIdAndUpdate(
         id,
         { $set: req.body },
         { new: true }
      );
      res.status(200).json(updatedCategory);
   } catch (er) {
      console.log(er);
      return res.status(210).json({ message: er.message });
   }
};

export const deleteCategory = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No product with the id: ${id}`);
   try {
      await Category.findByIdAndDelete(id);
      res.status(200).json({ message: "category deleted" });
   } catch (er) {
      return res.status(500).json({ message: er.message });
   }
};

export const getCategory = async (req, res) => {
   try {
      category = await Category.findOne({ userId: req.params.userId });
      res.status(200).json(category);
   } catch (er) {
      return res.status(500).json({ message: er.message });
   }
};

export const getCategories = async (req, res) => {
   try {
      const categories = await Category.find();
      res.status(200).json(categories);
   } catch (er) {
      console.log(er);
      return res.status(500).json({ message: er.message });
   }
};
