//================MODULES=============
//THIRD PARTY MODULES
const router = require("express").Router();
//-----USER MODULE----------
const {
getaAllProjectMembers,getOneProjectMember,updateProjectMember,deleteProjectMember,addProjectMember
} = require("../../Controller/ProjectMembersController");

//Routes
router.get("/getAllRoles", getaAllProjectMembers);
router.get("/getOneRole/:id", getOneProjectMember);
router.post("/addRole", addProjectMember);
router.put("/updateRole/:id", updateProjectMember);
router.delete("/deleteRole/:id",deleteProjectMember);

module.exports = router;