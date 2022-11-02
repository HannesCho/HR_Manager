import mongoose, { Document, NumberSchemaDefinition, Schema } from "mongoose";

enum Role {
  Admin = 0,
  Employee = 1,
}

export interface IUser {
  username: string;
  // firstName: string;
  // lastName: string;
  // email: string;
  // password: string;
  // address: {
  //   street: string;
  //   houseNumber: string;
  //   zipcode: number;
  //   city: string;
  //   country: string;
  // };
  // role: Role;
  // comments?: Array<string>;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  // firstName: { type: String, required: true },
  // lastName: { type: String, required: true },
  // email: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  // address: {
  //   street: String,
  //   houseNumber: String,
  //   postalCode: Number,
  //   city: String,
  //   country: String,
  // },
  // role: { type: Number, enum: [0, 1], default: 1, required: true },
  // comments: [{ type: String }],
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
