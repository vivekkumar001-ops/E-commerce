import express from "express";
import formidable from "express-formidable";
import {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
} from "../controller/productController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// CREATE
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// READ
router.get("/get-products", getProductController);
router.get("/get-product/:slug", getSingleProductController);
router.get("/product-photo/:pid", productPhotoController);

// UPDATE
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// DELETE
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

export default router;
