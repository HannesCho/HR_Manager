import mongoose, { Document, Schema, Types } from "mongoose";

export interface IComment {
  userid: Types.ObjectId;
  text: string;
  createdAt: string;
  author: Types.ObjectId;
}

export interface ICommentModel extends IComment, Document {}

const CommentSchema: Schema = new Schema({
  userid: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Comment = mongoose.model<ICommentModel>("Comment", CommentSchema);

export default Comment;
