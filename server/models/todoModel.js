import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    title: { type: String, required: true, max: 150 },
    note: { type: String, max: 500 },
    completed: { type: Boolean, default: false },
    userId: { type: mongoose.Types.ObjectId, required: true, index: true },
  },
  { timestamps: true },
);

export const Todo = mongoose.model("Todo", todoSchema);
