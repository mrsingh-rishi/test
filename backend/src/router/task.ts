import { Router } from "express";
import { createTask, deleteTask, getTasks, updateTask } from "../controller/task";

export const taskRouter = Router();

taskRouter.post('/', createTask);

// Get all tasks
taskRouter.get('/', getTasks);


// Update a task by ID
taskRouter.put('/:id', updateTask);

// Delete a task by ID
taskRouter.delete('/:id', deleteTask);