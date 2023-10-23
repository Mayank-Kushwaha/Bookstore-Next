import mongoose, { Schema, models } from "mongoose";
const {ObjectId} = mongoose.Schema.Types
const WishlistItemSchema = new Schema({
  id: String,
  title: String,
  author: Object,
  price: Number,
  image: String,
  preview: String,
  quantity: Number,
});
const WishlistSchema = new Schema({
  user:{
    type:ObjectId,
    ref:"User"
},
items: [WishlistItemSchema],
},
{ timestamps: true });

const Wishlist= models.Wishlist || mongoose.model("Wishlist", WishlistSchema);
export default Wishlist;
