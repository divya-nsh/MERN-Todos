//@ts-check
import { Todo } from "../models/todoModel.js";
import { handleAsync } from "../utils/asyncHandler.js";

export const getTodos = handleAsync(async (req, res) => {
  const { compelted } = req.query;
  let matchQuery = { userId: req.userId };
  if (compelted === "true") matchQuery.completed = true;
  if (compelted === "false") matchQuery.completed = false;
  const todos = await Todo.find({ userId: req.userId || "0" })
    .sort({
      _id: -1,
    })
    .limit(500);
  res.status(200).json({ result: todos });
});

export const getTodo = handleAsync(async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.find({ _id: id, userId: req.userId });
  if (!todo) res.status(404).json({ error: "No such todo Exits" });
  res.status(200).json({ result: todo });
});

export const addTodo = handleAsync(async (req, res) => {
  const { title, note } = req.body;
  if (!title) {
    res.status(400).json({ error: "Title required" });
    return;
  }
  const todo = await Todo.create({
    title,
    note,
    completed: false,
    userId: req.userId,
  });
  res.status(201).json({ result: todo });
});

export const deleteTodo = handleAsync(async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findOneAndDelete({ _id: id, userId: req.userId });

  if (!todo) {
    res.status(404).json({ error: "No such todo Exits" });
    return;
  }

  res.status(200).json({ message: "OK" });
});

export const updateTodo = handleAsync(async (req, res) => {
  const { id } = req.params;
  const { title, completed, note } = req.body;

  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: id, userId: req.userId },
    { title, completed, note },
    { new: true, runValidators: true },
  );

  if (!updatedTodo) {
    return res.status(404).json({ error: "No such todo exits" });
  }

  res.status(200).json({ result: updatedTodo });
});

export const deleteAllTodos = handleAsync(async (req, res) => {
  await Todo.deleteMany({ userId: req.userId });
  res.status(200).json({ message: "OK" });
});
