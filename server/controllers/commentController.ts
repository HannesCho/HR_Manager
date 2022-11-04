import { NextFunction, Request, Response } from "express";
import Comment from "../models/Comment";

export const createComment = async (req: Request, res: Response) => {
  const { userid, text, createdAt, author } = req.body;

  try {
    const createdComment = await Comment.create({
      userid,
      text,
      createdAt,
      author,
    });
    res.status(200).json({ createdComment });
  } catch (error) {
    return res.status(400).json({
      errorMessage: error,
    });
  }
};
