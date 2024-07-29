import { Request, Response } from "express";
import Task from "../models/task";
import User from "../models/user";

export interface AuthReq extends Request {
  email?: string;
  id?: string;
  name?: string;
}
// Create a new task
export const createTask = async (req: AuthReq, res: Response) => {
  const { title, description, status, priority, deadline } = req.body;
  console.log(title, description, status, priority, deadline)
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTask = new Task({
      title,
      description,
      status,
      priority,
      deadline,
      user: user._id, // Associate the task with the user's ID
    });

    await newTask.save();

    res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Error creating task",
      error: error.message,
    });
  }
};

// Get all tasks
export const getTasks = async (req: AuthReq, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.id });
    res.status(200).json(tasks);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching tasks",
      error: error.message,
    });
  }
};

// Update a task by ID
export const updateTask = async (req: AuthReq, res: Response) => {
  const { id } = req.params;
  const { title, description, status, priority, deadline } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status, priority, deadline },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Error updating task",
      error: error.message,
    });
  }
};

// Delete a task by ID
export const deleteTask = async (req: AuthReq, res: Response) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task deleted successfully",
      task: deletedTask,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting task",
      error: error.message,
    });
  }
};