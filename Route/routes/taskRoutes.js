//===============MODULES==============
//THIRD PARTY MODULES
const router = require("express").Router();
//USER MODULES
const {getAllTasks,getOneTask,createTask,updateTask,deleteTask,getATask}  = require("../../Controller/TaskController");

router.get("/getalltasks",getAllTasks);
router.get("/getOneTask/:id",getOneTask);
router.post("/createTask",createTask);
router.put("/updateTask/:id",updateTask);
router.delete("/deleteTask/:id",deleteTask);

router.get("/getTaskFromId/:id",getATask);

module.exports  =  router;