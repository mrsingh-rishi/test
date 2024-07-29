// src/models/Task.ts
import { Schema, model, Document } from "mongoose";
import { TaskStatus, TaskPriority } from "../utils/types";

interface ITask extends Document {
  title: string;
  description?: string;
  status: TaskStatus;
  priority?: TaskPriority;
  deadline?: Date;
  user: Schema.Types.ObjectId;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  status: {
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.Todo,
    required: true,
  },
  priority: {
    type: String,
    enum: Object.values(TaskPriority)
  },
  deadline: { type: Date, default: null },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Task = model<ITask>("Task", TaskSchema);

export default Task;
