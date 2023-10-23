// import mongoose, { Schema, models } from "mongoose";

// const UserSchema = new Schema({
//   email: {
//     type: String,
//     unique: [true, 'Email already exists!'],
//     required: [true, 'Email is required!'],
//     match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"]
//   },
//   username: {
//     type: String,
//     required: [true, 'Username is required!'],
//     match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
//   },
//   image: {
//     type: String,
//   },
//   password: {
//     type: String,
//     required: [true, "Password is required"],
//     select: false
// }
// }
// ,
//   { timestamps: true });
// const User = models.User || mongoose.model("User", UserSchema);
// export default User;
import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true,
    },
    password: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
