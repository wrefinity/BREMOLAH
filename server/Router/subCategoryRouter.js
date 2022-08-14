import express from "express";
const router = express.Router();
import {
   createSubCategory,
   deleteSubCategory,
   updateSubCategory,
   getSubCategories,
} from "../controller/subCategoryController.js";
import {
   verifyTokenAndRoles,
   verifyTokenAndAdmin,
} from "../middleware/authenticate.js";

router
   .route("/")
   .post(verifyTokenAndAdmin, createSubCategory)
   .get(getSubCategories);
router
   .route("/:id")
   .delete(verifyTokenAndRoles, deleteSubCategory)
   .patch(verifyTokenAndAdmin, updateSubCategory);

export default router;
