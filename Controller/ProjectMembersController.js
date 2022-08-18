//===============MODULE================
//User module
const ProjectMember = require('../Model/ProjectMemberModel');
    
//get all project members
module.exports.getAllProjectMembers = async (req, res) => {
    try {
     let projectIds =[];
      const developerProjects = await ProjectMember.find({developer: req.user.id});
      developerProjects.forEach((developerProject) => {
        projectIds.push(developerProject.project);
      });
      if(projectIds.length>0){
      const developers = await  ProjectMember.find({project: {$in:projectIds}}).populate('developer');
       return res.status(200).json({ status: true, msg: "project members found" , developers});
      }
      return res.status(400).json({status:false,msg:"No team members found"});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: false, msg: "Error getting projectmembers" });
    }
  };
  
  //get projectmembers by id
  module.exports.getOneProjectMember = async (req, res) => {
    try {
      const projectmember = await ProjectMember.findById(req.params.id);
      if (!projectmember)
        return res.status(404).json({ status: false, msg: "Project Member not found" });
      return res.status(200).json({ status: true, msg: "Project Members found" , projectmember});
    } catch (error) {
      return res.status(500).json({ status: false, msg: "Error getting Project Members" });
    }
  };
  
  //update projectmember
  module.exports.updateProjectMember = async (req, res) => {
    try {
      const projectmember = await ProjectMember.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!projectmember)
        return res.status(404).json({ status: false, msg: "Project Member not updated" });
      return res
        .status(200)
        .json({ status: true, msg: "Project Member updated sucessfully", projectmember });
    } catch (error) {
      return res.status(500).json({ status: false, msg: "Error updating Project members" });
    }
  };
  //add projectmembers
  module.exports.addProjectMember = async (req, res) => {
    try {
      const {developer,project}=req.body;
      const checkExistingMember = await ProjectMember.findOne({developer,project})
      if(checkExistingMember){
        return res.status(400).json({status:false,msg:"Already in another project"});
      }
      const projectmember = await ProjectMember.create(req.body);
      return res
        .status(200)
        .json({ status: true, msg: "projectmember created sucessfully" });
    } catch (error) {
      if(error.errors){
        let newError={};
        Object.keys(error.errors).map(key=>{
          newError[key]=error.errors[key].message
        });
        return res.status(500).json({status:false,error:newError});
      }
      else
      return res
        .status(500)
        .json({ status: false, msg: "Error  adding the projectmember" });
    }
  };
  //delete projectmember
  module.exports.deleteProjectMember = async (req, res) => {
    try {
      const projectmember = await ProjectMember.findByIdAndRemove(req.params.id);
      if (!projectmember)
        return res.status(400).json({ status: false, msg: "projectmember not found" });
      return res
        .status(200)
        .json({ status: true, msg: "projectmember deleted sucessfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, msg: "Error deleting the projectmember" });
    }
  }