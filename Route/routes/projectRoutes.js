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

//Routes
router.get("/getall", allProjects);
router.get("/getOne/:id", singleProject);
router.post("/addproject", addProject);
router.put("/updateProject/:id", updateProject);
router.delete("/deleteProject/:id",deleteProject);

module.exports = router;
