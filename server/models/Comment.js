import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  commentText: String,
  createdAt: Date,
  author: String,
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
