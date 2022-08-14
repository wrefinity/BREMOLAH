import express from "express";
const router = express.Router();
import {
   createCategory,
   deleteCategory,
   getCategory,
   updateCategory,
   getCategories,
} from "../controller/categoryController.js";
import {
   verifyTokenAndRoles,
   verifyTokenAndAdmin,
} from "../middleware/authenticate.js";

router.route("/").post(verifyTokenAndAdmin, createCategory).get(getCategories);
router
   .route("/:id")
   .delete(verifyTokenAndRoles, deleteCategory)
   .patch(verifyTokenAndAdmin, updateCategory);

export default router;
