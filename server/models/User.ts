import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  address: {
    street: string;
    houseNumber: string;
    postalCode: number;
    city: string;
    country: string;
  };
  role: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema({
  userName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    houseNumber: { type: String, required: true },
    postalCode: { type: Number, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  role: { type: "admin" || "user", required: true },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
