import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: String,
  firstName: String,
  lastName: String,
  email: String,
  address: {
    street: String,
    houseNumber: String,
    postalCode: Number,
    city: String,
    country: String,
  },
  role: ["admin", "user"],
});

const User = mongoose.model("User", userSchema);
export default User;
