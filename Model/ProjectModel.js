const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        project_name : {
            type: String,
            required:[true,'please enter the project name'],
        },
        user_id : {
             type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        role_id :{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Role'
    }
},{timestamps: true}
);

module.exports = mongoose.model("Project",projectSchema)
