import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  status: { type: Boolean, required: true },
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const Task = model("Task", taskSchema, "tasks");

export default Task;
