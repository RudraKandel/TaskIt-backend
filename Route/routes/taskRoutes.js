//===============MODULES==============
//THIRD PARTY MODULES
const router = require("express").Router();
//USER MODULES
const {getAllTasks,getOneTask,createTask,updateTask,deleteTask,getATask,changeTaskStatus}  = require("../../Controller/TaskController");
const {authentication} = require("../../Middleware/auth");

router.get("/getalltasks",[authentication],getAllTasks);
router.get("/getOneTask",[authentication],getOneTask);

//router.get()
router.post("/createTask",createTask);
router.put("/updateTask/:id",updateTask);
router.delete("/deleteTask/:id",deleteTask);

router.get("/getTaskFromId/:id",getATask);
router.put("/change-status/:id",changeTaskStatus);     //id of the required task
module.exports  =  router;