//================MODULES=============
//THIRD PARTY MODULES
const router = require("express").Router();
//-----USER MODULE----------
const {
getaAllProjectMembers,getOneProjectMember,updateProjectMember,
deleteProjectMember,addProjectMember
} = require("../../Controller/ProjectMembersController");

//Routes
router.get("/getAllProjectMembers/:id", getaAllProjectMembers);
router.get("/getOneProjectMember/:id", getOneProjectMember);
router.post("/addProjectMember", addProjectMember);
router.put("/updateProjectMember/:id", updateProjectMember);
router.delete("/deleteProjectMember/:id",deleteProjectMember);

module.exports = router;