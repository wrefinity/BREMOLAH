import Product from "../model/product.js";
import Cartegory from "../model/category.js"
import {productFinder,
   productFinderById,
   productCreator,
   productDeletor} from  "./productRepository.js"




import mongoose from "mongoose";
import Category from "../model/category.js";

export const createProduct = async (req, res) => {
   try {
      const product = await Product.create(req.body);
      res.status(200).json(product);
   } catch (er) {
      console.log(er);
      res.status(210).json(er.message);
   }
};

export const updateProduct = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No product with the id: ${id}`);
   try {
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
         new: true,
      });
      console.log(updatedProduct);
      res.status(200).json(updatedProduct);
   } catch (er) {
      console.log(er);
      res.status(210).json(er.message);
   }
};

export const deleteProduct = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No product with id: ${id}`);
   try {
      await Product.findByIdAndDelete(id);
      res.status(200).json("product deleted");
   } catch (er) {
      return res.status(210).json(er.message);
   }
};

export const getProducts = async (req, res) => {
   try {
      const products = await productFinder();
      res.status(200).json(products);
   } catch (er) {
      console.log(er);
      return res.status(210).json(er.message);
   }
};

export const getProductHome = async (req, res) => {
   try {
      const products = await Product.find({}).sort('createdAt', -1).limit(6);
      let category = {}
      const cat = await Category.find({}, async(err, cat)=>{
         cat.map(async(c) => {
            category[c.name] = await Product.find({category:cat._id})
         })
      })
      
      res.status(200).json(products);
   } catch (er) {
      console.log(er);
      return res.status(210).json(er.message);
   }
};

// export const getProducts = async (req, res) => {
//    const qNew = req.query.new;
//    const qCat = req.query.category;

//    try {
//       let products;
//       if (qNew) {
//          products = await Product.find().sort({ createdAt: -1 }).limit(5);
//       } else if (qCat) {
//          products = await Product.find({
//             categories: {
//                $in: [qCat],
//             },
//          });
//       } else {
//          products = await Product.find();
//       }
//       res.status(200).json(products);
//    } catch (er) {
//       return res.status(500).json({ message: er.message });
//    }
// };

export const getProduct = async (req, res) => {
   try {
      product = await Product.findById(req.params.id);
      res.status(200).json(product);
   } catch (er) {
      console.log(er);
      return res.status(500).json({ message: er.message });
   }
};
