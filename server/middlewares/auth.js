import jwt from "jsonwebtoken";
import { ApiError } from "../utils/error.js";
import { AUTH_SECRET } from "../utils/constant.js";

/**
 *@type {import("express").RequestHandler}
 */
export function authorizaiton(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return next(new ApiError("Not Authorized", 401));
    }
    const token = authorization.split(" ")[1];
    const { userId } = jwt.verify(token, AUTH_SECRET);
    if (!userId) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    req.userId = userId;

    next();
  } catch (error) {
    next(new ApiError("Invalid session token or expired", 401));
  }
}
