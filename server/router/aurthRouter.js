import express from 'express'

import { registerController, loginController, testController, forgotPasswordController, getAllOrdersController } from '../controller/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { getProductController } from '../controller/productController.js';
//router object
const router = express.Router();
// REGISTER || POST
router.post("/register", registerController);
//LOGIN || POST
router.post("/login", loginController)
//TEST || GET
router.get("/test", requireSignIn, isAdmin, testController);
//forgot password || POST
router.post("/forgot-password", forgotPasswordController)
//protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});
//protected route admin auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});
//update profile
router.get("/profile", requireSignIn, getProductController);
//orders
router.get("/orders", requireSignIn, getProductController);
//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);
//order status update
router.put("/order-status/:orderId", requireSignIn, isAdmin, getAllOrdersController);

export default router;