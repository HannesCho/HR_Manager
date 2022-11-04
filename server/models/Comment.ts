import mongoose, { Document, Schema, Types } from "mongoose";

export interface IComment {
  username: string;
  text: string;
  createdAt: string;
  author: string;
}

export interface ICommentModel extends IComment, Document {}

const CommentSchema: Schema = new Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  author: { type: String, required: true },
});

const Comment = mongoose.model<ICommentModel>("Comment", CommentSchema);

export default Comment;
