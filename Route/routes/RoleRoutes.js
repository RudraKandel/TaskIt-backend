//================MODULES=============
//THIRD PARTY MODULES
const router = require("express").Router();
//-----USER MODULE----------
const {
 deleteRole,updateRole,getAllRoles,getOneRole,addRole} = require("../../Controller/RoleController");

//Routes
router.get("/getAllRoles", getAllRoles);
router.get("/getOneRole/:id", getOneRole);
router.post("/addRole", addRole);
router.put("/updateRole/:id", updateRole);
router.delete("/deleteRole/:id",deleteRole);

module.exports = router;