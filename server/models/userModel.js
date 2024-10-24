import { model, Schema } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const userSchema = new Schema(
  {
    name: { type: String, required: true, min: 1, max: 40 },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "Invalid Email address"],
    },
    password: { type: String, required: true, min: 8, max: 64 },
  },
  { timestamps: true },
);

const User = model("User", userSchema);
export { User };
