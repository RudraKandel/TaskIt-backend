//================MODULES=============
//THIRD PARTY MODULES
const router = require("express").Router();
//-----USER MODULE----------
const {
  allProjects,
  singleProject,
  addProject,
  updateProject,
} = require("../../Controller/ProjectController");

//Routes
router.get("/getall", allProjects);
router.get("/getOne/:id", singleProject);
router.post("/addproject", addProject);
router.put("/updateProject/:id", updateProject);

module.exports = router;
