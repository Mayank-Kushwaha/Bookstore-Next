import mongoose, { Schema, models } from "mongoose";
const {ObjectId} = mongoose.Schema.Types
const paymentSchema = new Schema({
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
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
},
{ timestamps: true }
);

// export const Payment = mongoose.model("Payment", paymentSchema);
const Payment = models.Payment || mongoose.model("Payment", paymentSchema);
export default Payment;
// module.exports = mongoose.models.Payment || mongoose.model('Payment', paymentSchema)
