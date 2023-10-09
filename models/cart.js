import mongoose, { Schema, models } from "mongoose";

const cartSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  }, 
  address: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
    items: [
    {
      id: String,
      title: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  
});

const Cart = models.Cart || mongoose.model("Cart", cartSchema);
export default Cart;
