import mongoose, { Schema, models } from "mongoose";
const {ObjectId} = mongoose.Schema.Types
const paymentSchema = new Schema({
  user:{
    type:ObjectId,
    ref:"User"
},
name: {
  type: String,
},
email: {
  type: String,
},
phone: {
  type: String,
}, 
address: {
  type: String,
},
payment: {
  type: String,
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

  },
  razorpay_payment_id: {
    type: String,

  },
  razorpay_signature: {
    type: String,

  },
},
{ timestamps: true }
);

// export const Payment = mongoose.model("Payment", paymentSchema);
const Payment = models.Payment || mongoose.model("Payment", paymentSchema);
export default Payment;
// module.exports = mongoose.models.Payment || mongoose.model('Payment', paymentSchema)
