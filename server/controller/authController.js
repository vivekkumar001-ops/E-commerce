import usermodel from "../model/usermodel.js";
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  const { name, email, password, phone, address, answer } = req.body;

  if (!name || !email || !phone || !address || !password || !answer) {
    return res.status(422).json({ error: "pls fill all the fields" });
  }

  try {
    const userExist = await usermodel.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "user already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const user = new usermodel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });

    const userRegistered = await user.save();
    if (userRegistered) {
      return res.status(201).json({ message: "user registered successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};

//Login API
//Login API - FIXED VERSION
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(400).send({ // ✅ 400 for bad request, not 404
        success: false,
        message: "Email and password are required",
      });
    }

    //check user
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // ✅ Check password match
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({ // ✅ 401 for unauthorized
        success: false,
        message: "Invalid password",
      });
    }

    // ✅ Generate token only if password matches
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // ✅ Send ONE response with token
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error: error.message,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("protected route");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//forgotPasswordController
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "email is req" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "new password is required" });
    }
    //check
    const user = await usermodel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "wrong email or answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await usermodel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

//update profile controller
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await usermodel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "password is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await usermodel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while updating profile",
      error,
    });
  }
};
// order controller
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting orders",
      error,
    });
  }
};
// all orders controller
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all orders",
      error,
    });
  }
};
// order status controller
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating order status",
      error,
    });
  }
};