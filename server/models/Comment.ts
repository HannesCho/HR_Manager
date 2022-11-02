import mongoose, { Document, Schema } from "mongoose";

export interface IComment {
  userName: string;
  createdAt: string;
  author: string;
}

export interface ICommentModel extends IComment, Document {}

const CommentSchema: Schema = new Schema({
  userName: { type: String, required: true },
  createdAt: { type: Date, required: true },
  author: { type: String, required: true },
});

const Comment = mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
