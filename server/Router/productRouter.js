import express from "express";
import {
   createProduct,
   deleteProduct,
   updateProduct,
   getProductHome,
   getProducts,
} from "../controller/productController.js";
import { verifyTokenAndAdmin } from "../middleware/authenticate.js";

const router = express.Router();

router.route("/").post(verifyTokenAndAdmin, createProduct).get(getProducts);
router.route("/home").get(getProductHome);
router
   .route("/:id")
   .delete(verifyTokenAndAdmin, deleteProduct)
   .patch(verifyTokenAndAdmin, updateProduct);

router.get("/products");

export default router;
