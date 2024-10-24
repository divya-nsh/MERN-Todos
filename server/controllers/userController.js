//@ts-check
import Jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { handleAsync } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import isEmail from "validator/lib/isEmail.js";
import { apiError } from "../utils/error.js";
import { AUTH_SECRET, SESSION_AGE_Seconds } from "../utils/constant.js";

function createAuthToken(userId) {
  const jwt = Jwt.sign({ userId }, AUTH_SECRET, {
    expiresIn: SESSION_AGE_Seconds,
  });
  return jwt;
}

function flatternUser(user) {
  const safeUser = user.toObject();
  delete safeUser.password;
  return safeUser;
}

export const getLoginUser = handleAsync(async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) apiError("Something went's wrong");
  res.status(200).json({
    result: flatternUser(user),
  });
});

export const createUser = handleAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const hashPass = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashPass });
  res.status(201).json({
    result: flatternUser(user),
    authToken: createAuthToken(user._id),
  });
});

export const loginUser = handleAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) apiError("Please provide email and password", 400);
  if (!isEmail(email)) apiError("Invalid email address", 400);
  const user = await User.findOne({ email });
  if (!user) apiError("No user found with given email address", 400);
  const match = await bcrypt.compare(password, user.password);
  if (!match) apiError("Invalid password", 400);
  res.status(200).json({
    result: flatternUser(user),
    authToken: createAuthToken(user._id),
  });
});

export const changePassword = handleAsync(async (req, res) => {
  const { password, newPassword } = req.body;
  if (!password || !newPassword) {
    apiError("Please provide Password and newPassword.", 400);
  }
  if (newPassword.length < 8) {
    apiError("Password must be at least 8 characters long.", 400);
  }
  if (newPassword.length > 64) {
    apiError("Password must be less than 64 characters long.", 400);
  }
  const user = await User.findById(req.userId);
  if (!user) apiError("Something went's wrong");
  const match = await bcrypt.compare(password, user.password);
  if (!match) apiError("Invalid current password", 400);
  const hashPass = await bcrypt.hash(newPassword, 10);

  user.password = hashPass;

  await user.save();
  res.status(200).json({
    message: "Password changed",
  });
});

export const updateUser = handleAsync(async (req, res) => {
  const { name } = req.body;
  if (name?.length > 40) apiError("Name must be less than 40 characters", 400);
  const user = await User.findByIdAndUpdate(
    req.userId,
    { name },
    { new: true, runValidators: true },
  );
  res.status(200).json({
    result: flatternUser(user),
  });
});
