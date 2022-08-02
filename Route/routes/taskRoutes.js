//===============MODULES==============
//THIRD PARTY MODULES
const router = require("express").Router();
//USER MODULES
const {getAllTasks,getOneTask,createTask,updateTask,deleteTask}  = require("../../Controller/taskController");

router.get("/getalltasks",getAllTasks);
router.get("/getOneTask",getOneTask);
router.post("/createTask",createTask);
router.put("/updateTask",updateTask);
router.delete("/deleteTask",deleteTask);

module.exports  =  router;