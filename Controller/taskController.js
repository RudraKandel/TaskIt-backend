//==========MODULE==========
//--------USER MODULE----------
const { model } = require("mongoose");
const Task = require("../Model/TaskModel");

//get all tasks
model.exports.getAllTasks = async (req, res) => {
  try {
    const task = await Task.find();
    if(task.length <0)
    return res.status(400).json({status:false,msg:"No task of the project"});
    return res.status(200).json({status:true,msg})
  } catch (error) {
    return res.status(400).json({status:false,msg:"Error getting task"})
  }
};
