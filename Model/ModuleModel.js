const mongoose = require('mongoose');

const moduleSchema = new Schema(
    {
        module_name : String ,
        project_id :{
            type:mongoose.Schema.Types.ObjectId,
            ref : 'module'
        },
        task_id : {
            type:mongoose.Schema.Types.ObjectId,
            ref : 'task'
        },
        user_id : {
            type:mongoose.Schema.Types.ObjectId,
            ref : 'user'
        }
    },{timestamps: true}
);

module.exports = mongoose.model("Module",moduleSchema)