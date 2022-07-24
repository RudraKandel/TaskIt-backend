const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        project_name : String,
        pm_id : {
             type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        emoployee_id :{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
    }
},{timestamps: true}
);

module.exports = mongoose.model("Project",projectSchema)
