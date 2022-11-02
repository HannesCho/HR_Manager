import mongoose, { Document, Schema, Types } from "mongoose";
import User from "./User";

export interface IComment {
  userName: string;
  createdAt: string;
  author: Types.ObjectId;
}

export interface ICommentModel extends IComment, Document {}

const CommentSchema: Schema = new Schema({
  userName: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Comment = mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
