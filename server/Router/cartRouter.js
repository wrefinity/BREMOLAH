import express from "express";
const router = express.Router();
import {
   createCart,
   deleteCart,
   getCart,
   addCarted,
} from "../controller/cartController.js";
import {
   verifyTokenAndRoles,
} from "../middleware/authenticate.js";

router.post("/", verifyTokenAndRoles, createCart);
router
   .route("/:id")
   .delete(verifyTokenAndRoles, deleteCart)
   .patch(verifyTokenAndRoles, addCarted);

router.get("/:userId", verifyTokenAndRoles, getCart);

//    Not needed for now
//    router.get(verifyTokenAndAdmin, getCarts);

export default router;
