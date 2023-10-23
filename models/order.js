import mongoose, { Schema, models } from "mongoose";
const {ObjectId} = mongoose.Schema.Types
const OrderSchema = new Schema({
  user:{
    type:ObjectId,
    ref:"User"
},
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
    default: 0,
  },
  
},
{ timestamps: true });

const Order = models.Order || mongoose.model("Order", OrderSchema);
export default Order;
