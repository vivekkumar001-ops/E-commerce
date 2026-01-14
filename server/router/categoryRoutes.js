import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import express from "express";
import {
    createCategoryController,
    categoryController,
    deleteCategoryController,
    singleCategoryController,
    updateCategoryController
} from "../controller/categoryController.js";
const router = express.Router();
//routes

// create category
router.post(
    "/create-category",
    requireSignIn,
    isAdmin,
    createCategoryController
);
// update category
router.put(
    "/update-category/:id",
    requireSignIn,
    isAdmin,
    updateCategoryController
);
// gatAll category
router.get(
    "/get-category",
    categoryController
);
// single category
router.get(
    "/single-category/:slug",
    singleCategoryController
);
// delete category
router.delete(
    "/delete-category/:id",
    requireSignIn,
    isAdmin,
    deleteCategoryController
);

export default router;