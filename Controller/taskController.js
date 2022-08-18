//==========MODULE==========
//-------third party module
const _ = require("lodash");
const { findByIdAndUpdate } = require("../Model/TaskModel");
//--------USER MODULE----------
const Task = require("../Model/TaskModel");

//get all tasks
module.exports.getAllTasks = async (req, res) => {
  try {
    let condition={};
    const{status}= req.query;
    if(status)
    condition.status = status; 

    const { role, id } = req.user;
    let tasks = [];
    if (role == "user" || role == "pm") {
       tasks = await Task.find({ user_id: id ,...condition });
    } 
    else tasks = await Task.find({condition});
    if (tasks.length > 0)
    return res.status(200).json({ status: true, msg: "The tasks are", tasks });
      return res
        .status(400)
        .json({ status: false, msg: "No task of the project" });
  } catch (error) {
    return res.status(500).json({ status: false, msg: "Error getting task" });
  }
};

//get a single task by id
module.exports.getOneTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task)
      return res.status(400).json({ status: false, msg: "Task not found" });
    return res.status(200).json({ status: true, msg: "User found", task });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, msg: "Error getting the user" });
  }
};

//create a task
module.exports.createTask = async (req, res) => {
  try {
    req.body.project_id = req.params.id;
    const task = await Task.create(
      _.pick(req.body, [
        "task_title",
        "task_description",
        "task_deadline",
        "user_id",
        "project_id"
      ])
    );
    return res
      .status(200)
      .json({ status: true, msg: "Task added sucessfully" ,task });
  } catch (error) {
    return res.status(500).json({ status: false, msg: "Error in adding task" });
  }
};

//update task
module.exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task)
      return res.status(400).json({ status: false, msg: "Task not found" });
    return res
      .status(200)
      .json({ status: true, msg: "Task updated sucessfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, msg: "Error updating the task" });
  }
};

//delete task
module.exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndRemove(req.params.id);
    if (!task)
      return res.status(400).json({ status: false, msg: "Task not found" });
    return res
      .status(200)
      .json({ status: true, msg: "Task deleted sucessfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, msg: "Error deleting the task" });
  }
};

//get task for user from user id
module.exports.getATask = async (req, res) => {
  const { userid } = req.body;
  const user_id = await Task.find({ userid });
  if (!user_id)
    return res.status(400).json({ status: false, msg: " not found" });
  console.log(user_id);
};

//change status of the task
module.exports.changeTaskStatus = async(req,res) =>{
  try {
    const {status} = req.body;
    const changedStatus = await Task.findByIdAndUpdate(req.params.id,{status},{new:true});
    if(!changedStatus)
      return res.status(404).json({status:false,msg:"Failed to update status"});
    return res.status(200).json({status:true,msg:"Status changed sucessfully"});
  } catch (error) {
    return res.status(200).json({status:true,msg:"Error changing status"});
  }
};