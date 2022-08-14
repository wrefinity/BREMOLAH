import mongoose from "mongoose";
import SubCategory from "../model/sub_category.js";

export const createSubCategory = async (req, res) => {
   const subCategory = new SubCategory(req.body);
   try {
      await subCategory.save();
      res.status(200).json(subCategory);
   } catch (er) {
      if (er.code === 11000) {
         res.status(210).json({ message: "subCategory already exist" });
      } else {
         res.status(210).json({ message: "Internal server error" });
      }
   }
};

export const updateSubCategory = async (req, res) => {
   const { id } = req.params;

   if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No product with the id: ${id}`);
   try {
      const updatedSubCategory = await SubCategory.findByIdAndUpdate(
         id,
         { $set: req.body },
         { new: true }
      );
      res.status(200).json(updatedSubCategory);
   } catch (er) {
      return res.status(210).json({ message: er.message });
   }
};

export const deleteSubCategory = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No product with the id: ${id}`);
   try {
      await SubCategory.findByIdAndDelete(id);
      res.status(200).json({ message: "product deleted" });
   } catch (er) {
      console.log(er);
      return res.status(500).json({ message: er.message });
   }
};

export const getSubCategory = async (req, res) => {
   try {
      const subCategory = await SubCategory.findOne({
         userId: req.params.userId,
      });
      res.status(200).json(subCategory);
   } catch (er) {
      return res.status(500).json({ message: er.message });
   }
};

export const getSubCategories = async (req, res) => {
   try {
      const subCategories = await SubCategory.find();
      res.status(200).json(subCategories);
   } catch (er) {
      console.log(err);
      return res.status(500).json({ message: er.message });
   }
};
