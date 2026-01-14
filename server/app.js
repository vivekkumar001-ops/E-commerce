import express from "express";
import colors from "colors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import authRouter from "./router/aurthRouter.js";
import categoryRoutes from "./router/categoryRoutes.js";
import productRoutes from "./router/productRouter.js";
const app = express();
dotenv.config({ path: "./config.env" });


app.use(express.json());

// print hello world on the server
app.get("/", (req, res) => {
  res.send("Hello World");
});

connectDB();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/category", categoryRoutes);
app.use ("/api/v1/product",productRoutes)
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on mode on port ${PORT}`.bgCyan.white);
});