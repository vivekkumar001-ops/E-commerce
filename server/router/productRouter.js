import express from "express";
import {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  updateProductController,
} from "../controller/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

// CREATE PRODUCT
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// UPDATE PRODUCT
router.put(
  "/update-product/:pid", 
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// GET PRODUCT PHOTO
router.get("/product-photo/:pid", productPhotoController);

// GET SINGLE PRODUCT
router.get("/get-product/:slug", getSingleProductController);

// GET ALL PRODUCTS
router.get("/get-product", getProductController);

// DELETE PRODUCT
router.delete(
  "/delete-product/:pid", 
  requireSignIn,
  isAdmin,
  deleteProductController
);

//filter
router.post("/product-filters", productFilterController);

//product count 
router.get("/product-count", productCountController)

//product per page
router.get("/product-list/:page", productListController)

//payements routes
//token
router.get("/braintree/token", braintreeTokenController);
//payements
router.post("/braintree/payment", requireSignIn, brainTreePaymentController)

export default router;