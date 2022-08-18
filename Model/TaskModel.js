const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema(
  {
    task_title: {
      type: String,
      required: [true, "Enter task title"],
    },
    task_description: {
      type: String,
      required: [true, "Enter task description title"],
    },
    task_status: {
      type: String,
      enum: ["assigned", "ongoing", "completed"],
      default: "assigned",
    },
    // task_priority : Number,
    task_deadline: {
      type: Date,
      required: [true, "Enter task deadline"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      
    },
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required:true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
