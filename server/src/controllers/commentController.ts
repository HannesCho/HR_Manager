import { Request, Response } from "express";
import Comment from "../models/Comment";
import User from "../models/User";

//** create a new Comment */
export const createComment = async (req: Request, res: Response) => {
  const { username, text, author } = req.body;
  // check if there are all required fields
  if (!username || !text || !author) {
    return res
      .status(403)
      .json({ errorMessage: "Please Check required fields" });
  }
  try {
    const createdComment = await Comment.create({
      username,
      text,
      author,
    });

    const addCommentToUser = await User.findOne({ username });
    addCommentToUser?.comments?.push(createdComment);
    addCommentToUser?.save();
    return res.status(200).json({ createdComment });
  } catch (error) {
    return res.status(400).json({
      errorMessage: error,
    });
  }
};
