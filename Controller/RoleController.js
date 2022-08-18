//=======================MODULE========================
//------------------USER MODULE
const Role = require("../Model/RoleModel");

//get all roles
module.exports.getAllRoles = async (req, res) => {
  try {
    const role = await Role.find();
    if (!role)
      return res.status(404).json({ status: false, msg: "No roles found" });
    return res.status(200).json({ status: true, msg: "Roles found" , role});
  } catch (error) {
    return res.status(500).json({ status: false, msg: "Error getting roles" });
  }
};

//get roles by id
module.exports.getOneRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role)
      return res.status(404).json({ status: false, msg: "Role not found" });
    return res.status(200).json({ status: true, msg: "Roles found" , role});
  } catch (error) {
    return res.status(500).json({ status: false, msg: "Error getting roles" });
  }
};

//update role
module.exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!role)
      return res.status(404).json({ status: false, msg: "Role not updated" });
    return res
      .status(200)
      .json({ status: true, msg: "Role updated sucessfully", role });
  } catch (error) {
    return res.status(500).json({ status: false, msg: "Error updating roles" });
  }
};
//create roles
module.exports.addRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    return res
      .status(200)
      .json({ status: true, msg: "role created sucessfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, msg: "Error  adding the role" });
  }
};
//delete role
module.exports.deleteRole = async (req, res) => {
  try {
     await Role.findByIdAndRemove(req.params.id);
    if (!task)
      return res.status(400).json({ status: false, msg: "Role not found" });
    return res
      .status(200)
      .json({ status: true, msg: "Role deleted sucessfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, msg: "Error deleting the role" });
  }
};


