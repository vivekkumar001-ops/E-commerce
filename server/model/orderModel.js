import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                type: mongoose.ObjectId,
                ref: "Products",
            },
        ],
        payment: {},
        buyer: {
            type: mongoose.ObjectId,
            ref: "users",
        },
        status: {
            type: String,
            default: "Not process",
            enum:["Not Process", "Processing", "Shipped", "Delivered", "Cancel"],
            default: "Not Process",
        },
    },
    {timestamps: true}
);

export default mongoose.model("Order", orderSchema);