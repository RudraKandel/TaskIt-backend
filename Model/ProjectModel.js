const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    project_name: {
      type: String,
      required: [true, "please enter the project name"],
    },

    project_desc: {
      type: String,
      required: [true, "Please add project description"],
    },
    project_manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
