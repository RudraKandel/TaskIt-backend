//================MODULES=============
//THIRD PARTY MODULES
const router = require("express").Router();
//-----USER MODULE----------
const {
  allProjects,
  singleProject,
  addProject,
  updateProject,
  deleteProject
} = require("../../Controller/ProjectController");
const {authentication} = require("../../Middleware/auth");
//Routes
router.get("/getall",[authentication] , allProjects);
router.get("/getOne/:id", singleProject);
router.post("/addproject", addProject);
router.put("/updateProject/:id", updateProject);
router.delete("/deleteProject/:id",deleteProject);

module.exports = router;
