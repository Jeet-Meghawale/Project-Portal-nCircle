import { Response } from "express";
import { ApiResponse } from "./api.response";

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  data?: T,
  message?: string
) => {
  return res
    .status(statusCode)
    .json(new ApiResponse(data, message));
};