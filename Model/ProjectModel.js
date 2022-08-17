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
    project_deadline: {
      type: Date,
    },
    project_manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
   
  },
  { timestamps: true }
);
//delete all task before deleting project
projectSchema.pre("remove", async function (next) {
  await this.model("Task").deleteMany({ Project: this._id });
});
module.exports = mongoose.model("Project", projectSchema);
