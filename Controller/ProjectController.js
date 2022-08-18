//=============================MODULE======================
//-----------USER MODULE------------
const Project = require("../Model/ProjectModel");
const ProjectMember = require("../Model/ProjectMemberModel");

//To get all the projects
module.exports.allProjects = async (req, res) => {
  try {
    let condition = {};
    const { status } = req.query;
    if (status) condition.status = status;

    const { role, id } = req.user;
    let projects = [];
    if (role == "user" || role == "pm") {
      let projectIds = [];
      const developerProjects = await ProjectMember.find({
        developer: id,
        ...condition,
      });
      developerProjects.forEach((developerProject) => {
        projectIds.push(developerProject.project);
      });
      if (projectIds.length > 0)
        projects = await Project.find({
          _id: { $in: projectIds },
          ...condition,
        });
    } else projects = await Project.find();
    if (projects.length > 0)
      return res
        .status(200)
        .json({ status: true, msg: "All the projects", projects });
    return res
      .status(404)
      .json({ status: false, msg: "No project in the database" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, msg: "Error in fetching the project" });
  }
};
//To get a single project by id
module.exports.singleProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project)
      return res.status(400).json({ status: false, msg: "Project not found" });
    return res
      .status(200)
      .json({ status: true, msg: "Project details", project });
  } catch (error) {
    res.status(504).json({ status: false, msg: "Error fetching the project" });
  }
};

//add project to database
module.exports.addProject = async (req, res) => {
  try {
    req.body.project_manager =req.body.id;
    await Project.create(req.body);
    return res
      .status(202)
      .json({ status: true, msg: "Project added sucessfully" });
  } catch (error) {
    res.status(500).json({ status: false, msg: " error while adding Project" });
  }
};

//update project in database
module.exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!project)
      return res
        .status(400)
        .json({ status: false, msg: "Project was not found" });
    return res
      .status(200)
      .json({ status: true, msg: "Project updated sucessfully" });
  } catch (error) {
    res.status(500).json({ status: false, msg: "Project update failed" });
  }
};
//delete project in data base
module.exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project)
      return res.status(400).json({ status: false, msg: "Project not found" });
    return res
      .status(200)
      .json({ status: true, msg: "Project deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ status: false, msg: "Project delete failed" });
  }
};
